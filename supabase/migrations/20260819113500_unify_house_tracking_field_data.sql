-- Keep House Tracking / D2D field pins visible in the canonical CRM properties table
-- and build the 5+ pin street routes from the same d2d_field_pins source that the
-- current House Tracking UI actually writes.

alter table public.properties
  add column if not exists d2d_user_id uuid,
  add column if not exists d2d_client_pin_id text,
  add column if not exists d2d_identity_key text,
  add column if not exists d2d_is_storefront boolean not null default false;

create unique index if not exists properties_d2d_identity_uidx
  on public.properties (d2d_user_id, d2d_identity_key)
  where d2d_user_id is not null and d2d_identity_key is not null;

create index if not exists properties_d2d_client_pin_idx
  on public.properties (d2d_user_id, d2d_client_pin_id)
  where d2d_user_id is not null and d2d_client_pin_id is not null;

create or replace function public.sync_d2d_field_pin_to_property()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.d2d_field_pins%rowtype;
  v_city text;
  v_type text;
  v_updated timestamptz;
begin
  if tg_op = 'DELETE' then
    delete from public.properties
    where d2d_user_id = old.user_id
      and (d2d_client_pin_id = old.client_pin_id or d2d_identity_key = old.identity_key);
    return old;
  end if;

  v_row := new;

  if v_row.deleted_at is not null then
    delete from public.properties
    where d2d_user_id = v_row.user_id
      and (d2d_client_pin_id = v_row.client_pin_id or d2d_identity_key = v_row.identity_key);
    return new;
  end if;

  v_city := coalesce(public.d2d_extract_city(v_row.address), 'Unknown');
  v_type := case
    when v_row.is_storefront then 'commercial'
    else coalesce(nullif(v_row.pin_data->>'propertyType', ''), 'residential')
  end;
  v_updated := coalesce(v_row.client_updated_at, v_row.updated_at, now());

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
    v_row.address,
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
    coalesce(nullif(v_row.pin_data->>'customerName', ''), nullif(v_row.business_name, '')),
    coalesce(nullif(v_row.pin_data->>'phoneNumber', ''), nullif(v_row.phone_number, '')),
    nullif(v_row.pin_data->>'email', ''),
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
  )
  on conflict (d2d_user_id, d2d_identity_key)
  where d2d_user_id is not null and d2d_identity_key is not null
  do update set
    address_line1 = excluded.address_line1,
    city = excluded.city,
    lat = excluded.lat,
    lng = excluded.lng,
    type = excluded.type,
    living_sqft = excluded.living_sqft,
    year_built = excluded.year_built,
    stories = excluded.stories,
    property_type_detail = excluded.property_type_detail,
    lot_size = excluded.lot_size,
    bedrooms = excluded.bedrooms,
    bathrooms = excluded.bathrooms,
    data_source = excluded.data_source,
    customer_name = excluded.customer_name,
    phone_number = excluded.phone_number,
    email = excluded.email,
    follow_up_date = excluded.follow_up_date,
    lead_score = excluded.lead_score,
    lead_source = excluded.lead_source,
    notes = excluded.notes,
    status = excluded.status,
    updated_at = excluded.updated_at,
    d2d_client_pin_id = excluded.d2d_client_pin_id,
    d2d_is_storefront = excluded.d2d_is_storefront;

  return new;
end;
$$;

drop trigger if exists trg_sync_d2d_field_pin_to_property on public.d2d_field_pins;
create trigger trg_sync_d2d_field_pin_to_property
after insert or update or delete
on public.d2d_field_pins
for each row
execute function public.sync_d2d_field_pin_to_property();

-- Backfill existing active field pins into canonical CRM properties.
update public.d2d_field_pins
set updated_at = updated_at
where deleted_at is null;

-- Build automatic field routes directly from d2d_field_pins. The earlier
-- nearby_houses trigger remains for legacy data, but this is the authoritative
-- path for current House Tracking pins.
create or replace function public.refresh_d2d_field_street_route(
  p_user uuid,
  p_city text,
  p_street text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_city text := nullif(btrim(p_city), '');
  v_street text := nullif(btrim(p_street), '');
  v_route_id text;
  v_count integer;
  v_path jsonb;
  v_started timestamptz;
begin
  if p_user is null or v_street is null then
    return;
  end if;

  v_route_id := 'auto-street:' || md5(lower(coalesce(v_city, 'unknown') || '|' || v_street));

  with eligible as (
    select
      p.*,
      coalesce(
        nullif(substring(p.address from '^\s*([0-9]+)'), '')::integer,
        2147483647
      ) as house_number
    from public.d2d_field_pins p
    where p.user_id = p_user
      and p.deleted_at is null
      and lower(coalesce(public.d2d_extract_city(p.address), '')) = lower(coalesce(v_city, ''))
      and lower(coalesce(public.d2d_extract_street(p.address), '')) = lower(v_street)
      and lower(coalesce(p.status, 'visited')) not in (
        'not_interested', 'not-interested', 'do_not_knock', 'do-not-knock',
        'completed', 'lost', 'invalid', 'not_a_fit', 'not-a-fit'
      )
  )
  select
    count(*),
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'lat', latitude,
          'lng', longitude,
          'timestamp', coalesce(client_updated_at, updated_at, now()),
          'address', address,
          'pinId', client_pin_id
        )
        order by house_number, address, client_pin_id
      ),
      '[]'::jsonb
    ),
    min(coalesce(client_updated_at, updated_at, created_at, now()))
  into v_count, v_path, v_started
  from eligible;

  if v_count < 5 then
    delete from public.d2d_field_routes
    where user_id = p_user and client_route_id = v_route_id;
    return;
  end if;

  insert into public.d2d_field_routes (
    user_id,
    client_route_id,
    route_data,
    client_updated_at,
    updated_at
  ) values (
    p_user,
    v_route_id,
    jsonb_build_object(
      'id', v_route_id,
      'name', v_street || case when v_city is not null then ' · ' || v_city else '' end,
      'startTime', coalesce(v_started, now()),
      'endTime', now(),
      'path', v_path,
      'homesVisited', v_count,
      'color', '#2563eb',
      'isActive', false,
      'updatedAt', now(),
      'autoGenerated', true,
      'street', v_street,
      'city', v_city
    ),
    now(),
    now()
  )
  on conflict (user_id, client_route_id)
  do update set
    route_data = excluded.route_data,
    client_updated_at = excluded.client_updated_at,
    updated_at = now();
end;
$$;

create or replace function public.sync_d2d_field_auto_street_routes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old_city text;
  v_old_street text;
  v_new_city text;
  v_new_street text;
begin
  if tg_op <> 'INSERT' then
    v_old_city := public.d2d_extract_city(old.address);
    v_old_street := public.d2d_extract_street(old.address);
  end if;

  if tg_op <> 'DELETE' then
    v_new_city := public.d2d_extract_city(new.address);
    v_new_street := public.d2d_extract_street(new.address);
  end if;

  if tg_op = 'DELETE' then
    perform public.refresh_d2d_field_street_route(old.user_id, v_old_city, v_old_street);
    return old;
  end if;

  if tg_op = 'UPDATE' and (
    old.user_id is distinct from new.user_id or
    v_old_city is distinct from v_new_city or
    v_old_street is distinct from v_new_street
  ) then
    perform public.refresh_d2d_field_street_route(old.user_id, v_old_city, v_old_street);
  end if;

  perform public.refresh_d2d_field_street_route(new.user_id, v_new_city, v_new_street);
  return new;
end;
$$;

drop trigger if exists trg_sync_d2d_field_auto_street_routes on public.d2d_field_pins;
create trigger trg_sync_d2d_field_auto_street_routes
after insert or update of address, status, deleted_at, user_id or delete
on public.d2d_field_pins
for each row
execute function public.sync_d2d_field_auto_street_routes();

-- Backfill automatic routes for existing current House Tracking pins.
do $$
declare
  r record;
begin
  for r in
    select distinct
      user_id,
      public.d2d_extract_city(address) as city,
      public.d2d_extract_street(address) as street
    from public.d2d_field_pins
    where deleted_at is null
      and public.d2d_extract_street(address) is not null
  loop
    perform public.refresh_d2d_field_street_route(r.user_id, r.city, r.street);
  end loop;
end;
$$;
