alter table public.d2d_field_pins
  add column if not exists client_updated_at timestamptz not null default now(),
  add column if not exists deleted_at timestamptz;

create unique index if not exists d2d_field_pins_user_client_pin_uidx
  on public.d2d_field_pins (user_id, client_pin_id);

create index if not exists d2d_field_pins_user_deleted_updated_idx
  on public.d2d_field_pins (user_id, deleted_at, client_updated_at desc);

alter table public.d2d_crawl_sessions
  add column if not exists client_session_id text;

create unique index if not exists d2d_crawl_sessions_user_client_session_uidx
  on public.d2d_crawl_sessions (user_id, client_session_id)
  where client_session_id is not null;

create or replace function public.upsert_d2d_field_pins(p_pins jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_item jsonb;
  v_client_updated_at timestamptz;
  v_rows integer;
begin
  if v_user is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_pins is null or jsonb_typeof(p_pins) <> 'array' then
    raise exception 'p_pins must be a JSON array';
  end if;

  for v_item in select value from jsonb_array_elements(p_pins)
  loop
    v_client_updated_at := coalesce(
      nullif(v_item->>'client_updated_at', '')::timestamptz,
      now()
    );

    update public.d2d_field_pins
    set
      identity_key = v_item->>'identity_key',
      client_pin_id = v_item->>'client_pin_id',
      address = v_item->>'address',
      latitude = (v_item->>'latitude')::double precision,
      longitude = (v_item->>'longitude')::double precision,
      status = v_item->>'status',
      lead_source = nullif(v_item->>'lead_source', ''),
      is_storefront = coalesce((v_item->>'is_storefront')::boolean, false),
      storefront_type = nullif(v_item->>'storefront_type', ''),
      business_name = nullif(v_item->>'business_name', ''),
      phone_number = nullif(v_item->>'phone_number', ''),
      pin_data = coalesce(v_item->'pin_data', '{}'::jsonb),
      client_updated_at = v_client_updated_at,
      deleted_at = null,
      updated_at = now()
    where user_id = v_user
      and (
        client_pin_id = v_item->>'client_pin_id'
        or identity_key = v_item->>'identity_key'
      )
      and client_updated_at <= v_client_updated_at;

    get diagnostics v_rows = row_count;

    if v_rows = 0 and not exists (
      select 1
      from public.d2d_field_pins
      where user_id = v_user
        and (
          client_pin_id = v_item->>'client_pin_id'
          or identity_key = v_item->>'identity_key'
        )
        and client_updated_at > v_client_updated_at
    ) then
      insert into public.d2d_field_pins (
        user_id,
        identity_key,
        client_pin_id,
        address,
        latitude,
        longitude,
        status,
        lead_source,
        is_storefront,
        storefront_type,
        business_name,
        phone_number,
        pin_data,
        client_updated_at,
        deleted_at,
        updated_at
      ) values (
        v_user,
        v_item->>'identity_key',
        v_item->>'client_pin_id',
        v_item->>'address',
        (v_item->>'latitude')::double precision,
        (v_item->>'longitude')::double precision,
        v_item->>'status',
        nullif(v_item->>'lead_source', ''),
        coalesce((v_item->>'is_storefront')::boolean, false),
        nullif(v_item->>'storefront_type', ''),
        nullif(v_item->>'business_name', ''),
        nullif(v_item->>'phone_number', ''),
        coalesce(v_item->'pin_data', '{}'::jsonb),
        v_client_updated_at,
        null,
        now()
      )
      on conflict (user_id, identity_key)
      do update set
        client_pin_id = excluded.client_pin_id,
        address = excluded.address,
        latitude = excluded.latitude,
        longitude = excluded.longitude,
        status = excluded.status,
        lead_source = excluded.lead_source,
        is_storefront = excluded.is_storefront,
        storefront_type = excluded.storefront_type,
        business_name = excluded.business_name,
        phone_number = excluded.phone_number,
        pin_data = excluded.pin_data,
        client_updated_at = excluded.client_updated_at,
        deleted_at = null,
        updated_at = now()
      where public.d2d_field_pins.client_updated_at <= excluded.client_updated_at;
    end if;
  end loop;
end;
$$;

create or replace function public.tombstone_d2d_field_pins(p_items jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_item jsonb;
  v_client_updated_at timestamptz;
begin
  if v_user is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'p_items must be a JSON array';
  end if;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_client_updated_at := coalesce(
      nullif(v_item->>'client_updated_at', '')::timestamptz,
      now()
    );

    update public.d2d_field_pins
    set
      client_updated_at = v_client_updated_at,
      deleted_at = now(),
      updated_at = now()
    where user_id = v_user
      and (
        client_pin_id = nullif(v_item->>'client_pin_id', '')
        or identity_key = nullif(v_item->>'identity_key', '')
      )
      and client_updated_at <= v_client_updated_at;
  end loop;
end;
$$;

revoke all on function public.upsert_d2d_field_pins(jsonb) from public;
revoke all on function public.upsert_d2d_field_pins(jsonb) from anon;
grant execute on function public.upsert_d2d_field_pins(jsonb) to authenticated;

revoke all on function public.tombstone_d2d_field_pins(jsonb) from public;
revoke all on function public.tombstone_d2d_field_pins(jsonb) from anon;
grant execute on function public.tombstone_d2d_field_pins(jsonb) to authenticated;
