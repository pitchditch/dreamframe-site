insert into public.admin_users (id, email, role, created_at, updated_at)
values (gen_random_uuid(), 'bcpressurewashing.ca@gmail.com', 'admin', now(), now())
on conflict (email) do update
set role = excluded.role,
    updated_at = now();
