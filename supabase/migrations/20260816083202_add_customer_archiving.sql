alter table public.customers
  add column if not exists archived_at timestamptz;

create index if not exists customers_archived_at_idx
  on public.customers (archived_at);
