-- Add an opt-in AI assistant to browser-based virtual estimates.
-- Raw audio is never stored; only transcript text and structured estimate details are persisted.

alter table public.virtual_estimate_sessions
  add column if not exists ai_assistant_enabled boolean not null default false,
  add column if not exists ai_consent_at timestamptz,
  add column if not exists ai_summary jsonb not null default '{}'::jsonb,
  add column if not exists ai_last_updated_at timestamptz;

create table if not exists public.virtual_estimate_transcripts (
  id uuid primary key default gen_random_uuid(),
  virtual_estimate_session_id uuid not null references public.virtual_estimate_sessions(id) on delete cascade,
  sequence_number integer not null check (sequence_number > 0),
  speaker text not null default 'customer' check (speaker in ('customer', 'agent', 'unknown')),
  source_language text,
  original_text text not null,
  translated_text text not null,
  services jsonb not null default '[]'::jsonb,
  pricing_inputs jsonb not null default '{}'::jsonb,
  keywords jsonb not null default '[]'::jsonb,
  missing_questions jsonb not null default '[]'::jsonb,
  summary text,
  confidence numeric check (confidence is null or (confidence >= 0 and confidence <= 1)),
  created_at timestamptz not null default now(),
  unique (virtual_estimate_session_id, sequence_number)
);

create index if not exists virtual_estimate_transcripts_session_created_idx
  on public.virtual_estimate_transcripts (virtual_estimate_session_id, created_at desc);

alter table public.virtual_estimate_transcripts enable row level security;

comment on table public.virtual_estimate_transcripts is
  'AI transcript chunks and structured estimate details for customer-consented browser virtual estimates. Raw audio is not stored.';
comment on column public.virtual_estimate_sessions.ai_consent_at is
  'When the invited customer explicitly enabled microphone transcription for the AI estimate assistant.';
comment on column public.virtual_estimate_sessions.ai_summary is
  'Rolling structured summary of AI-detected services, pricing inputs, keywords and missing estimate questions.';
