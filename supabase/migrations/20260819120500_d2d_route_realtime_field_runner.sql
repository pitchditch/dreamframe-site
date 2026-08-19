-- Field-proof D2D routes:
-- 1) publish the canonical per-user route table through Supabase Realtime
-- 2) expose one admin-only RPC for updating authoritative auto-street stops
--    (nearby_houses -> d2d_saved_routes -> d2d_field_routes projection)

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'd2d_field_routes'
  ) then
    alter publication supabase_realtime add table public.d2d_field_routes;
  end if;
end
$$;

alter table public.d2d_field_routes replica identity full;

create or replace function public.update_d2d_auto_route_stop_status(
  p_house_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_status text := lower(btrim(coalesce(p_status, '')));
begin
  if auth.uid() is null or not public.is_admin(auth.uid()) then
    raise exception 'Admin access required' using errcode = '42501';
  end if;

  if v_status not in (
    'visited',
    'interested',
    'needs-quote',
    'not-interested',
    'revisit-later',
    'completed'
  ) then
    raise exception 'Unsupported D2D stop status: %', p_status using errcode = '22023';
  end if;

  update public.nearby_houses
  set status = v_status
  where id = p_house_id
    and deleted_at is null;

  if not found then
    raise exception 'D2D route stop not found' using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.update_d2d_auto_route_stop_status(uuid, text) from public, anon;
grant execute on function public.update_d2d_auto_route_stop_status(uuid, text) to authenticated;
