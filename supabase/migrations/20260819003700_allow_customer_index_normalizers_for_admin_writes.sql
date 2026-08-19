-- The customers table has expression indexes that call these private
-- immutable normalizers. Authenticated admin updates (including archiving a
-- client) must be allowed to execute them so PostgreSQL can maintain the
-- indexes during the write.

grant execute on function private.normalize_customer_email(text) to authenticated, service_role;
grant execute on function private.normalize_customer_phone(text) to authenticated, service_role;
grant execute on function private.normalize_customer_name(text) to authenticated, service_role;
