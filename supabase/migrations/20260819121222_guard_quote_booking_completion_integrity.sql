-- Prevent orphaned booking completion timestamps from making draft quotes look customer-facing.
create or replace function public.guard_quote_booking_completion_integrity()
returns trigger
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $$
begin
  if new.booking_completed_at is not null
     and lower(coalesce(new.status, '')) in ('draft', 'new', 'saved', 'unfinished') then
    if exists (
      select 1
      from public.bookings b
      where b.quote_id = new.id
        and lower(coalesce(b.status, '')) <> 'cancelled'
    ) then
      new.status := 'booked';
    else
      new.booking_completed_at := null;
    end if;
  end if;
  return new;
end;
$$;

revoke all on function public.guard_quote_booking_completion_integrity() from public;
revoke all on function public.guard_quote_booking_completion_integrity() from anon;
revoke all on function public.guard_quote_booking_completion_integrity() from authenticated;

drop trigger if exists trg_guard_quote_booking_completion_integrity on public.quotes;
create trigger trg_guard_quote_booking_completion_integrity
before insert or update of booking_completed_at, status
on public.quotes
for each row
execute function public.guard_quote_booking_completion_integrity();

update public.quotes q
set booking_completed_at = null
where lower(coalesce(q.status, '')) in ('draft', 'new', 'saved', 'unfinished')
  and q.booking_completed_at is not null
  and not exists (
    select 1
    from public.bookings b
    where b.quote_id = q.id
      and lower(coalesce(b.status, '')) <> 'cancelled'
  );
