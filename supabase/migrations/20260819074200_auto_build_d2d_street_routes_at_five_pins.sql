-- Automatically maintain one D2D route for every street with at least five
-- eligible active saved pins. This is database-driven so crawler, map, and
-- offline/cloud pin writers all receive the same route behavior.

alter table public.nearby_houses
  add column if not exists street_segment text,
  add column if not exists city text;

alter table public.d2d_saved_routes
  add column if not exists auto_generated boolean not null default false,
  add column if not exists route_key text;

create unique index if not exists d2d_saved_routes_auto_route_key_uidx
  on public.d2d_saved_routes (route_key)
  where auto_generated = true and route_key is not null;

create index if not exists nearby_houses_street_city_active_idx
  on public.nearby_houses (city, street_segment)
  where deleted_at is null;

create or replace function public.d2d_extract_street(p_address text)
returns text
language plpgsql
immutable
as $$
declare
  v_street text;
begin
  if p_address is null or btrim(p_address) = '' then
    return null;
  end if;

  v_street := split_part(p_address, ',', 1);
  v_street := regexp_replace(v_street, '^\s*[0-9]+[A-Za-z-]*\s+', '', 'i');
  v_street := btrim(regexp_replace(v_street, '\s+', ' ', 'g'));

  if v_street = '' then
    return null;
  end if;

  v_street := regexp_replace(v_street, '\s+(St\.?|Street)$', ' Street', 'i');
  v_street := regexp_replace(v_street, '\s+(Ave\.?|Avenue)$', ' Avenue', 'i');
  v_street := regexp_replace(v_street, '\s+(Rd\.?|Road)$', ' Road', 'i');
  v_street := regexp_replace(v_street, '\s+(Dr\.?|Drive)$', ' Drive', 'i');
  v_street := regexp_replace(v_street, '\s+(Blvd\.?|Boulevard)$', ' Boulevard', 'i');
  v_street := regexp_replace(v_street, '\s+(Cres\.?|Crescent)$', ' Crescent', 'i');
  v_street := regexp_replace(v_street, '\s+(Ct\.?|Court)$', ' Court', 'i');
  v_street := regexp_replace(v_street, '\s+(Ln\.?|Lane)$', ' Lane', 'i');
  v_street := regexp_replace(v_street, '\s+(Pl\.?|Place)$', ' Place', 'i');

  return v_street;
end;
$$;

create or replace function public.d2d_extract_city(p_address text)
returns text
language sql
immutable
as $$
  select nullif(btrim(split_part(coalesce(p_address, ''), ',', 2)), '');
$$;

create or replace function public.d2d_refresh_auto_street_route(p_city text, p_street text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_city text := nullif(btrim(p_city), '');
  v_street text := nullif(btrim(p_street), '');
  v_key text;
  v_count integer;
  v_completed integer;
  v_ids uuid[];
  v_path jsonb;
  v_start_lat double precision;
  v_start_lng double precision;
  v_start_address text;
begin
  if v_street is null then
    return;
  end if;

  v_key := lower(coalesce(v_city, 'unknown')) || '|' || lower(v_street);

  with eligible as (
    select
      h.*,
      nullif(substring(h.address from '^\s*([0-9]+)'), '')::integer as house_number
    from public.nearby_houses h
    where h.deleted_at is null
      and lower(coalesce(h.city, '')) = lower(coalesce(v_city, ''))
      and lower(coalesce(h.street_segment, '')) = lower(v_street)
      and lower(coalesce(h.status, 'unvisited')) not in (
        'not_interested', 'not-interested', 'do_not_knock', 'do-not-knock',
        'completed', 'lost', 'invalid', 'not_a_fit', 'not-a-fit'
      )
  )
  select
    count(*),
    count(*) filter (where lower(coalesce(status, 'unvisited')) <> 'unvisited'),
    coalesce(array_agg(id order by
      case street_side when 'left' then 0 when 'right' then 1 else 2 end,
      case when street_side = 'right' then -coalesce(house_number, 0) else coalesce(house_number, 0) end,
      address,
      id
    ), '{}'::uuid[]),
    coalesce(jsonb_agg(jsonb_build_object(
      'id', id,
      'address', address,
      'lat', latitude,
      'lng', longitude,
      'status', status,
      'streetSide', street_side
    ) order by
      case street_side when 'left' then 0 when 'right' then 1 else 2 end,
      case when street_side = 'right' then -coalesce(house_number, 0) else coalesce(house_number, 0) end,
      address,
      id
    ), '[]'::jsonb)
  into v_count, v_completed, v_ids, v_path
  from eligible;

  if v_count < 5 then
    delete from public.d2d_saved_routes
    where auto_generated = true and route_key = v_key;
    return;
  end if;

  select latitude, longitude, address
  into v_start_lat, v_start_lng, v_start_address
  from public.nearby_houses
  where id = v_ids[1];

  insert into public.d2d_saved_routes (
    name, city, street, avenue, house_ids, total_houses, completion_rate,
    route_path, created_by, start_lat, start_lng, start_address,
    notes, auto_generated, route_key, updated_at
  ) values (
    v_street || case when v_city is not null then ' · ' || v_city else '' end,
    v_city,
    v_street,
    case when v_street ~* '\sAvenue$' then v_street else null end,
    v_ids,
    v_count,
    round((v_completed::numeric / nullif(v_count, 0)) * 100, 1),
    v_path,
    'auto:street-threshold',
    v_start_lat,
    v_start_lng,
    v_start_address,
    'Automatically maintained when this street has 5 or more eligible saved pins.',
    true,
    v_key,
    now()
  )
  on conflict (route_key) where auto_generated = true and route_key is not null
  do update set
    name = excluded.name,
    city = excluded.city,
    street = excluded.street,
    avenue = excluded.avenue,
    house_ids = excluded.house_ids,
    total_houses = excluded.total_houses,
    completion_rate = excluded.completion_rate,
    route_path = excluded.route_path,
    start_lat = excluded.start_lat,
    start_lng = excluded.start_lng,
    start_address = excluded.start_address,
    notes = excluded.notes,
    updated_at = now();
end;
$$;

create or replace function public.d2d_prepare_nearby_house_street()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.street_segment := public.d2d_extract_street(new.address);
  new.city := public.d2d_extract_city(new.address);
  return new;
end;
$$;

create or replace function public.d2d_sync_auto_street_routes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    perform public.d2d_refresh_auto_street_route(old.city, old.street_segment);
    return old;
  end if;

  if tg_op = 'UPDATE' and (
    old.city is distinct from new.city or
    old.street_segment is distinct from new.street_segment
  ) then
    perform public.d2d_refresh_auto_street_route(old.city, old.street_segment);
  end if;

  perform public.d2d_refresh_auto_street_route(new.city, new.street_segment);
  return new;
end;
$$;

drop trigger if exists trg_d2d_prepare_nearby_house_street on public.nearby_houses;
create trigger trg_d2d_prepare_nearby_house_street
before insert or update of address
on public.nearby_houses
for each row
execute function public.d2d_prepare_nearby_house_street();

drop trigger if exists trg_d2d_sync_auto_street_routes on public.nearby_houses;
create trigger trg_d2d_sync_auto_street_routes
after insert or update of address, status, deleted_at, street_side or delete
on public.nearby_houses
for each row
execute function public.d2d_sync_auto_street_routes();

update public.nearby_houses
set
  street_segment = public.d2d_extract_street(address),
  city = public.d2d_extract_city(address)
where street_segment is distinct from public.d2d_extract_street(address)
   or city is distinct from public.d2d_extract_city(address);

do $$
declare
  r record;
begin
  for r in
    select distinct city, street_segment
    from public.nearby_houses
    where deleted_at is null and street_segment is not null
  loop
    perform public.d2d_refresh_auto_street_route(r.city, r.street_segment);
  end loop;
end;
$$;
