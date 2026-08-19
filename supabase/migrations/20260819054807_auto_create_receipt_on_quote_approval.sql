alter table public.receipts
  add column if not exists quote_id uuid references public.quotes(id) on delete set null,
  add column if not exists property_address text;

create unique index if not exists receipts_quote_id_uidx
  on public.receipts(quote_id);

create or replace function private.sync_approved_quote_receipt()
returns trigger
language plpgsql
security definer
set search_path to 'pg_catalog','public','private'
as $$
declare
  v_customer_is_test boolean := false;
  v_receipt_number text;
  v_subtotal numeric;
  v_tax_amount numeric;
  v_items jsonb;
begin
  if lower(coalesce(new.status,'')) <> 'approved' then
    return new;
  end if;

  if coalesce(new.is_test,false)
     or lower(coalesce(new.source_details->>'is_internal','false')) = 'true'
     or lower(coalesce(new.source_details->>'is_test','false')) = 'true' then
    return new;
  end if;

  if new.customer_id is not null then
    select coalesce(c.is_internal,false) or coalesce(c.is_test,false)
      into v_customer_is_test
    from public.customers c
    where c.id = new.customer_id;

    if coalesce(v_customer_is_test,false) then
      return new;
    end if;
  end if;

  if exists (
    select 1
    from public.leads l
    where l.conversion_quote_id = new.id
      and coalesce(l.is_test,false)
  ) then
    return new;
  end if;

  v_tax_amount := coalesce(new.gst_amount,0) + coalesce(new.pst_amount,0);
  v_subtotal := greatest(coalesce(new.total_amount,0) - v_tax_amount, 0);
  v_items := jsonb_build_object(
    'quote_id', new.id,
    'services', coalesce(new.services,'[]'::jsonb),
    'add_ons', coalesce(new.add_ons,'[]'::jsonb),
    'products', coalesce(new.products,'[]'::jsonb),
    'services_subtotal', coalesce(new.services_subtotal,0),
    'products_subtotal', coalesce(new.products_subtotal,0),
    'travel_surcharge', coalesce(new.travel_surcharge,0),
    'discount_amount', coalesce(new.discount_amount,0),
    'gst_amount', coalesce(new.gst_amount,0),
    'pst_amount', coalesce(new.pst_amount,0),
    'total_amount', coalesce(new.total_amount,0)
  );

  perform pg_advisory_xact_lock(hashtextextended('quote-receipt:' || new.id::text, 0));

  if exists (select 1 from public.receipts r where r.quote_id = new.id) then
    update public.receipts r
    set customer_id = new.customer_id,
        customer_name = new.customer_name,
        customer_email = new.customer_email,
        customer_phone = new.customer_phone,
        property_address = new.property_address,
        subtotal = v_subtotal,
        tax_amount = v_tax_amount,
        total_amount = coalesce(new.total_amount,0),
        items = v_items,
        notes = new.notes,
        updated_at = now()
    where r.quote_id = new.id;
  else
    perform pg_advisory_xact_lock(hashtextextended('receipt-number', 0));
    v_receipt_number := public.generate_receipt_number();

    insert into public.receipts (
      quote_id,
      customer_id,
      customer_name,
      customer_email,
      customer_phone,
      property_address,
      receipt_number,
      receipt_date,
      payment_method,
      subtotal,
      tax_amount,
      total_amount,
      items,
      notes
    ) values (
      new.id,
      new.customer_id,
      new.customer_name,
      new.customer_email,
      new.customer_phone,
      new.property_address,
      v_receipt_number,
      current_date,
      null,
      v_subtotal,
      v_tax_amount,
      coalesce(new.total_amount,0),
      v_items,
      new.notes
    );
  end if;

  return new;
end;
$$;

revoke execute on function private.sync_approved_quote_receipt() from public, anon, authenticated;

drop trigger if exists z_auto_receipt_on_quote_approval on public.quotes;
create trigger z_auto_receipt_on_quote_approval
after insert or update of
  status,
  approved_at,
  customer_id,
  customer_name,
  customer_email,
  customer_phone,
  property_address,
  services,
  add_ons,
  products,
  services_subtotal,
  products_subtotal,
  gst_amount,
  pst_amount,
  total_amount,
  notes,
  travel_surcharge,
  discount_amount,
  is_test,
  source_details
on public.quotes
for each row
execute function private.sync_approved_quote_receipt();