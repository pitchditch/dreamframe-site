-- Keep the canonical street-crawler route system as the single 5+ pin route source.
-- The unified route migration projects d2d_saved_routes into d2d_field_routes.
drop trigger if exists trg_sync_d2d_field_auto_street_routes on public.d2d_field_pins;
drop function if exists public.sync_d2d_field_auto_street_routes();
drop function if exists public.refresh_d2d_field_street_route(uuid, text, text);

delete from public.d2d_field_routes
where client_route_id like 'auto-street:%'
   or client_route_id like 'auto:field:%';

-- Reconcile field pins with canonical CRM properties without creating a second
-- copy of a property that already exists. Removing a field pin only detaches the
-- D2D link; it never destroys an existing CRM property/customer record.
create or replace function public.sync_d2d_field_pin_to_property()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_row public.d2d_field_pins%rowtype;
  v_property_id uuid;
  v_address_line1 text;
  v_city text;
  v_type text;
  v_updated timestamptz;
  v_incoming_customer text;
  v_incoming_phone text;
  v_incoming_email text;
begin
  if tg_op = 'DELETE' then
    update public.properties
    set
      d2d_user_id = null,
      d2d_client_pin_id = null,
      d2d_identity_key = null,
      d2d_is_storefront = false,
      updated_at = greatest(updated_at, now())
    where d2d_user_id = old.user_id
      and (d2d_client_pin_id = old.client_pin_id or d2d_identity_key = old.identity_key);
    return old;
  end if;

  v_row := new;

  if v_row.deleted_at is not null then
    update public.properties
    set
      d2d_user_id = null,
      d2d_client_pin_id = null,
      d2d_identity_key = null,
      d2d_is_storefront = false,
      updated_at = greatest(updated_at, now())
    where d2d_user_id = v_row.user_id
      and (d2d_client_pin_id = v_row.client_pin_id or d2d_identity_key = v_row.identity_key);
    return new;
  end if;

  v_address_line1 := nullif(btrim(split_part(v_row.address, ',', 1)), '');
  v_city := coalesce(public.d2d_extract_city(v_row.address), 'Unknown');
  v_type := case
    when v_row.is_storefront then 'commercial'
    else coalesce(nullif(v_row.pin_data->>'propertyType', ''), 'residential')
  end;
  v_updated := coalesce(v_row.client_updated_at, v_row.updated_at, now());
  v_incoming_customer := coalesce(nullif(v_row.pin_data->>'customerName', ''), nullif(v_row.business_name, ''));
  v_incoming_phone := coalesce(nullif(v_row.pin_data->>'phoneNumber', ''), nullif(v_row.phone_number, ''));
  v_incoming_email := nullif(v_row.pin_data->>'email', '');

  select p.id
  into v_property_id
  from public.properties p
  where p.d2d_user_id = v_row.user_id
    and (p.d2d_client_pin_id = v_row.client_pin_id or p.d2d_identity_key = v_row.identity_key)
  order by p.updated_at desc
  limit 1;

  if v_property_id is null then
    select p.id
    into v_property_id
    from public.properties p
    where (p.d2d_identity_key is null or p.d2d_identity_key = v_row.identity_key)
      and (
        (
          p.lat is not null and p.lng is not null
          and abs(p.lat - v_row.latitude) <= 0.00005
          and abs(p.lng - v_row.longitude) <= 0.00005
        )
        or (
          regexp_replace(lower(coalesce(p.address_line1, '')), '[^a-z0-9]+', '', 'g') =
            regexp_replace(lower(coalesce(v_address_line1, '')), '[^a-z0-9]+', '', 'g')
          and lower(coalesce(p.city, '')) = lower(coalesce(v_city, ''))
        )
      )
    order by
      case when p.data_source = 'd2d' then 0 else 1 end,
      p.updated_at desc
    limit 1;
  end if;

  if v_property_id is null then
    insert into public.properties (
      address_line1,
      city,
      lat,
      lng,
      type,
      living_sqft,
      year_built,
      stories,
      property_type_detail,
      lot_size,
      bedrooms,
      bathrooms,
      data_source,
      customer_name,
      phone_number,
      email,
      follow_up_date,
      lead_score,
      lead_source,
      notes,
      status,
      created_at,
      updated_at,
      d2d_user_id,
      d2d_client_pin_id,
      d2d_identity_key,
      d2d_is_storefront
    ) values (
      coalesce(v_address_line1, v_row.address),
      v_city,
      v_row.latitude,
      v_row.longitude,
      v_type,
      nullif(v_row.pin_data->>'squareFootage', '')::integer,
      nullif(v_row.pin_data->>'yearBuilt', '')::integer,
      nullif(v_row.pin_data->>'stories', '')::integer,
      nullif(v_row.pin_data->>'propertyType', ''),
      nullif(v_row.pin_data->>'lotSize', ''),
      nullif(v_row.pin_data->>'bedrooms', '')::integer,
      nullif(v_row.pin_data->>'bathrooms', '')::integer,
      'd2d',
      v_incoming_customer,
      v_incoming_phone,
      v_incoming_email,
      nullif(v_row.pin_data->>'followUpDate', '')::date,
      nullif(v_row.pin_data->>'leadScore', ''),
      coalesce(nullif(v_row.lead_source, ''), 'door-to-door'),
      coalesce(v_row.pin_data->>'notes', ''),
      v_row.status,
      coalesce(nullif(v_row.pin_data->>'dateAdded', '')::timestamptz, v_row.created_at, now()),
      v_updated,
      v_row.user_id,
      v_row.client_pin_id,
      v_row.identity_key,
      v_row.is_storefront
    );
  else
    update public.properties p
    set
      address_line1 = case when p.data_source = 'd2d' then coalesce(v_address_line1, p.address_line1) else p.address_line1 end,
      city = case when p.data_source = 'd2d' then v_city else p.city end,
      lat = coalesce(p.lat, v_row.latitude),
      lng = coalesce(p.lng, v_row.longitude),
      type = case when p.data_source = 'd2d' or p.type is null then v_type else p.type end,
      living_sqft = coalesce(p.living_sqft, nullif(v_row.pin_data->>'squareFootage', '')::integer),
      year_built = coalesce(p.year_built, nullif(v_row.pin_data->>'yearBuilt', '')::integer),
      stories = coalesce(p.stories, nullif(v_row.pin_data->>'stories', '')::integer),
      property_type_detail = coalesce(p.property_type_detail, nullif(v_row.pin_data->>'propertyType', '')),
      lot_size = coalesce(p.lot_size, nullif(v_row.pin_data->>'lotSize', '')),
      bedrooms = coalesce(p.bedrooms, nullif(v_row.pin_data->>'bedrooms', '')::integer),
      bathrooms = coalesce(p.bathrooms, nullif(v_row.pin_data->>'bathrooms', '')::integer),
      customer_name = coalesce(p.customer_name, v_incoming_customer),
      phone_number = coalesce(p.phone_number, v_incoming_phone),
      email = coalesce(p.email, v_incoming_email),
      follow_up_date = case
        when p.data_source = 'd2d' then coalesce(nullif(v_row.pin_data->>'followUpDate', '')::date, p.follow_up_date)
        else p.follow_up_date
      end,
      lead_score = case when p.data_source = 'd2d' then coalesce(nullif(v_row.pin_data->>'leadScore', ''), p.lead_score) else p.lead_score end,
      lead_source = coalesce(p.lead_source, nullif(v_row.lead_source, ''), 'door-to-door'),
      notes = case
        when p.data_source = 'd2d' then coalesce(nullif(v_row.pin_data->>'notes', ''), p.notes)
        else p.notes
      end,
      status = case when p.data_source = 'd2d' then v_row.status else p.status end,
      updated_at = greatest(p.updated_at, v_updated),
      d2d_user_id = v_row.user_id,
      d2d_client_pin_id = v_row.client_pin_id,
      d2d_identity_key = v_row.identity_key,
      d2d_is_storefront = v_row.is_storefront
    where p.id = v_property_id;
  end if;

  return new;
end;
$$;

revoke all on function public.sync_d2d_field_pin_to_property() from public, anon, authenticated;

-- Re-run the safe reconciliation for any currently-live field pins.
update public.d2d_field_pins
set updated_at = updated_at
where deleted_at is null;
