create table if not exists public.storefront_opt_in_challenges (
  id uuid primary key default gen_random_uuid(),
  challenge_token uuid not null unique default gen_random_uuid(),
  phone text not null,
  code_hash text not null,
  payload jsonb not null default '{}'::jsonb,
  ip_address text,
  user_agent text,
  attempts integer not null default 0 check (attempts >= 0 and attempts <= 10),
  expires_at timestamptz not null,
  verified_at timestamptz,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists storefront_opt_in_challenges_phone_created_idx
  on public.storefront_opt_in_challenges (phone, created_at desc);

create index if not exists storefront_opt_in_challenges_expiry_idx
  on public.storefront_opt_in_challenges (expires_at)
  where consumed_at is null;

alter table public.storefront_opt_in_challenges enable row level security;
revoke all on public.storefront_opt_in_challenges from anon, authenticated;

comment on table public.storefront_opt_in_challenges is
  'Short-lived phone verification challenges used before storefront SMS or AI voice consent becomes active.';
