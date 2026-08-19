-- Harden quote/customer/plan management while preserving the current public quote RPC flow.

create or replace function private.is_placeholder_customer_name(p_name text)
returns boolean
language sql
immutable
security invoker
set search_path to 'pg_catalog'
as $$
  select p_name is null
    or char_length(btrim(p_name)) < 2
    or lower(btrim(p_name)) in (
      'website visitor','website customer','visitor','guest','anonymous','anonymous visitor',
      'commercial lead','lead','customer','client','quote lead'
    )
    or lower(btrim(p_name)) ~ '^client( [0-9]{4})?$';
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
    if private.normalize_customer_email(new.customer_email) is not null
       or private.normalize_customer_phone(new.customer_phone) is not null
       or (
         not private.is_placeholder_customer_name(new.customer_name)
         and private.normalize_customer_address(new.property_address) is not null
       ) then
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
    end if;
  else
    v_customer_id := new.customer_id;

    if not private.is_placeholder_customer_name(new.customer_name) then
      update public.customers c
      set name = btrim(new.customer_name),
          email = case
            when c.email is null and private.normalize_customer_email(new.customer_email) is not null
                 and not exists (
                   select 1 from public.customers x
                   where x.id <> c.id
                     and private.normalize_customer_email(x.email) = private.normalize_customer_email(new.customer_email)
                 ) then private.normalize_customer_email(new.customer_email)
            else c.email
          end,
          phone = case
            when c.phone is null and private.normalize_customer_phone(new.customer_phone) is not null
                 and not exists (
                   select 1 from public.customers x
                   where x.id <> c.id
                     and private.normalize_customer_phone(x.phone) = private.normalize_customer_phone(new.customer_phone)
                 ) then nullif(btrim(new.customer_phone),'')
            else c.phone
          end,
          address = coalesce(c.address, nullif(btrim(new.property_address),'')),
          last_activity_at = now(),
          updated_at = now()
      where c.id = v_customer_id
        and not coalesce(c.is_internal,false)
        and not coalesce(c.is_test,false);
    end if;
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

create or replace function private.normalize_quote_status()
returns trigger
language plpgsql
security invoker
set search_path to 'pg_catalog','public'
as $$
begin
  new.status := lower(btrim(coalesce(new.status,'draft')));
  new.status := case new.status
    when 'new' then 'draft'
    when 'pending' then 'draft'
    when 'rejected' then 'declined'
    when 'lost' then 'declined'
    when 'ignored' then 'declined'
    when 'canceled' then 'cancelled'
    when 'converted' then 'booked'
    when 'invoiced' then 'completed'
    when 'paid' then 'completed'
    else new.status
  end;

  if new.status = 'viewed' then
    new.opened := true;
    new.opened_at := coalesce(new.opened_at, new.viewed_at, now());
    new.viewed_at := coalesce(new.viewed_at, new.opened_at, now());
    new.last_opened_at := coalesce(new.last_opened_at, new.viewed_at, new.opened_at, now());
  elsif new.status = 'approved' then
    new.approved_at := coalesce(new.approved_at, now());
  elsif new.status = 'completed' then
    new.completed_at := coalesce(new.completed_at, now());
  elsif new.status = 'cancelled' then
    new.canceled_at := coalesce(new.canceled_at, now());
  elsif new.status = 'expired' then
    new.expired_at := coalesce(new.expired_at, now());
  end if;

  return new;
end;
$$;

drop trigger if exists b_normalize_quote_status on public.quotes;
create trigger b_normalize_quote_status
before insert or update of status
on public.quotes
for each row execute function private.normalize_quote_status();

update public.quotes q
set status = 'draft',
    booking_completed_at = null,
    completed_at = null,
    is_abandoned = case
      when coalesce(q.last_active_at,q.updated_at,q.created_at) < now() - interval '7 days' then true
      else coalesce(q.is_abandoned,false)
    end,
    abandoned_at = case
      when coalesce(q.last_active_at,q.updated_at,q.created_at) < now() - interval '7 days'
        then coalesce(q.abandoned_at,coalesce(q.last_active_at,q.updated_at,q.created_at))
      else q.abandoned_at
    end,
    source_details = coalesce(q.source_details,'{}'::jsonb) || jsonb_build_object(
      'lifecycle_repair','anonymous_status_without_booking',
      'lifecycle_repaired_at',now()
    )
where q.status in ('booked','completed')
  and coalesce(q.source,'') in ('website_quote_results','website')
  and private.is_placeholder_customer_name(q.customer_name)
  and private.normalize_customer_email(q.customer_email) is null
  and private.normalize_customer_phone(q.customer_phone) is null
  and not exists (
    select 1 from public.bookings b
    where b.quote_id=q.id and b.status <> 'cancelled'
  );

update public.quotes
set status = case lower(btrim(status))
  when 'new' then 'draft'
  when 'pending' then 'draft'
  when 'rejected' then 'declined'
  when 'lost' then 'declined'
  when 'ignored' then 'declined'
  when 'canceled' then 'cancelled'
  when 'converted' then 'booked'
  when 'invoiced' then 'completed'
  when 'paid' then 'completed'
  else lower(btrim(status))
end
where status is distinct from case lower(btrim(status))
  when 'new' then 'draft'
  when 'pending' then 'draft'
  when 'rejected' then 'declined'
  when 'lost' then 'declined'
  when 'ignored' then 'declined'
  when 'canceled' then 'cancelled'
  when 'converted' then 'booked'
  when 'invoiced' then 'completed'
  when 'paid' then 'completed'
  else lower(btrim(status))
end;

alter table public.quotes drop constraint if exists quotes_status_check;
alter table public.quotes
  add constraint quotes_status_check
  check (status in (
    'draft','unfinished','saved','sent','viewed','revised','approved','declined',
    'booked','completed','cancelled','expired','superseded'
  ));

update public.quotes q
set customer_id = private.resolve_customer_profile(
  q.customer_name,q.customer_email,q.customer_phone,q.property_address,
  coalesce(q.source,q.channel),q.services,'lead',true
)
where q.customer_id is null
  and not coalesce(q.is_test,false)
  and lower(coalesce(q.source_details->>'is_internal','false')) <> 'true'
  and lower(coalesce(q.source_details->>'is_test','false')) <> 'true'
  and (
    private.normalize_customer_email(q.customer_email) is not null
    or private.normalize_customer_phone(q.customer_phone) is not null
    or (
      not private.is_placeholder_customer_name(q.customer_name)
      and private.normalize_customer_address(q.property_address) is not null
    )
  );

create or replace function public.sync_quote_sales_follow_up()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  s public.sales_follow_up_settings%rowtype;
  base_at timestamptz;
  due_at timestamptz;
  is_viewed boolean;
  is_sent boolean;
  display_name text;
  normalized_phone text;
begin
  select * into s from public.sales_follow_up_settings where id = 1;
  display_name := coalesce(nullif(new.customer_name,''), nullif(new.business_name,''), 'Quote lead');
  normalized_phone := right(regexp_replace(coalesce(new.customer_phone,''), '\D', '', 'g'), 10);

  if coalesce(new.is_test, false)
    or lower(coalesce(new.customer_email,'')) in ('jaydenf3800@gmail.com','bcpressurewashing.ca@gmail.com')
    or normalized_phone in ('2368870916','7788087620') then
    perform public.resolve_sales_follow_up_task('quote', new.id, 'cancelled');
    return new;
  end if;

  if new.booking_completed_at is not null or lower(coalesce(new.status,'')) in ('booked','completed') then
    perform public.resolve_sales_follow_up_task('quote', new.id, 'booked');
    return new;
  end if;
  if lower(coalesce(new.status,'')) in ('cancelled','expired','declined') then
    perform public.resolve_sales_follow_up_task('quote', new.id, 'lost');
    return new;
  end if;
  if new.follow_up_at is not null then
    perform public.upsert_sales_follow_up_task(
      'quote', new.id, 'manual', new.follow_up_at, false,
      'Follow up with ' || display_name,
      coalesce(nullif(new.follow_up_period,''), 'Manual quote follow-up'),
      new.customer_name, new.customer_phone, new.customer_email, new.property_address,
      new.total_amount, new.id, new.customer_id, 1,
      jsonb_build_object('quote_status', new.status, 'follow_up_period', new.follow_up_period)
    );
    return new;
  end if;
  if not coalesce(s.enabled, true) then return new; end if;

  is_viewed := coalesce(new.opened, false)
    or new.viewed_at is not null or new.opened_at is not null or new.last_opened_at is not null;
  is_sent := is_viewed
    or new.sent_to_customer_at is not null
    or new.last_email_sent_at is not null
    or lower(coalesce(new.email_delivery_status,'')) in ('sent','accepted','delivered','success')
    or lower(coalesce(new.status,'')) in ('sent','viewed','revised','approved');

  if lower(coalesce(new.status,'')) = 'approved' then
    base_at := coalesce(new.approved_at, new.sent_to_customer_at, new.last_email_sent_at, new.updated_at, now());
    due_at := base_at + make_interval(hours => s.quote_approved_hours);
    perform public.upsert_sales_follow_up_task('quote', new.id, 'approved_needs_booking', due_at, true,
      'Book approved quote — ' || display_name, 'Customer approved the quote but has not booked yet.',
      new.customer_name, new.customer_phone, new.customer_email, new.property_address,
      new.total_amount, new.id, new.customer_id, 1, jsonb_build_object('quote_status', new.status));
    return new;
  end if;

  if is_sent and is_viewed then
    base_at := coalesce(new.last_opened_at, new.viewed_at, new.opened_at, new.sent_to_customer_at, new.last_email_sent_at, new.updated_at, now());
    due_at := base_at + make_interval(hours => s.quote_viewed_hours);
    perform public.upsert_sales_follow_up_task('quote', new.id, 'viewed_not_booked', due_at, true,
      'Follow up on viewed quote — ' || display_name, 'Quote was viewed but the customer has not booked.',
      new.customer_name, new.customer_phone, new.customer_email, new.property_address,
      new.total_amount, new.id, new.customer_id, 1,
      jsonb_build_object('quote_status', new.status, 'viewed_at', coalesce(new.last_opened_at, new.viewed_at, new.opened_at)));
    return new;
  end if;

  if is_sent and not is_viewed then
    base_at := coalesce(new.sent_to_customer_at, new.last_email_sent_at, new.updated_at, now());
    due_at := base_at + make_interval(hours => s.quote_unopened_hours);
    perform public.upsert_sales_follow_up_task('quote', new.id, 'sent_not_viewed', due_at, true,
      'Check unviewed quote — ' || display_name, 'Quote was sent but has not been viewed yet.',
      new.customer_name, new.customer_phone, new.customer_email, new.property_address,
      new.total_amount, new.id, new.customer_id, 2, jsonb_build_object('quote_status', new.status));
    return new;
  end if;

  perform public.resolve_sales_follow_up_task('quote', new.id, 'cancelled');
  return new;
end;
$$;

update public.sales_follow_up_tasks t
set status='cancelled', completed_at=now(), last_action='system_cleanup',
    action_note='Anonymous quote autosave had no customer identity or actual booking.', updated_at=now()
from public.quotes q
where t.source_type='quote'
  and t.source_id=q.id
  and t.status='open'
  and private.is_placeholder_customer_name(q.customer_name)
  and private.normalize_customer_email(q.customer_email) is null
  and private.normalize_customer_phone(q.customer_phone) is null
  and not exists (
    select 1 from public.bookings b where b.quote_id=q.id and b.status <> 'cancelled'
  );

update public.quotes
set opened_at = coalesce(opened_at, viewed_at, last_opened_at, updated_at)
where coalesce(opened,false) and opened_at is null;

update public.quotes
set opened = true,
    opened_at = coalesce(opened_at, viewed_at),
    last_opened_at = coalesce(last_opened_at, viewed_at)
where viewed_at is not null and not coalesce(opened,false);

update public.quote_reminders
set status='canceled',
    error_message=coalesce(error_message,'Canceled during management cleanup: internal/test recipient.'),
    updated_at=now()
where status='pending'
  and scheduled_at < now()
  and private.is_internal_customer_contact(
    case when channel='email' then recipient else null end,
    case when channel='sms' then recipient else null end
  );

create index if not exists admin_custom_subscriptions_customer_id_idx
  on public.admin_custom_subscriptions(customer_id);

create or replace function private.sync_admin_custom_subscription_customer()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_target_stage text;
  v_services jsonb;
begin
  if new.customer_id is not null then return new; end if;
  if private.is_internal_customer_request(new.customer_email,new.customer_phone,new.address) then return new; end if;

  if private.normalize_customer_email(new.customer_email) is null
     and private.normalize_customer_phone(new.customer_phone) is null
     and (
       private.is_placeholder_customer_name(new.customer_name)
       or private.normalize_customer_address(new.address) is null
     ) then
    return new;
  end if;

  v_target_stage := case when lower(coalesce(new.status,'')) in ('active','accepted') then 'client' else 'lead' end;
  v_services := to_jsonb(coalesce(new.service_types,'{}'::text[]));

  new.customer_id := private.resolve_customer_profile(
    new.customer_name,new.customer_email,new.customer_phone,new.address,
    'service_plan',v_services,v_target_stage,true
  );
  return new;
end;
$$;

drop trigger if exists z_sync_admin_custom_subscription_customer on public.admin_custom_subscriptions;
create trigger z_sync_admin_custom_subscription_customer
before insert or update of customer_name,customer_email,customer_phone,address,status,service_types
on public.admin_custom_subscriptions
for each row execute function private.sync_admin_custom_subscription_customer();

update public.admin_custom_subscriptions p
set customer_id = private.resolve_customer_profile(
  p.customer_name,p.customer_email,p.customer_phone,p.address,
  'service_plan',to_jsonb(coalesce(p.service_types,'{}'::text[])),
  case when lower(coalesce(p.status,'')) in ('active','accepted') then 'client' else 'lead' end,
  true
)
where p.customer_id is null
  and not private.is_internal_customer_request(p.customer_email,p.customer_phone,p.address)
  and (
    private.normalize_customer_email(p.customer_email) is not null
    or private.normalize_customer_phone(p.customer_phone) is not null
    or (
      not private.is_placeholder_customer_name(p.customer_name)
      and private.normalize_customer_address(p.address) is not null
    )
  );

update public.admin_custom_subscriptions
set status='draft', updated_at=now()
where lower(coalesce(status,'')) in ('sent','viewed')
  and nullif(btrim(coalesce(customer_email,'')),'') is null
  and nullif(btrim(coalesce(customer_phone,'')),'') is null
  and email_sent_at is null;

comment on table public.subscription_plans is 'Reusable maintenance-plan templates.';
comment on table public.admin_custom_subscriptions is 'Canonical admin-managed customer plan instances. Link to customers when identity is known.';
comment on table public.service_plans is 'Legacy account-centric plan table retained for compatibility; new admin customer plans use admin_custom_subscriptions.';

drop policy if exists "Allow public quote creation" on public.quotes;
drop policy if exists "Public can create safe quote leads" on public.quotes;
create policy "Public can create safe quote leads"
on public.quotes
for insert
to anon
with check (
  status in ('draft','unfinished','saved')
  and coalesce(is_test,false)=false
  and customer_id is null
  and approved_at is null
  and booking_completed_at is null
  and completed_at is null
  and converted_at is null
  and canceled_at is null
  and expired_at is null
  and stripe_subscription_id is null
  and lower(coalesce(source_details->>'is_internal','false')) <> 'true'
  and lower(coalesce(source_details->>'is_test','false')) <> 'true'
);

revoke execute on function public.resolve_sales_follow_up_task(text,uuid,text) from public,anon,authenticated;
revoke execute on function public.sync_quote_sales_follow_up() from public,anon,authenticated;
revoke execute on function public.upsert_sales_follow_up_task(text,uuid,text,timestamp with time zone,boolean,text,text,text,text,text,text,numeric,uuid,uuid,smallint,jsonb) from public,anon,authenticated;
revoke execute on function public.upsert_sales_follow_up_task(text,uuid,text,timestamp with time zone,boolean,text,text,text,text,text,text,numeric,uuid,uuid,integer,jsonb) from public,anon,authenticated;

revoke execute on function public.admin_follow_up_action(uuid,text,timestamp with time zone,text) from public,anon,authenticated;
grant execute on function public.admin_follow_up_action(uuid,text,timestamp with time zone,text) to authenticated;
revoke execute on function public.admin_recalculate_follow_up_tasks() from public,anon,authenticated;
grant execute on function public.admin_recalculate_follow_up_tasks() to authenticated;
revoke execute on function public.record_quote_admin_action(uuid,text,jsonb,boolean) from public,anon,authenticated;
grant execute on function public.record_quote_admin_action(uuid,text,jsonb,boolean) to authenticated;

revoke execute on function public.save_public_quote_progress(jsonb) from public,anon,authenticated;
grant execute on function public.save_public_quote_progress(jsonb) to anon,authenticated;
revoke execute on function public.create_public_booking(jsonb) from public,anon,authenticated;
grant execute on function public.create_public_booking(jsonb) to anon,authenticated;

create index if not exists quotes_status_created_at_idx on public.quotes(status,created_at desc);
create index if not exists quotes_customer_id_idx on public.quotes(customer_id) where customer_id is not null;
create index if not exists quote_reminders_pending_schedule_idx on public.quote_reminders(scheduled_at) where status='pending';
