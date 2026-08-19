create or replace function public.ensure_storefront_marketing_referral_code()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.sms_marketing_consent = true and new.marketing_referral_code is null then
    new.marketing_referral_code := 'BC' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_storefront_marketing_referral_code on public.storefront_call_leads;
create trigger trg_storefront_marketing_referral_code
before insert or update of sms_marketing_consent, marketing_referral_code
on public.storefront_call_leads
for each row
execute function public.ensure_storefront_marketing_referral_code();

update public.storefront_call_leads
set marketing_referral_code = 'BC' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))
where sms_marketing_consent = true
  and marketing_referral_code is null;
