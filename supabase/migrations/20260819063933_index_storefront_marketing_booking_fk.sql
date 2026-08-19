create index if not exists storefront_marketing_deliveries_booking_idx
  on public.storefront_marketing_deliveries (source_booking_id)
  where source_booking_id is not null;
