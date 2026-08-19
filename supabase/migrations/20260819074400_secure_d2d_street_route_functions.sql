-- Keep trigger-only D2D route helpers out of the exposed RPC surface and pin
-- immutable parser functions to a fixed search path.

alter function public.d2d_extract_street(text)
  set search_path = pg_catalog, public;

alter function public.d2d_extract_city(text)
  set search_path = pg_catalog, public;

revoke execute on function public.d2d_refresh_auto_street_route(text, text)
  from public, anon, authenticated;

revoke execute on function public.d2d_sync_auto_street_routes()
  from public, anon, authenticated;
