create or replace function public.get_virtual_estimate_session(p_session_id text)
returns jsonb
language plpgsql
stable
security definer
set search_path to ''
as $function$
declare
  v_result jsonb;
begin
  if p_session_id is null
     or p_session_id !~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' then
    raise exception 'INVALID_SESSION';
  end if;

  select jsonb_build_object(
    'session_id', s.session_id,
    'status', s.status,
    'current_lat', s.current_lat,
    'current_lng', s.current_lng,
    'current_heading', s.current_heading,
    'current_pitch', s.current_pitch,
    'current_zoom', s.current_zoom,
    'address', s.address,
    'host_available', s.host_available,
    'invite_status', s.invite_status,
    'direct_join_allowed', s.direct_join_allowed,
    'waiting_for_host', s.waiting_for_host,
    'host_present', s.host_present,
    'location_requested', s.location_requested,
    'updated_at', s.updated_at
  )
  into v_result
  from public.virtual_estimate_sessions s
  where s.session_id = p_session_id
    and s.status in ('active', 'invited', 'agent_joined')
    and (s.status = 'active' or s.direct_join_allowed is true)
    and (s.invite_expires_at is null or s.invite_expires_at > now());

  if v_result is null then
    raise exception 'SESSION_NOT_FOUND';
  end if;
  return v_result;
end;
$function$;

create or replace function public.update_virtual_estimate_session(p_session_id text, p_patch jsonb)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_result jsonb;
begin
  if p_session_id is null
     or p_session_id !~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' then
    raise exception 'INVALID_SESSION';
  end if;
  if p_patch is null or jsonb_typeof(p_patch) <> 'object' or pg_column_size(p_patch) > 4096 then
    raise exception 'INVALID_PATCH';
  end if;
  if exists (
    select 1 from jsonb_object_keys(p_patch) k
    where k not in (
      'current_lat', 'current_lng', 'current_heading', 'current_pitch',
      'current_zoom', 'customer_lat', 'customer_lng', 'waiting_for_host',
      'invite_status', 'participant_source'
    )
  ) then
    raise exception 'UNSUPPORTED_FIELD';
  end if;

  if p_patch ? 'current_lat' and ((p_patch->>'current_lat')::numeric not between -90 and 90) then raise exception 'INVALID_LATITUDE'; end if;
  if p_patch ? 'current_lng' and ((p_patch->>'current_lng')::numeric not between -180 and 180) then raise exception 'INVALID_LONGITUDE'; end if;
  if p_patch ? 'customer_lat' and ((p_patch->>'customer_lat')::double precision not between -90 and 90) then raise exception 'INVALID_LATITUDE'; end if;
  if p_patch ? 'customer_lng' and ((p_patch->>'customer_lng')::double precision not between -180 and 180) then raise exception 'INVALID_LONGITUDE'; end if;
  if p_patch ? 'current_heading' and ((p_patch->>'current_heading')::numeric not between -360 and 360) then raise exception 'INVALID_HEADING'; end if;
  if p_patch ? 'current_pitch' and ((p_patch->>'current_pitch')::numeric not between -90 and 90) then raise exception 'INVALID_PITCH'; end if;
  if p_patch ? 'current_zoom' and ((p_patch->>'current_zoom')::numeric not between 0 and 10) then raise exception 'INVALID_ZOOM'; end if;
  if p_patch ? 'waiting_for_host' and jsonb_typeof(p_patch->'waiting_for_host') <> 'boolean' then raise exception 'INVALID_WAITING_STATUS'; end if;
  if p_patch ? 'invite_status' and (p_patch->>'invite_status') not in ('pending','accepted') then raise exception 'INVALID_INVITE_STATUS'; end if;
  if p_patch ? 'participant_source' and length(p_patch->>'participant_source') > 100 then raise exception 'INVALID_PARTICIPANT_SOURCE'; end if;

  update public.virtual_estimate_sessions s
  set current_lat = case when p_patch ? 'current_lat' then (p_patch->>'current_lat')::numeric else s.current_lat end,
      current_lng = case when p_patch ? 'current_lng' then (p_patch->>'current_lng')::numeric else s.current_lng end,
      current_heading = case when p_patch ? 'current_heading' then (p_patch->>'current_heading')::numeric else s.current_heading end,
      current_pitch = case when p_patch ? 'current_pitch' then (p_patch->>'current_pitch')::numeric else s.current_pitch end,
      current_zoom = case when p_patch ? 'current_zoom' then (p_patch->>'current_zoom')::numeric else s.current_zoom end,
      customer_lat = case when p_patch ? 'customer_lat' then (p_patch->>'customer_lat')::double precision else s.customer_lat end,
      customer_lng = case when p_patch ? 'customer_lng' then (p_patch->>'customer_lng')::double precision else s.customer_lng end,
      waiting_for_host = case when p_patch ? 'waiting_for_host' then (p_patch->>'waiting_for_host')::boolean else s.waiting_for_host end,
      invite_status = case when p_patch ? 'invite_status' then p_patch->>'invite_status' else s.invite_status end,
      participant_source = case when p_patch ? 'participant_source' then nullif(trim(p_patch->>'participant_source'),'') else s.participant_source end,
      customer_last_seen = now(),
      updated_at = now()
  where s.session_id = p_session_id
    and s.status in ('active', 'invited', 'agent_joined')
    and (s.status = 'active' or s.direct_join_allowed is true)
    and (s.invite_expires_at is null or s.invite_expires_at > now())
  returning jsonb_build_object(
    'session_id', s.session_id,
    'status', s.status,
    'current_lat', s.current_lat,
    'current_lng', s.current_lng,
    'current_heading', s.current_heading,
    'current_pitch', s.current_pitch,
    'current_zoom', s.current_zoom,
    'host_available', s.host_available,
    'invite_status', s.invite_status,
    'waiting_for_host', s.waiting_for_host,
    'host_present', s.host_present,
    'location_requested', s.location_requested,
    'updated_at', s.updated_at
  ) into v_result;

  if v_result is null then
    raise exception 'SESSION_NOT_FOUND';
  end if;
  return v_result;
exception
  when invalid_text_representation then
    raise exception 'INVALID_PATCH';
end;
$function$;
