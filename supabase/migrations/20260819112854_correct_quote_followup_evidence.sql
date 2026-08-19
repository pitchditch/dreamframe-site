-- Follow-up evidence correction after lifecycle hardening.

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
  normalized_email text;
begin
  select * into s from public.sales_follow_up_settings where id = 1;
  display_name := coalesce(nullif(new.customer_name,''), nullif(new.business_name,''), 'Quote lead');
  normalized_phone := right(regexp_replace(coalesce(new.customer_phone,''), '\D', '', 'g'), 10);
  normalized_email := lower(nullif(btrim(coalesce(new.customer_email,'')),''));

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

  if normalized_email is null and nullif(normalized_phone,'') is null then
    perform public.resolve_sales_follow_up_task('quote', new.id, 'cancelled');
    return new;
  end if;

  if not coalesce(s.enabled, true) then return new; end if;

  is_viewed := coalesce(new.opened, false)
    or new.viewed_at is not null or new.opened_at is not null or new.last_opened_at is not null;
  is_sent := new.sent_to_customer_at is not null
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

create or replace function private.sync_quote_view_state()
returns trigger
language plpgsql
security invoker
set search_path to 'pg_catalog','public'
as $$
declare
  v_sent boolean;
begin
  v_sent := new.sent_to_customer_at is not null
    or new.last_email_sent_at is not null
    or lower(coalesce(new.email_delivery_status,'')) in ('sent','accepted','delivered','success')
    or lower(coalesce(new.status,'')) in ('sent','viewed','revised','approved');

  if v_sent
     and (coalesce(new.opened,false) or new.viewed_at is not null or new.opened_at is not null or new.last_opened_at is not null)
     and lower(coalesce(new.status,'')) in ('sent','revised') then
    new.status := 'viewed';
  end if;
  return new;
end;
$$;

drop trigger if exists c_sync_quote_view_state on public.quotes;
create trigger c_sync_quote_view_state
before update of opened,opened_at,viewed_at,last_opened_at,email_delivery_status,sent_to_customer_at,last_email_sent_at
on public.quotes
for each row execute function private.sync_quote_view_state();

update public.quotes
set opened=false,
    opened_at=null,
    source_details=coalesce(source_details,'{}'::jsonb) || jsonb_build_object('legacy_open_flag_without_timestamp',true)
where opened_at='2026-08-19 11:26:19.399205+00'::timestamptz
  and viewed_at is null
  and last_opened_at is null
  and sent_to_customer_at is null
  and last_email_sent_at is null;

delete from public.quote_activity_log
where event_type='customer_viewed'
  and created_at='2026-08-19 11:26:19.399205+00'::timestamptz;

update public.sales_follow_up_tasks t
set status='cancelled', completed_at=now(), last_action='system_cleanup',
    action_note='No verified quote-delivery evidence for this automatic follow-up.', updated_at=now()
from public.quotes q
where t.source_type='quote'
  and t.source_id=q.id
  and t.status='open'
  and t.automatic=true
  and t.rule_key in ('sent_not_viewed','viewed_not_booked')
  and not (
    q.sent_to_customer_at is not null
    or q.last_email_sent_at is not null
    or lower(coalesce(q.email_delivery_status,'')) in ('sent','accepted','delivered','success')
    or lower(coalesce(q.status,'')) in ('sent','viewed','revised','approved')
  );

update public.sales_follow_up_tasks t
set status='cancelled', completed_at=now(), last_action='system_cleanup',
    action_note='No customer contact method is available for this automatic follow-up.', updated_at=now()
from public.quotes q
where t.source_type='quote'
  and t.source_id=q.id
  and t.status='open'
  and t.automatic=true
  and nullif(btrim(coalesce(q.customer_email,'')),'') is null
  and nullif(regexp_replace(coalesce(q.customer_phone,''),'\D','','g'),'') is null;

update public.quotes q
set status='viewed'
where q.status in ('sent','revised')
  and (coalesce(q.opened,false) or q.viewed_at is not null or q.opened_at is not null or q.last_opened_at is not null)
  and (
    q.sent_to_customer_at is not null
    or q.last_email_sent_at is not null
    or lower(coalesce(q.email_delivery_status,'')) in ('sent','accepted','delivered','success')
  );

create or replace function public.admin_recalculate_follow_up_tasks()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  s public.sales_follow_up_settings%rowtype;
  affected integer := 0;
  n integer := 0;
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Admin access required';
  end if;

  select * into s from public.sales_follow_up_settings where id = 1;

  update public.sales_follow_up_tasks t
  set due_at = coalesce(q.sent_to_customer_at,q.last_email_sent_at,q.updated_at,q.created_at) + make_interval(hours => s.quote_unopened_hours),
      updated_at = now()
  from public.quotes q
  where t.source_type = 'quote' and t.source_id = q.id and t.status = 'open' and t.automatic = true and t.rule_key = 'sent_not_viewed';
  get diagnostics n = row_count; affected := affected + n;

  update public.sales_follow_up_tasks t
  set due_at = coalesce(q.last_opened_at,q.viewed_at,q.opened_at,q.updated_at,q.created_at) + make_interval(hours => s.quote_viewed_hours),
      updated_at = now()
  from public.quotes q
  where t.source_type = 'quote' and t.source_id = q.id and t.status = 'open' and t.automatic = true and t.rule_key = 'viewed_not_booked';
  get diagnostics n = row_count; affected := affected + n;

  update public.sales_follow_up_tasks t
  set due_at = coalesce(q.approved_at,q.updated_at,q.created_at) + make_interval(hours => s.quote_approved_hours),
      updated_at = now()
  from public.quotes q
  where t.source_type = 'quote' and t.source_id = q.id and t.status = 'open' and t.automatic = true and t.rule_key = 'approved_needs_booking';
  get diagnostics n = row_count; affected := affected + n;

  update public.sales_follow_up_tasks t
  set due_at = coalesce(h.last_status_at,h.marked_at,h.created_at) + make_interval(days => s.d2d_no_answer_days),
      updated_at = now()
  from public.nearby_houses h
  where t.source_type = 'd2d' and t.source_id = h.id and t.status = 'open' and t.automatic = true and t.rule_key = 'no_answer_revisit';
  get diagnostics n = row_count; affected := affected + n;

  update public.sales_follow_up_tasks t
  set due_at = coalesce(h.last_status_at,h.marked_at,h.created_at) + make_interval(days => s.d2d_follow_up_days),
      updated_at = now()
  from public.nearby_houses h
  where t.source_type = 'd2d' and t.source_id = h.id and t.status = 'open' and t.automatic = true and t.rule_key = 'd2d_follow_up';
  get diagnostics n = row_count; affected := affected + n;

  update public.sales_follow_up_tasks t
  set due_at = coalesce(l.last_called_at,l.updated_at,l.created_at) + make_interval(hours => s.ai_callback_fallback_hours),
      updated_at = now()
  from public.storefront_call_leads l
  where t.source_type = 'ai_call' and t.source_id = l.id and t.status = 'open' and t.automatic = true and t.rule_key = 'callback_fallback';
  get diagnostics n = row_count; affected := affected + n;

  return affected;
end;
$$;

revoke execute on function public.sync_quote_sales_follow_up() from public,anon,authenticated;
revoke execute on function public.admin_recalculate_follow_up_tasks() from public,anon,authenticated;
grant execute on function public.admin_recalculate_follow_up_tasks() to authenticated;
