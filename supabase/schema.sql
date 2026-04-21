-- Vista Care schema
-- Run once in Supabase SQL editor (project dashboard → SQL → New query)

create extension if not exists "pgcrypto";

------------------------------------------------------------
-- 1. Measurement / order submissions
------------------------------------------------------------
create table if not exists public.vistacare_orders (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  form_type       text not null,
  patient_name    text,
  age             text,
  gender          text,
  contact         text,
  address         text,
  recommended_by  text,
  history         text[] default array[]::text[],
  measurements    jsonb default '{}'::jsonb,
  taker_name      text,
  notes           text,
  raw             jsonb default '{}'::jsonb
);

create index if not exists vistacare_orders_created_at_idx
  on public.vistacare_orders (created_at desc);

------------------------------------------------------------
-- 2. Contact form submissions
------------------------------------------------------------
create table if not exists public.vistacare_contacts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null
);

create index if not exists vistacare_contacts_created_at_idx
  on public.vistacare_contacts (created_at desc);

------------------------------------------------------------
-- 3. Products catalog (admin-managed)
------------------------------------------------------------
create table if not exists public.vistacare_products (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  slug               text unique not null,
  name               text not null,
  category           text not null,
  compression_class  text not null,
  description        text,
  image              text,
  sort_order         integer default 0
);

create index if not exists vistacare_products_category_idx
  on public.vistacare_products (category);

create or replace function public.vistacare_products_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists vistacare_products_updated_at on public.vistacare_products;
create trigger vistacare_products_updated_at
  before update on public.vistacare_products
  for each row execute function public.vistacare_products_set_updated_at();

------------------------------------------------------------
-- Row Level Security
------------------------------------------------------------
alter table public.vistacare_orders   enable row level security;
alter table public.vistacare_contacts enable row level security;
alter table public.vistacare_products enable row level security;

-- Public can submit (insert) orders + contact, and read products
drop policy if exists "anon insert orders"   on public.vistacare_orders;
drop policy if exists "anon insert contacts" on public.vistacare_contacts;
drop policy if exists "anon read products"   on public.vistacare_products;
drop policy if exists "anon read orders"     on public.vistacare_orders;
drop policy if exists "anon read contacts"   on public.vistacare_contacts;
drop policy if exists "anon write products"  on public.vistacare_products;

create policy "anon insert orders"
  on public.vistacare_orders for insert to anon with check (true);

create policy "anon insert contacts"
  on public.vistacare_contacts for insert to anon with check (true);

create policy "anon read products"
  on public.vistacare_products for select to anon using (true);

-- Admin needs to read orders/contacts and write products. The /admin route
-- is gated by HTTP basic-auth in proxy.ts, so we let anon read/write here
-- as long as basic-auth holds. For production, set SUPABASE_SECRET_KEY in
-- .env.local and DROP these three policies.
create policy "anon read orders"
  on public.vistacare_orders for select to anon using (true);

create policy "anon read contacts"
  on public.vistacare_contacts for select to anon using (true);

create policy "anon write products"
  on public.vistacare_products for all to anon
  using (true) with check (true);
