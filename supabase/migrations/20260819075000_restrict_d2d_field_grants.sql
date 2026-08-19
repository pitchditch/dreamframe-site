revoke all on table public.d2d_field_pins from anon;
revoke all on table public.d2d_crawl_sessions from anon;
revoke truncate, references, trigger on table public.d2d_field_pins from authenticated;
revoke truncate, references, trigger on table public.d2d_crawl_sessions from authenticated;
grant select, insert, update, delete on table public.d2d_field_pins to authenticated;
grant select, insert, update, delete on table public.d2d_crawl_sessions to authenticated;
