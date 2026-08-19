alter table public.leads
  add column if not exists customer_id uuid references public.customers(id) on delete set null;

alter table public.virtual_estimate_sessions
  add column if not exists customer_id uuid references public.customers(id) on delete set null;

create index if not exists leads_customer_id_idx on public.leads(customer_id);
create index if not exists virtual_estimate_sessions_customer_id_idx on public.virtual_estimate_sessions(customer_id);

create or replace function private.resolve_customer_profile(
  p_name text,
  p_email text,
  p_phone text,
  p_address text,
  p_lead_source text default null,
  p_services jsonb default null,
  p_target_stage text default 'lead',
  p_allow_name_address_match boolean default true
)
returns uuid
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_email text := private.normalize_customer_email(p_email);
  v_phone text := private.normalize_customer_phone(p_phone);
  v_name text := private.normalize_customer_name(p_name);
  v_address text := private.normalize_customer_address(p_address);
  v_customer_id uuid;
  v_display_name text;
  v_target_stage text := case when lower(coalesce(p_target_stage,'lead')) = 'client' then 'client' else 'lead' end;
begin
  if private.is_internal_customer_request(p_email, p_phone, p_address) then
    return null;
  end if;

  if v_email is null and v_phone is null and not (v_name is not null and v_address is not null) then
    return null;
  end if;

  if v_email is not null then
    perform pg_advisory_xact_lock(hashtextextended('customer-email:' || v_email, 0));
  end if;
  if v_phone is not null then
    perform pg_advisory_xact_lock(hashtextextended('customer-phone:' || v_phone, 0));
  end if;
  if v_name is not null and v_address is not null then
    perform pg_advisory_xact_lock(hashtextextended('customer-name-address:' || v_name || '|' || v_address, 0));
  end if;

  if v_email is not null then
    select ci.customer_id into v_customer_id
    from public.customer_identifiers ci
    join public.customers c on c.id = ci.customer_id
    where ci.identifier_type = 'email'
      and ci.normalized_value = v_email
      and not c.is_internal
      and not coalesce(c.is_test,false)
    order by c.created_at
    limit 1;
  end if;

  if v_customer_id is null and v_phone is not null then
    select ci.customer_id into v_customer_id
    from public.customer_identifiers ci
    join public.customers c on c.id = ci.customer_id
    where ci.identifier_type = 'phone'
      and ci.normalized_value = v_phone
      and not c.is_internal
      and not coalesce(c.is_test,false)
    order by c.created_at
    limit 1;
  end if;

  if v_customer_id is null and v_email is not null then
    select c.id into v_customer_id
    from public.customers c
    where not c.is_internal
      and not coalesce(c.is_test,false)
      and private.normalize_customer_email(c.email) = v_email
    order by c.created_at
    limit 1;
  end if;

  if v_customer_id is null and v_phone is not null then
    select c.id into v_customer_id
    from public.customers c
    where not c.is_internal
      and not coalesce(c.is_test,false)
      and private.normalize_customer_phone(c.phone) = v_phone
    order by c.created_at
    limit 1;
  end if;

  if v_customer_id is null and p_allow_name_address_match and v_name is not null and v_address is not null then
    select c.id into v_customer_id
    from public.customers c
    where not c.is_internal
      and not coalesce(c.is_test,false)
      and private.normalize_customer_name(c.name) = v_name
      and private.normalize_customer_address(c.address) = v_address
    order by c.created_at
    limit 1;
  end if;

  if v_customer_id is null then
    v_display_name := coalesce(
      nullif(btrim(p_name),''),
      case when v_email is not null then initcap(replace(split_part(v_email,'@',1),'.',' ')) end,
      case when v_phone is not null then 'Client ' || right(v_phone,4) end,
      'Client'
    );

    insert into public.customers (
      name, email, phone, address, lead_source, services_interested,
      is_internal, lifecycle_stage, first_client_at, last_activity_at, archived_at
    ) values (
      v_display_name,
      v_email,
      nullif(btrim(p_phone),''),
      nullif(btrim(p_address),''),
      nullif(btrim(p_lead_source),''),
      coalesce(p_services,'[]'::jsonb),
      false,
      v_target_stage,
      case when v_target_stage = 'client' then now() else null end,
      now(),
      null
    )
    returning id into v_customer_id;
  else
    update public.customers c
    set
      name = case
        when v_name is not null and (private.normalize_customer_name(c.name) is null or c.name ~* '^Client( [0-9]{4})?$')
          then btrim(p_name)
        else c.name
      end,
      email = case
        when c.email is null and v_email is not null and not exists (
          select 1 from public.customers x
          where x.id <> c.id and private.normalize_customer_email(x.email) = v_email
        ) then v_email
        else c.email
      end,
      phone = case
        when c.phone is null and v_phone is not null and not exists (
          select 1 from public.customers x
          where x.id <> c.id and private.normalize_customer_phone(x.phone) = v_phone
        ) then nullif(btrim(p_phone),'')
        else c.phone
      end,
      address = coalesce(c.address, nullif(btrim(p_address),'')),
      lead_source = coalesce(c.lead_source, nullif(btrim(p_lead_source),'')),
      services_interested = case
        when p_services is null or p_services = 'null'::jsonb then c.services_interested
        when coalesce(c.services_interested,'[]'::jsonb) = '[]'::jsonb then p_services
        else c.services_interested
      end,
      lifecycle_stage = case
        when c.lifecycle_stage = 'client' or v_target_stage = 'client' then 'client'
        else 'lead'
      end,
      first_client_at = case
        when v_target_stage = 'client' then coalesce(c.first_client_at, now())
        else c.first_client_at
      end,
      last_activity_at = now(),
      archived_at = null,
      updated_at = now()
    where c.id = v_customer_id;
  end if;

  if v_email is not null then
    insert into public.customer_identifiers(
      customer_id, identifier_type, normalized_value, display_value, is_primary
    ) values (
      v_customer_id, 'email', v_email, nullif(btrim(p_email),''), true
    ) on conflict (identifier_type, normalized_value) do nothing;
  end if;

  if v_phone is not null then
    insert into public.customer_identifiers(
      customer_id, identifier_type, normalized_value, display_value, is_primary
    ) values (
      v_customer_id, 'phone', v_phone, nullif(btrim(p_phone),''), true
    ) on conflict (identifier_type, normalized_value) do nothing;
  end if;

  return v_customer_id;
end;
$$;

create or replace function private.resolve_customer(
  p_name text,
  p_email text,
  p_phone text,
  p_address text,
  p_lead_source text default null,
  p_services jsonb default null,
  p_allow_name_match boolean default true
)
returns uuid
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
begin
  return private.resolve_customer_profile(
    p_name,p_email,p_phone,p_address,p_lead_source,p_services,'client',p_allow_name_match
  );
end;
$$;

create or replace function private.sync_lead_customer_profile()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_services jsonb;
begin
  if coalesce(new.is_test,false) then
    return new;
  end if;

  v_services := case
    when nullif(btrim(new.service_requested),'') is null then '[]'::jsonb
    else jsonb_build_array(new.service_requested)
  end;

  new.customer_id := private.resolve_customer_profile(
    new.name,
    new.email,
    new.phone,
    new.property_address,
    new.lead_source,
    v_services,
    'lead',
    true
  );

  return new;
end;
$$;

create or replace function private.sync_virtual_estimate_customer_profile()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
begin
  if coalesce(new.is_test,false) then
    return new;
  end if;

  new.customer_id := private.resolve_customer_profile(
    new.customer_name,
    new.customer_email,
    new.customer_phone,
    new.address,
    coalesce(nullif(new.participant_source,''),'virtual_estimate'),
    '[]'::jsonb,
    'lead',
    true
  );

  return new;
end;
$$;

create or replace function private.sync_quote_customer()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_customer_id uuid;
  v_qualifies boolean;
begin
  if coalesce(new.is_test,false)
     or lower(coalesce(new.source_details->>'is_internal','false')) = 'true'
     or lower(coalesce(new.source_details->>'is_test','false')) = 'true' then
    return new;
  end if;

  if new.customer_id is null then
    v_customer_id := private.resolve_customer_profile(
      new.customer_name,
      new.customer_email,
      new.customer_phone,
      new.property_address,
      coalesce(new.source,new.channel),
      new.services,
      'lead',
      true
    );
    new.customer_id := v_customer_id;
  else
    v_customer_id := new.customer_id;
  end if;

  if v_customer_id is null then
    return new;
  end if;

  v_qualifies :=
    new.status in ('sent','viewed','approved','booked','completed')
    or new.sent_to_customer_at is not null
    or lower(coalesce(new.email_delivery_status,'')) in ('sent','accepted','delivered','success');

  update public.leads l
  set customer_id = coalesce(l.customer_id, v_customer_id),
      conversion_customer_id = case when v_qualifies then coalesce(l.conversion_customer_id, v_customer_id) else l.conversion_customer_id end,
      conversion_quote_id = case when v_qualifies then coalesce(l.conversion_quote_id, new.id) else l.conversion_quote_id end,
      status = case
        when v_qualifies and l.status in ('new','contacted','qualified','pending') then 'quoted'
        else l.status
      end,
      updated_at = now()
  where (l.customer_id is null or l.customer_id = v_customer_id)
    and (
      (private.normalize_customer_email(new.customer_email) is not null
       and private.normalize_customer_email(l.email) = private.normalize_customer_email(new.customer_email))
      or
      (private.normalize_customer_phone(new.customer_phone) is not null
       and private.normalize_customer_phone(l.phone) = private.normalize_customer_phone(new.customer_phone))
    );

  return new;
end;
$$;

create or replace function private.sync_booking_customer()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_quote public.quotes%rowtype;
  v_customer_id uuid;
  v_name text;
  v_email text;
  v_phone text;
  v_address text;
  v_source text;
  v_services jsonb;
begin
  if coalesce(new.is_test,false) then
    return new;
  end if;

  if new.quote_id is not null then
    select * into v_quote from public.quotes where id = new.quote_id;
  end if;

  v_email := coalesce(nullif(new.customer_email,''), v_quote.customer_email);
  v_phone := coalesce(nullif(new.customer_phone,''), v_quote.customer_phone);
  v_address := coalesce(nullif(new.service_address,''), v_quote.property_address);
  v_name := v_quote.customer_name;
  v_source := coalesce(v_quote.source, v_quote.channel, 'booking');
  v_services := v_quote.services;

  if private.normalize_customer_name(v_name) is null then
    select l.name into v_name
    from public.leads l
    where (private.normalize_customer_email(v_email) is not null
           and private.normalize_customer_email(l.email) = private.normalize_customer_email(v_email))
       or (private.normalize_customer_phone(v_phone) is not null
           and private.normalize_customer_phone(l.phone) = private.normalize_customer_phone(v_phone))
    order by l.created_at desc
    limit 1;
  end if;

  if new.customer_id is not null then
    v_customer_id := new.customer_id;
  elsif v_quote.customer_id is not null then
    v_customer_id := v_quote.customer_id;
  else
    v_customer_id := private.resolve_customer_profile(
      v_name, v_email, v_phone, v_address, v_source, v_services, 'client', true
    );
  end if;

  if v_customer_id is not null then
    new.customer_id := v_customer_id;

    update public.customers
    set lifecycle_stage = 'client',
        first_client_at = coalesce(first_client_at, now()),
        last_activity_at = now(),
        archived_at = null,
        updated_at = now()
    where id = v_customer_id;

    if new.quote_id is not null then
      update public.quotes
      set customer_id = v_customer_id
      where id = new.quote_id and customer_id is distinct from v_customer_id;
    end if;

    update public.leads l
    set customer_id = coalesce(l.customer_id, v_customer_id),
        conversion_customer_id = coalesce(l.conversion_customer_id, v_customer_id),
        conversion_quote_id = coalesce(l.conversion_quote_id, new.quote_id),
        status = case when l.status in ('new','contacted','qualified','pending','quoted') then 'converted' else l.status end,
        updated_at = now()
    where (l.customer_id is null or l.customer_id = v_customer_id)
      and (
        (private.normalize_customer_email(v_email) is not null
         and private.normalize_customer_email(l.email) = private.normalize_customer_email(v_email))
        or
        (private.normalize_customer_phone(v_phone) is not null
         and private.normalize_customer_phone(l.phone) = private.normalize_customer_phone(v_phone))
      );
  end if;

  return new;
end;
$$;

create or replace function public.convert_lead_to_quote(p_lead_id uuid)
returns uuid
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_quote_id uuid;
  v_customer_id uuid;
  v_lead public.leads%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Admin access required';
  end if;

  select * into v_lead from public.leads where id=p_lead_id;
  if v_lead.id is null then
    raise exception 'Lead not found';
  end if;

  v_customer_id := coalesce(
    v_lead.customer_id,
    private.resolve_customer_profile(
      v_lead.name,
      v_lead.email,
      v_lead.phone,
      v_lead.property_address,
      v_lead.lead_source,
      case when v_lead.service_requested is null then '[]'::jsonb
           else jsonb_build_array(v_lead.service_requested) end,
      'lead',
      true
    )
  );

  insert into public.quotes(
    customer_id, customer_name, customer_email, customer_phone,
    property_address, services, notes, source, channel, status
  ) values (
    v_customer_id, v_lead.name, v_lead.email, v_lead.phone,
    v_lead.property_address,
    case when v_lead.service_requested is null then '[]'::jsonb
         else jsonb_build_array(v_lead.service_requested) end,
    v_lead.message, v_lead.lead_source, 'admin', 'draft'
  )
  returning id into v_quote_id;

  update public.leads
  set customer_id=v_customer_id,
      status='quoted',
      conversion_quote_id=v_quote_id,
      conversion_customer_id=v_customer_id,
      updated_at=now()
  where id=p_lead_id;

  return v_quote_id;
end;
$$;

drop trigger if exists a_sync_quote_customer on public.quotes;
drop trigger if exists z_sync_quote_customer_profile on public.quotes;
create trigger z_sync_quote_customer_profile
before insert or update of status, customer_name, customer_email, customer_phone, property_address, sent_to_customer_at, email_delivery_status, source_details, source, channel, services, is_test
on public.quotes
for each row execute function private.sync_quote_customer();

drop trigger if exists a_sync_booking_customer on public.bookings;
drop trigger if exists z_sync_booking_customer_profile on public.bookings;
create trigger z_sync_booking_customer_profile
before insert or update of customer_id, quote_id, customer_email, customer_phone, service_address, status, is_test
on public.bookings
for each row execute function private.sync_booking_customer();

drop trigger if exists z_sync_lead_customer_profile on public.leads;
create trigger z_sync_lead_customer_profile
before insert or update of name, email, phone, property_address, lead_source, service_requested, is_test
on public.leads
for each row execute function private.sync_lead_customer_profile();

drop trigger if exists z_sync_virtual_estimate_customer_profile on public.virtual_estimate_sessions;
create trigger z_sync_virtual_estimate_customer_profile
before insert or update of customer_name, customer_email, customer_phone, address, participant_source, is_test
on public.virtual_estimate_sessions
for each row execute function private.sync_virtual_estimate_customer_profile();

drop trigger if exists z_customer_lead_activity on public.leads;
create trigger z_customer_lead_activity
after insert or update of customer_id, status
on public.leads
for each row execute function private.log_customer_activity();

drop trigger if exists z_customer_virtual_estimate_activity on public.virtual_estimate_sessions;
create trigger z_customer_virtual_estimate_activity
after insert or update of customer_id, status
on public.virtual_estimate_sessions
for each row execute function private.log_customer_activity();

update public.leads l
set customer_id = private.resolve_customer_profile(
  l.name,
  l.email,
  l.phone,
  l.property_address,
  l.lead_source,
  case when l.service_requested is null then '[]'::jsonb else jsonb_build_array(l.service_requested) end,
  'lead',
  true
)
where l.customer_id is null
  and not coalesce(l.is_test,false)
  and (
    private.normalize_customer_email(l.email) is not null
    or private.normalize_customer_phone(l.phone) is not null
    or (private.normalize_customer_name(l.name) is not null and private.normalize_customer_address(l.property_address) is not null)
  );

update public.virtual_estimate_sessions v
set customer_id = private.resolve_customer_profile(
  v.customer_name,
  v.customer_email,
  v.customer_phone,
  v.address,
  coalesce(nullif(v.participant_source,''),'virtual_estimate'),
  '[]'::jsonb,
  'lead',
  true
)
where v.customer_id is null
  and not coalesce(v.is_test,false)
  and (
    private.normalize_customer_email(v.customer_email) is not null
    or private.normalize_customer_phone(v.customer_phone) is not null
    or (private.normalize_customer_name(v.customer_name) is not null and private.normalize_customer_address(v.address) is not null)
  );

update public.quotes q
set customer_id = private.resolve_customer_profile(
  q.customer_name,
  q.customer_email,
  q.customer_phone,
  q.property_address,
  coalesce(q.source,q.channel),
  q.services,
  'lead',
  true
)
where q.customer_id is null
  and not coalesce(q.is_test,false)
  and lower(coalesce(q.source_details->>'is_internal','false')) <> 'true'
  and lower(coalesce(q.source_details->>'is_test','false')) <> 'true'
  and (
    private.normalize_customer_email(q.customer_email) is not null
    or private.normalize_customer_phone(q.customer_phone) is not null
    or (private.normalize_customer_name(q.customer_name) is not null and private.normalize_customer_address(q.property_address) is not null)
  );