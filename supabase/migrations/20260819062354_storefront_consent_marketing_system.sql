alter table public.storefront_call_leads
  add column if not exists sms_marketing_consent boolean not null default false,
  add column if not exists sms_marketing_consent_at timestamptz,
  add column if not exists sms_marketing_consent_source text,
  add column if not exists sms_marketing_consent_text text,
  add column if not exists sms_opted_out_at timestamptz,
  add column if not exists last_marketing_sms_at timestamptz,
  add column if not exists ai_call_consent_text text,
  add column if not exists ai_call_consent_revoked_at timestamptz,
  add column if not exists ai_call_frequency text not null default 'none',
  add column if not exists ai_next_call_at timestamptz,
  add column if not exists ai_last_call_at timestamptz,
  add column if not exists consent_phone text,
  add column if not exists marketing_referral_code text,
  add column if not exists referred_by_marketing_code text;

update public.storefront_call_leads
set ai_call_frequency = 'one_time'
where ai_call_consent = true
  and coalesce(ai_call_frequency, 'none') = 'none';

alter table public.storefront_call_leads
  drop constraint if exists storefront_call_leads_ai_call_frequency_check;

alter table public.storefront_call_leads
  add constraint storefront_call_leads_ai_call_frequency_check
  check (ai_call_frequency in ('none', 'one_time', 'monthly'));

create unique index if not exists storefront_call_leads_marketing_referral_code_uidx
  on public.storefront_call_leads (marketing_referral_code)
  where marketing_referral_code is not null;

create index if not exists storefront_call_leads_ai_due_idx
  on public.storefront_call_leads (ai_next_call_at)
  where ai_call_consent = true and do_not_call = false;

create index if not exists storefront_call_leads_sms_marketing_idx
  on public.storefront_call_leads (city, last_marketing_sms_at)
  where sms_marketing_consent = true;

create table if not exists public.storefront_contact_consents (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.storefront_call_leads(id) on delete cascade,
  phone text not null,
  consent_type text not null check (consent_type in ('sms_marketing', 'ai_voice_one_time', 'ai_voice_monthly', 'do_not_call')),
  granted boolean not null,
  source text not null,
  consent_text text,
  actor_user_id uuid,
  ip_address text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists storefront_contact_consents_lead_time_idx
  on public.storefront_contact_consents (lead_id, occurred_at desc);

alter table public.storefront_contact_consents enable row level security;

drop policy if exists "Admins manage storefront contact consents" on public.storefront_contact_consents;
create policy "Admins manage storefront contact consents"
  on public.storefront_contact_consents
  for all
  to public
  using (is_admin())
  with check (is_admin());

drop policy if exists "Call desk users read storefront contact consents" on public.storefront_contact_consents;
create policy "Call desk users read storefront contact consents"
  on public.storefront_contact_consents
  for select
  to authenticated
  using (private.can_use_call_desk(auth.uid()));

drop policy if exists "Call desk users insert storefront contact consents" on public.storefront_contact_consents;
create policy "Call desk users insert storefront contact consents"
  on public.storefront_contact_consents
  for insert
  to authenticated
  with check (private.can_use_call_desk(auth.uid()));

grant select, insert on public.storefront_contact_consents to authenticated;
revoke all on public.storefront_contact_consents from anon;

create table if not exists public.storefront_marketing_deliveries (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.storefront_call_leads(id) on delete cascade,
  source_booking_id uuid references public.bookings(id) on delete set null,
  message_type text not null check (message_type in ('local_booking', 'pricing_update', 'referral_offer', 'consent_confirmation')),
  phone text not null,
  message_body text not null,
  twilio_message_sid text,
  status text not null default 'sent',
  error text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists storefront_marketing_delivery_booking_uidx
  on public.storefront_marketing_deliveries (lead_id, source_booking_id, message_type)
  where source_booking_id is not null;

create index if not exists storefront_marketing_deliveries_lead_time_idx
  on public.storefront_marketing_deliveries (lead_id, created_at desc);

alter table public.storefront_marketing_deliveries enable row level security;

drop policy if exists "Admins manage storefront marketing deliveries" on public.storefront_marketing_deliveries;
create policy "Admins manage storefront marketing deliveries"
  on public.storefront_marketing_deliveries
  for all
  to public
  using (is_admin())
  with check (is_admin());

drop policy if exists "Call desk users read storefront marketing deliveries" on public.storefront_marketing_deliveries;
create policy "Call desk users read storefront marketing deliveries"
  on public.storefront_marketing_deliveries
  for select
  to authenticated
  using (private.can_use_call_desk(auth.uid()));

grant select on public.storefront_marketing_deliveries to authenticated;
revoke all on public.storefront_marketing_deliveries from anon;

create table if not exists public.storefront_referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_lead_id uuid not null references public.storefront_call_leads(id) on delete cascade,
  referred_lead_id uuid not null references public.storefront_call_leads(id) on delete cascade,
  referral_code text not null,
  status text not null default 'pending' check (status in ('pending', 'qualified', 'credited', 'void')),
  qualified_at timestamptz,
  credited_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (referred_lead_id)
);

create index if not exists storefront_referrals_referrer_idx
  on public.storefront_referrals (referrer_lead_id, created_at desc);

alter table public.storefront_referrals enable row level security;

drop policy if exists "Admins manage storefront referrals" on public.storefront_referrals;
create policy "Admins manage storefront referrals"
  on public.storefront_referrals
  for all
  to public
  using (is_admin())
  with check (is_admin());

drop policy if exists "Call desk users read storefront referrals" on public.storefront_referrals;
create policy "Call desk users read storefront referrals"
  on public.storefront_referrals
  for select
  to authenticated
  using (private.can_use_call_desk(auth.uid()));

grant select on public.storefront_referrals to authenticated;
revoke all on public.storefront_referrals from anon;
