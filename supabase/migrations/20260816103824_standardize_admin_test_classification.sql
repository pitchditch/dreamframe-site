alter table public.customers
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

alter table public.quotes
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

alter table public.bookings
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

alter table public.jobs
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

alter table public.invoices
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

alter table public.leads
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

alter table public.call_logs
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

alter table public.virtual_estimate_sessions
  add column if not exists is_test boolean not null default false,
  add column if not exists test_reason text,
  add column if not exists test_marked_at timestamptz,
  add column if not exists test_marked_by uuid;

create or replace function private.detect_admin_test_reason(
  p_email text default null,
  p_phone text default null,
  p_address text default null,
  p_customer_id uuid default null,
  p_quote_id uuid default null,
  p_visitor_id text default null,
  p_session_id text default null,
  p_explicit jsonb default '{}'::jsonb
)
returns text
language plpgsql
stable
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_email text := private.normalize_customer_email(p_email);
  v_phone text := private.normalize_customer_phone(p_phone);
  v_address text := private.normalize_customer_address(p_address);
  v_reason text;
begin
  if coalesce(lower(p_explicit->>'is_test'),'false') = 'true'
     or coalesce(lower(p_explicit->>'is_internal'),'false') = 'true' then
    return coalesce(
      nullif(p_explicit->>'test_reason',''),
      nullif(p_explicit->>'internal_reason',''),
      'explicit_admin_test'
    );
  end if;

  if p_customer_id is not null then
    select coalesce(nullif(c.test_reason,''), 'linked_test_customer')
      into v_reason
    from public.customers c
    where c.id = p_customer_id and (c.is_test or c.is_internal)
    limit 1;
    if v_reason is not null then return v_reason; end if;
  end if;

  if p_quote_id is not null then
    select coalesce(nullif(q.test_reason,''), nullif(q.source_details->>'internal_reason',''), 'linked_test_quote')
      into v_reason
    from public.quotes q
    where q.id = p_quote_id
      and (q.is_test
        or coalesce(lower(q.source_details->>'is_test'),'false') = 'true'
        or coalesce(lower(q.source_details->>'is_internal'),'false') = 'true')
    limit 1;
    if v_reason is not null then return v_reason; end if;
  end if;

  if nullif(trim(coalesce(p_visitor_id,'')),'') is not null then
    select coalesce(nullif(v.internal_reason,''), 'admin_browser')
      into v_reason
    from public.analytics_visitors v
    where v.visitor_id = p_visitor_id and (v.is_test or v.is_internal)
    limit 1;
    if v_reason is not null then return v_reason; end if;
  end if;

  if nullif(trim(coalesce(p_session_id,'')),'') is not null then
    select coalesce(nullif(s.internal_reason,''), 'admin_browser')
      into v_reason
    from public.analytics_sessions s
    where s.session_id = p_session_id and s.is_internal
    limit 1;
    if v_reason is not null then return v_reason; end if;
  end if;

  if v_email is not null then
    select i.reason into v_reason
    from private.internal_customer_identifiers i
    where i.identifier_type = 'email' and i.normalized_value = v_email
    limit 1;
    if v_reason is not null then return v_reason; end if;

    if exists (select 1 from public.admin_users a where lower(a.email) = v_email and a.role = 'admin') then
      return 'admin_user_email';
    end if;
  end if;

  if v_phone is not null then
    select i.reason into v_reason
    from private.internal_customer_identifiers i
    where i.identifier_type = 'phone' and i.normalized_value = v_phone
    limit 1;
    if v_reason is not null then return v_reason; end if;
  end if;

  if v_address is not null then
    select i.reason into v_reason
    from private.internal_customer_identifiers i
    where i.identifier_type = 'address' and i.normalized_value = v_address
    limit 1;
    if v_reason is not null then return v_reason; end if;
  end if;

  return null;
end;
$$;

create or replace function private.classify_customer_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare v_reason text;
begin
  v_reason := private.detect_admin_test_reason(new.email,new.phone,new.address,null,null,null,null,'{}'::jsonb);
  if new.auth_user_id is not null and exists (
    select 1 from public.admin_users a
    join auth.users u on lower(u.email)=lower(a.email)
    where u.id=new.auth_user_id and a.role='admin'
  ) then
    v_reason := coalesce(v_reason,'admin_user_identity');
  end if;
  if new.is_internal or new.is_test then
    v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test');
  end if;
  if v_reason is not null then
    new.is_internal := true;
    new.is_test := true;
    new.test_reason := v_reason;
    new.test_marked_at := coalesce(new.test_marked_at,now());
    new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists classify_customer_admin_test on public.customers;
create trigger classify_customer_admin_test
before insert or update of email, phone, address, auth_user_id, is_internal, is_test, test_reason
on public.customers
for each row execute function private.classify_customer_admin_test();

create or replace function private.classify_quote_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_reason text;
  v_details jsonb := coalesce(new.source_details,'{}'::jsonb);
begin
  v_reason := private.detect_admin_test_reason(
    new.customer_email,new.customer_phone,new.property_address,new.customer_id,null,
    v_details->>'visitor_id',v_details->>'session_id',v_details
  );
  if new.is_test then v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test'); end if;
  if v_reason is not null then
    new.is_test := true;
    new.test_reason := v_reason;
    new.test_marked_at := coalesce(new.test_marked_at,now());
    new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
    new.source_details := v_details || jsonb_build_object(
      'is_test',true,
      'is_internal',true,
      'internal_reason',v_reason,
      'internal_marked_at',coalesce(new.test_marked_at,now())
    );
  end if;
  return new;
end;
$$;

drop trigger if exists classify_quote_admin_test on public.quotes;
create trigger classify_quote_admin_test
before insert or update of customer_email, customer_phone, property_address, customer_id, source_details, is_test, test_reason
on public.quotes
for each row execute function private.classify_quote_admin_test();

create or replace function private.classify_booking_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare v_reason text;
begin
  v_reason := private.detect_admin_test_reason(new.customer_email,new.customer_phone,new.service_address,new.customer_id,new.quote_id,null,null,'{}'::jsonb);
  if new.is_test then v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test'); end if;
  if v_reason is not null then
    new.is_test := true; new.test_reason := v_reason; new.test_marked_at := coalesce(new.test_marked_at,now()); new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists classify_booking_admin_test on public.bookings;
create trigger classify_booking_admin_test
before insert or update of customer_email, customer_phone, service_address, customer_id, quote_id, is_test, test_reason
on public.bookings
for each row execute function private.classify_booking_admin_test();

create or replace function private.classify_job_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare v_reason text;
begin
  v_reason := private.detect_admin_test_reason(null,null,null,new.customer_id,new.quote_id,null,null,'{}'::jsonb);
  if new.is_test then v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test'); end if;
  if v_reason is not null then
    new.is_test := true; new.test_reason := v_reason; new.test_marked_at := coalesce(new.test_marked_at,now()); new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists classify_job_admin_test on public.jobs;
create trigger classify_job_admin_test
before insert or update of customer_id, quote_id, is_test, test_reason
on public.jobs
for each row execute function private.classify_job_admin_test();

create or replace function private.classify_invoice_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare v_reason text;
begin
  v_reason := private.detect_admin_test_reason(null,null,null,new.customer_id,new.quote_id,null,null,'{}'::jsonb);
  if v_reason is null and new.job_id is not null then
    select coalesce(nullif(j.test_reason,''),'linked_test_job') into v_reason
    from public.jobs j where j.id=new.job_id and j.is_test limit 1;
  end if;
  if new.is_test then v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test'); end if;
  if v_reason is not null then
    new.is_test := true; new.test_reason := v_reason; new.test_marked_at := coalesce(new.test_marked_at,now()); new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists classify_invoice_admin_test on public.invoices;
create trigger classify_invoice_admin_test
before insert or update of customer_id, quote_id, job_id, is_test, test_reason
on public.invoices
for each row execute function private.classify_invoice_admin_test();

create or replace function private.classify_lead_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare v_reason text;
begin
  v_reason := private.detect_admin_test_reason(new.email,new.phone,new.property_address,new.conversion_customer_id,new.conversion_quote_id,null,null,'{}'::jsonb);
  if v_reason is null and lower(coalesce(new.lead_source,'')) like '%test%' then v_reason := 'test_lead_source'; end if;
  if new.is_test then v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test'); end if;
  if v_reason is not null then
    new.is_test := true; new.test_reason := v_reason; new.test_marked_at := coalesce(new.test_marked_at,now()); new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists classify_lead_admin_test on public.leads;
create trigger classify_lead_admin_test
before insert or update of email, phone, property_address, conversion_customer_id, conversion_quote_id, lead_source, is_test, test_reason
on public.leads
for each row execute function private.classify_lead_admin_test();

create or replace function private.classify_call_log_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare v_reason text;
begin
  v_reason := private.detect_admin_test_reason(null,new.phone_number,null,null,null,null,new.session_id,'{}'::jsonb);
  if v_reason is null and lower(coalesce(new.call_type,'')) like '%test%' then v_reason := 'test_call_type'; end if;
  if new.is_test then v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test'); end if;
  if v_reason is not null then
    new.is_test := true; new.test_reason := v_reason; new.test_marked_at := coalesce(new.test_marked_at,now()); new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists classify_call_log_admin_test on public.call_logs;
create trigger classify_call_log_admin_test
before insert or update of phone_number, session_id, call_type, is_test, test_reason
on public.call_logs
for each row execute function private.classify_call_log_admin_test();

create or replace function private.classify_virtual_estimate_admin_test()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare v_reason text;
begin
  v_reason := private.detect_admin_test_reason(new.customer_email,new.customer_phone,new.address,null,null,null,null,'{}'::jsonb);
  if v_reason is null and lower(coalesce(new.participant_source,'')) like '%test%' then v_reason := 'test_participant_source'; end if;
  if new.is_test then v_reason := coalesce(nullif(new.test_reason,''),v_reason,'manual_admin_test'); end if;
  if v_reason is not null then
    new.is_test := true; new.test_reason := v_reason; new.test_marked_at := coalesce(new.test_marked_at,now()); new.test_marked_by := coalesce(new.test_marked_by,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists classify_virtual_estimate_admin_test on public.virtual_estimate_sessions;
create trigger classify_virtual_estimate_admin_test
before insert or update of customer_email, customer_phone, address, participant_source, is_test, test_reason
on public.virtual_estimate_sessions
for each row execute function private.classify_virtual_estimate_admin_test();

update public.customers c
set is_test=true,
    is_internal=true,
    test_reason=coalesce(nullif(c.test_reason,''),private.detect_admin_test_reason(c.email,c.phone,c.address,null,null,null,null,'{}'::jsonb),'preexisting_internal_record'),
    test_marked_at=coalesce(c.test_marked_at,now())
where c.is_internal
   or private.detect_admin_test_reason(c.email,c.phone,c.address,null,null,null,null,'{}'::jsonb) is not null;

update public.quotes q
set is_test=true,
    test_reason=coalesce(nullif(q.test_reason,''),private.detect_admin_test_reason(q.customer_email,q.customer_phone,q.property_address,q.customer_id,null,q.source_details->>'visitor_id',q.source_details->>'session_id',q.source_details),'preexisting_admin_test'),
    test_marked_at=coalesce(q.test_marked_at,now()),
    source_details=coalesce(q.source_details,'{}'::jsonb) || jsonb_build_object(
      'is_test',true,
      'is_internal',true,
      'internal_reason',coalesce(nullif(q.test_reason,''),private.detect_admin_test_reason(q.customer_email,q.customer_phone,q.property_address,q.customer_id,null,q.source_details->>'visitor_id',q.source_details->>'session_id',q.source_details),'preexisting_admin_test'),
      'internal_marked_at',coalesce(q.test_marked_at,now())
    )
where q.is_test
   or private.detect_admin_test_reason(q.customer_email,q.customer_phone,q.property_address,q.customer_id,null,q.source_details->>'visitor_id',q.source_details->>'session_id',q.source_details) is not null;

update public.bookings b
set is_test=true,
    test_reason=coalesce(nullif(b.test_reason,''),private.detect_admin_test_reason(b.customer_email,b.customer_phone,b.service_address,b.customer_id,b.quote_id,null,null,'{}'::jsonb),'linked_admin_test'),
    test_marked_at=coalesce(b.test_marked_at,now())
where b.is_test or private.detect_admin_test_reason(b.customer_email,b.customer_phone,b.service_address,b.customer_id,b.quote_id,null,null,'{}'::jsonb) is not null;

update public.jobs j
set is_test=true,
    test_reason=coalesce(nullif(j.test_reason,''),private.detect_admin_test_reason(null,null,null,j.customer_id,j.quote_id,null,null,'{}'::jsonb),'linked_admin_test'),
    test_marked_at=coalesce(j.test_marked_at,now())
where j.is_test or private.detect_admin_test_reason(null,null,null,j.customer_id,j.quote_id,null,null,'{}'::jsonb) is not null;

update public.invoices i
set is_test=true,
    test_reason=coalesce(nullif(i.test_reason,''),private.detect_admin_test_reason(null,null,null,i.customer_id,i.quote_id,null,null,'{}'::jsonb),j.test_reason,'linked_admin_test'),
    test_marked_at=coalesce(i.test_marked_at,now())
from public.jobs j
where i.job_id=j.id
  and (i.is_test or j.is_test or private.detect_admin_test_reason(null,null,null,i.customer_id,i.quote_id,null,null,'{}'::jsonb) is not null);

update public.invoices i
set is_test=true,
    test_reason=coalesce(nullif(i.test_reason,''),private.detect_admin_test_reason(null,null,null,i.customer_id,i.quote_id,null,null,'{}'::jsonb),'linked_admin_test'),
    test_marked_at=coalesce(i.test_marked_at,now())
where not i.is_test
  and private.detect_admin_test_reason(null,null,null,i.customer_id,i.quote_id,null,null,'{}'::jsonb) is not null;

update public.leads l
set is_test=true,
    test_reason=coalesce(nullif(l.test_reason,''),private.detect_admin_test_reason(l.email,l.phone,l.property_address,l.conversion_customer_id,l.conversion_quote_id,null,null,'{}'::jsonb),case when lower(coalesce(l.lead_source,'')) like '%test%' then 'test_lead_source' end,'preexisting_admin_test'),
    test_marked_at=coalesce(l.test_marked_at,now())
where l.is_test
   or lower(coalesce(l.lead_source,'')) like '%test%'
   or private.detect_admin_test_reason(l.email,l.phone,l.property_address,l.conversion_customer_id,l.conversion_quote_id,null,null,'{}'::jsonb) is not null;

update public.call_logs c
set is_test=true,
    test_reason=coalesce(nullif(c.test_reason,''),private.detect_admin_test_reason(null,c.phone_number,null,null,null,null,c.session_id,'{}'::jsonb),case when lower(coalesce(c.call_type,'')) like '%test%' then 'test_call_type' end,'preexisting_admin_test'),
    test_marked_at=coalesce(c.test_marked_at,now())
where c.is_test
   or lower(coalesce(c.call_type,'')) like '%test%'
   or private.detect_admin_test_reason(null,c.phone_number,null,null,null,null,c.session_id,'{}'::jsonb) is not null;

update public.virtual_estimate_sessions v
set is_test=true,
    test_reason=coalesce(nullif(v.test_reason,''),private.detect_admin_test_reason(v.customer_email,v.customer_phone,v.address,null,null,null,null,'{}'::jsonb),case when lower(coalesce(v.participant_source,'')) like '%test%' then 'test_participant_source' end,'preexisting_admin_test'),
    test_marked_at=coalesce(v.test_marked_at,now())
where v.is_test
   or lower(coalesce(v.participant_source,'')) like '%test%'
   or private.detect_admin_test_reason(v.customer_email,v.customer_phone,v.address,null,null,null,null,'{}'::jsonb) is not null;

create index if not exists customers_is_test_idx on public.customers (is_test) where is_test;
create index if not exists quotes_is_test_idx on public.quotes (is_test) where is_test;
create index if not exists bookings_is_test_idx on public.bookings (is_test) where is_test;
create index if not exists jobs_is_test_idx on public.jobs (is_test) where is_test;
create index if not exists invoices_is_test_idx on public.invoices (is_test) where is_test;
create index if not exists leads_is_test_idx on public.leads (is_test) where is_test;
