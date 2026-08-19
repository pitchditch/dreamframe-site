-- Analytics command-center accuracy fixes.
-- Keep command-center traffic on native/non-legacy events, correct D2D conversion math,
-- and persist quote/session attribution already captured in quote source_details.

create or replace view public.analytics_native_events
with (security_invoker = true)
as
select e.*
from public.analytics_events e
where coalesce(e.is_internal, false) = false
  and coalesce(e.is_bot, false) = false
  and coalesce(e.is_test, false) = false
  and lower(coalesce(e.metadata ->> 'legacy_backfill', 'false')) <> 'true';

revoke all on public.analytics_native_events from anon;
grant select on public.analytics_native_events to authenticated;

create or replace view public.analytics_native_sessions
with (security_invoker = true)
as
select s.*
from public.analytics_sessions s
where coalesce(s.is_internal, false) = false
  and coalesce(s.is_bot, false) = false
  and exists (
    select 1
    from public.analytics_events e
    where e.session_id = s.session_id
      and coalesce(e.is_internal, false) = false
      and coalesce(e.is_bot, false) = false
      and coalesce(e.is_test, false) = false
      and lower(coalesce(e.metadata ->> 'legacy_backfill', 'false')) <> 'true'
  );

revoke all on public.analytics_native_sessions from anon;
grant select on public.analytics_native_sessions to authenticated;

create or replace view public.d2d_daily_rep_stats
with (security_invoker = true)
as
select
  employee_id,
  (marked_at at time zone 'America/Vancouver')::date as stat_date,
  count(*) filter (
    where status = any (array[
      'hit'::text,
      'interested'::text,
      'not_interested'::text,
      'flyer_dropped'::text,
      'return_later'::text,
      'follow_up_needed'::text,
      'quote_sent'::text,
      'booked'::text
    ])
  ) as doors_logged,
  count(*) filter (where status = 'interested'::text) as interested_count,
  count(*) filter (where status = 'quote_sent'::text) as quotes_sent,
  count(*) filter (where status = 'booked'::text) as booked_count,
  count(*) filter (where status = any (array['return_later'::text, 'follow_up_needed'::text])) as callbacks_pending,
  coalesce(
    sum(estimated_value) filter (where status = any (array['interested'::text, 'quote_sent'::text, 'booked'::text])),
    0::numeric
  ) as pipeline_value,
  min(marked_at) filter (
    where status = any (array[
      'hit'::text,
      'interested'::text,
      'not_interested'::text,
      'flyer_dropped'::text,
      'return_later'::text,
      'follow_up_needed'::text,
      'quote_sent'::text,
      'booked'::text
    ])
  ) as first_log_at,
  max(marked_at) filter (
    where status = any (array[
      'hit'::text,
      'interested'::text,
      'not_interested'::text,
      'flyer_dropped'::text,
      'return_later'::text,
      'follow_up_needed'::text,
      'quote_sent'::text,
      'booked'::text
    ])
  ) as last_log_at
from public.nearby_houses
where deleted_at is null
  and marked_at is not null
  and employee_id is not null
  and employee_id <> 'website'::text
group by employee_id, (marked_at at time zone 'America/Vancouver')::date;

revoke all on public.d2d_daily_rep_stats from anon;
grant select on public.d2d_daily_rep_stats to authenticated;

create or replace view public.d2d_street_conversion_stats
with (security_invoker = true)
as
select
  coalesce(nullif(street_segment, ''::text), nullif(split_part(address, ','::text, 1), ''::text), 'Unknown'::text) as street_name,
  extract(hour from (marked_at at time zone 'America/Vancouver'))::integer as hour_of_day,
  count(*) filter (
    where status = any (array[
      'hit'::text,
      'interested'::text,
      'not_interested'::text,
      'flyer_dropped'::text,
      'return_later'::text,
      'follow_up_needed'::text,
      'quote_sent'::text,
      'booked'::text
    ])
  ) as knocks,
  count(*) filter (where status = any (array['interested'::text, 'quote_sent'::text, 'booked'::text])) as conversions,
  case
    when count(*) filter (
      where status = any (array[
        'hit'::text,
        'interested'::text,
        'not_interested'::text,
        'flyer_dropped'::text,
        'return_later'::text,
        'follow_up_needed'::text,
        'quote_sent'::text,
        'booked'::text
      ])
    ) > 0
    then round(
      count(*) filter (where status = any (array['interested'::text, 'quote_sent'::text, 'booked'::text]))::numeric
      / nullif(count(*) filter (
        where status = any (array[
          'hit'::text,
          'interested'::text,
          'not_interested'::text,
          'flyer_dropped'::text,
          'return_later'::text,
          'follow_up_needed'::text,
          'quote_sent'::text,
          'booked'::text
        ])
      ), 0)::numeric * 100::numeric,
      1
    )
    else 0::numeric
  end as conversion_pct
from public.nearby_houses
where deleted_at is null
  and marked_at is not null
  and marked_at > now() - interval '90 days'
group by
  coalesce(nullif(street_segment, ''::text), nullif(split_part(address, ','::text, 1), ''::text), 'Unknown'::text),
  extract(hour from (marked_at at time zone 'America/Vancouver'))::integer;

revoke all on public.d2d_street_conversion_stats from anon;
grant select on public.d2d_street_conversion_stats to authenticated;

create or replace function public.sync_quote_analytics_link()
returns trigger
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $$
declare
  v_details jsonb := coalesce(new.source_details, '{}'::jsonb);
  v_session_id text;
  v_mode text;
  v_session public.analytics_sessions%rowtype;
begin
  v_session_id := nullif(trim(coalesce(v_details ->> 'session_id', v_details ->> 'analytics_session_id', '')), '');
  v_mode := lower(trim(coalesce(v_details ->> 'analytics_mode', v_details ->> 'tracking_mode', '')));

  if v_session_id is null
     or v_mode = 'blocked'
     or coalesce(new.is_test, false)
     or lower(coalesce(v_details ->> 'is_internal', 'false')) = 'true'
     or lower(coalesce(v_details ->> 'is_test', 'false')) = 'true' then
    return new;
  end if;

  select s.* into v_session
  from public.analytics_sessions s
  where s.session_id = v_session_id
    and coalesce(s.is_internal, false) = false
    and coalesce(s.is_bot, false) = false
  limit 1;

  if not found then
    return new;
  end if;

  if not exists (
    select 1
    from public.analytics_events e
    where e.quote_id = new.id
      and e.session_id = v_session_id
      and coalesce(e.is_test, false) = false
  ) then
    insert into public.analytics_events (
      occurred_at,
      visitor_id,
      session_id,
      customer_id,
      quote_id,
      event_type,
      event_name,
      event_label,
      page_path,
      referrer,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      device_category,
      city,
      tracking_mode,
      is_internal,
      is_bot,
      is_test,
      metadata
    ) values (
      coalesce(new.created_at, now()),
      coalesce(nullif(v_details ->> 'visitor_id', ''), v_session.visitor_id),
      v_session_id,
      new.customer_id,
      new.id,
      'conversion',
      'quote_attribution_link',
      coalesce(new.status, 'quote'),
      coalesce(nullif(v_details ->> 'page_path', ''), nullif(v_details ->> 'landing_page', ''), v_session.landing_page, '/quote-results'),
      v_session.referrer,
      coalesce(nullif(v_details ->> 'source', ''), new.source, v_session.utm_source, 'website'),
      coalesce(nullif(v_details ->> 'utm_source', ''), v_session.utm_source),
      coalesce(nullif(v_details ->> 'utm_medium', ''), v_session.utm_medium),
      coalesce(nullif(v_details ->> 'utm_campaign', ''), v_session.utm_campaign),
      coalesce(nullif(v_details ->> 'utm_term', ''), v_session.utm_term),
      coalesce(nullif(v_details ->> 'utm_content', ''), v_session.utm_content),
      v_session.device_category,
      coalesce(nullif(v_details ->> 'city', ''), v_session.detected_city),
      coalesce(v_session.tracking_mode, 'consented'),
      false,
      false,
      false,
      jsonb_build_object(
        'synthetic_link', true,
        'link_source', 'quote_source_details',
        'legacy_backfill', false,
        'quote_status', new.status
      )
    );
  end if;

  return new;
end;
$$;

revoke all on function public.sync_quote_analytics_link() from public;
revoke all on function public.sync_quote_analytics_link() from anon;
revoke all on function public.sync_quote_analytics_link() from authenticated;

drop trigger if exists trg_sync_quote_analytics_link on public.quotes;
create trigger trg_sync_quote_analytics_link
after insert or update of source_details, customer_id, status
on public.quotes
for each row
execute function public.sync_quote_analytics_link();

insert into public.analytics_events (
  occurred_at,
  visitor_id,
  session_id,
  customer_id,
  quote_id,
  event_type,
  event_name,
  event_label,
  page_path,
  referrer,
  source,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_term,
  utm_content,
  device_category,
  city,
  tracking_mode,
  is_internal,
  is_bot,
  is_test,
  metadata
)
select
  q.created_at,
  coalesce(nullif(q.source_details ->> 'visitor_id', ''), s.visitor_id),
  s.session_id,
  q.customer_id,
  q.id,
  'conversion',
  'quote_attribution_link',
  coalesce(q.status, 'quote'),
  coalesce(nullif(q.source_details ->> 'page_path', ''), nullif(q.source_details ->> 'landing_page', ''), s.landing_page, '/quote-results'),
  s.referrer,
  coalesce(nullif(q.source_details ->> 'source', ''), q.source, s.utm_source, 'website'),
  coalesce(nullif(q.source_details ->> 'utm_source', ''), s.utm_source),
  coalesce(nullif(q.source_details ->> 'utm_medium', ''), s.utm_medium),
  coalesce(nullif(q.source_details ->> 'utm_campaign', ''), s.utm_campaign),
  coalesce(nullif(q.source_details ->> 'utm_term', ''), s.utm_term),
  coalesce(nullif(q.source_details ->> 'utm_content', ''), s.utm_content),
  s.device_category,
  coalesce(nullif(q.source_details ->> 'city', ''), s.detected_city),
  coalesce(s.tracking_mode, 'consented'),
  false,
  false,
  false,
  jsonb_build_object(
    'synthetic_link', true,
    'link_source', 'quote_source_details_backfill',
    'legacy_backfill', false,
    'quote_status', q.status
  )
from public.quotes q
join public.analytics_sessions s
  on s.session_id = nullif(trim(coalesce(q.source_details ->> 'session_id', q.source_details ->> 'analytics_session_id', '')), '')
where coalesce(q.is_test, false) = false
  and coalesce(s.is_internal, false) = false
  and coalesce(s.is_bot, false) = false
  and lower(coalesce(q.source_details ->> 'analytics_mode', q.source_details ->> 'tracking_mode', '')) <> 'blocked'
  and lower(coalesce(q.source_details ->> 'is_internal', 'false')) <> 'true'
  and lower(coalesce(q.source_details ->> 'is_test', 'false')) <> 'true'
  and not exists (
    select 1
    from public.analytics_events e
    where e.quote_id = q.id
      and e.session_id = s.session_id
      and coalesce(e.is_test, false) = false
  );
