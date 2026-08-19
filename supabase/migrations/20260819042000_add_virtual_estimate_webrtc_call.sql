alter table public.virtual_estimate_sessions
  add column if not exists call_state text not null default 'idle',
  add column if not exists call_started_at timestamptz,
  add column if not exists call_ended_at timestamptz,
  add column if not exists host_last_seen timestamptz,
  add column if not exists customer_call_ready boolean not null default false,
  add column if not exists host_call_ready boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.virtual_estimate_sessions'::regclass
      and conname = 'virtual_estimate_sessions_call_state_check'
  ) then
    alter table public.virtual_estimate_sessions
      add constraint virtual_estimate_sessions_call_state_check
      check (call_state in ('idle','waiting','connecting','connected','ended','failed'));
  end if;
end $$;

create table if not exists public.virtual_estimate_call_signals (
  id bigint generated always as identity primary key,
  session_id text not null references public.virtual_estimate_sessions(session_id) on delete cascade,
  sender text not null check (sender in ('customer','host')),
  kind text not null check (kind in ('offer','answer','ice','hangup')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists virtual_estimate_call_signals_session_id_id_idx
  on public.virtual_estimate_call_signals(session_id, id);

alter table public.virtual_estimate_call_signals enable row level security;

revoke all on public.virtual_estimate_call_signals from anon, authenticated;

alter table public.virtual_estimate_transcripts
  drop constraint if exists virtual_estimate_transcripts_virtual_estimate_session_id_se_key;

alter table public.virtual_estimate_transcripts
  drop constraint if exists virtual_estimate_transcripts_session_speaker_sequence_key;

alter table public.virtual_estimate_transcripts
  add constraint virtual_estimate_transcripts_session_speaker_sequence_key
  unique (virtual_estimate_session_id, speaker, sequence_number);