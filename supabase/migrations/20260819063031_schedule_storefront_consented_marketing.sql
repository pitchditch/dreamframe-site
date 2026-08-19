do $$
declare
  existing_job bigint;
begin
  select jobid into existing_job
  from cron.job
  where jobname = 'storefront-consented-marketing-hourly'
  limit 1;

  if existing_job is not null then
    perform cron.unschedule(existing_job);
  end if;
end $$;

select cron.schedule(
  'storefront-consented-marketing-hourly',
  '0 * * * *',
  $cron$
    select net.http_post(
      url := 'https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/auto-call-manager',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-system-health-token', (
          select decrypted_secret
          from vault.decrypted_secrets
          where name = 'system_health_alert_token'
          limit 1
        )
      ),
      body := jsonb_build_object('action', 'run_consented_marketing', 'source', 'cron')
    );
  $cron$
);
