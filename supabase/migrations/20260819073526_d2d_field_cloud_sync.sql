create table if not exists public.d2d_field_pins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  identity_key text not null,
  client_pin_id text not null,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  status text not null check (status in ('visited','interested','not-interested','completed','revisit-later','needs-quote')),
  lead_source text,
  is_storefront boolean not null default false,
  storefront_type text,
  business_name text,
  phone_number text,
  pin_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, identity_key)
);

create index if not exists d2d_field_pins_user_updated_idx
  on public.d2d_field_pins (user_id, updated_at desc);
create index if not exists d2d_field_pins_user_storefront_status_idx
  on public.d2d_field_pins (user_id, is_storefront, status);

alter table public.d2d_field_pins enable row level security;

drop policy if exists "Users manage own D2D field pins" on public.d2d_field_pins;
create policy "Users manage own D2D field pins"
on public.d2d_field_pins
for all
to authenticated
using ((select auth.uid()) = user_id or is_admin((select auth.uid())))
with check ((select auth.uid()) = user_id or is_admin((select auth.uid())));

grant select, insert, update, delete on public.d2d_field_pins to authenticated;
grant all on public.d2d_field_pins to service_role;

create table if not exists public.d2d_crawl_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  origin_lat double precision not null,
  origin_lng double precision not null,
  radius_meters integer not null default 1500,
  raw_count integer not null default 0,
  eligible_count integer not null default 0,
  shown_count integer not null default 0,
  excluded_visited integer not null default 0,
  candidates jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists d2d_crawl_sessions_user_created_idx
  on public.d2d_crawl_sessions (user_id, created_at desc);

alter table public.d2d_crawl_sessions enable row level security;

drop policy if exists "Users manage own D2D crawl sessions" on public.d2d_crawl_sessions;
create policy "Users manage own D2D crawl sessions"
on public.d2d_crawl_sessions
for all
to authenticated
using ((select auth.uid()) = user_id or is_admin((select auth.uid())))
with check ((select auth.uid()) = user_id or is_admin((select auth.uid())));

grant select, insert, update, delete on public.d2d_crawl_sessions to authenticated;
grant all on public.d2d_crawl_sessions to service_role;
