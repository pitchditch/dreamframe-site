-- These SECURITY DEFINER helpers are trigger/internal-only. They must not be
-- callable through PostgREST by anonymous or signed-in clients.

revoke all on function public.sync_d2d_field_pin_to_property() from public;
revoke all on function public.sync_d2d_field_pin_to_property() from anon;
revoke all on function public.sync_d2d_field_pin_to_property() from authenticated;

revoke all on function public.refresh_d2d_field_street_route(uuid, text, text) from public;
revoke all on function public.refresh_d2d_field_street_route(uuid, text, text) from anon;
revoke all on function public.refresh_d2d_field_street_route(uuid, text, text) from authenticated;

revoke all on function public.sync_d2d_field_auto_street_routes() from public;
revoke all on function public.sync_d2d_field_auto_street_routes() from anon;
revoke all on function public.sync_d2d_field_auto_street_routes() from authenticated;
