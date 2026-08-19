create table if not exists public.d2d_field_routes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_route_id text not null,
  route_data jsonb not null default '{}'::jsonb,
  client_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, client_route_id)
);

create index if not exists d2d_field_routes_user_updated_idx
  on public.d2d_field_routes (user_id, client_updated_at desc);

alter table public.d2d_field_routes enable row level security;

drop policy if exists "Users manage own D2D field routes" on public.d2d_field_routes;
create policy "Users manage own D2D field routes"
on public.d2d_field_routes
for all
to authenticated
using (((select auth.uid()) = user_id) or is_admin((select auth.uid())))
with check (((select auth.uid()) = user_id) or is_admin((select auth.uid())));

revoke all on table public.d2d_field_routes from anon;
revoke truncate, references, trigger on table public.d2d_field_routes from authenticated;
grant select, insert, update, delete on table public.d2d_field_routes to authenticated;

create or replace function public.upsert_d2d_field_routes(p_routes jsonb)
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

  if p_routes is null or jsonb_typeof(p_routes) <> 'array' then
    raise exception 'p_routes must be a JSON array';
  end if;

  for v_item in select value from jsonb_array_elements(p_routes)
  loop
    v_client_updated_at := coalesce(nullif(v_item->>'client_updated_at', '')::timestamptz, now());

    insert into public.d2d_field_routes (
      user_id, client_route_id, route_data, client_updated_at, updated_at
    ) values (
      v_user,
      v_item->>'client_route_id',
      coalesce(v_item->'route_data', '{}'::jsonb),
      v_client_updated_at,
      now()
    )
    on conflict (user_id, client_route_id)
    do update set
      route_data = excluded.route_data,
      client_updated_at = excluded.client_updated_at,
      updated_at = now()
    where public.d2d_field_routes.client_updated_at <= excluded.client_updated_at;
  end loop;
end;
$$;

revoke all on function public.upsert_d2d_field_routes(jsonb) from public;
revoke all on function public.upsert_d2d_field_routes(jsonb) from anon;
grant execute on function public.upsert_d2d_field_routes(jsonb) to authenticated;
