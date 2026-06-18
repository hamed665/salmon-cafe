create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key,
  full_name text,
  email text,
  mobile text,
  role text not null default 'cafe_owner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.themes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  key text not null unique,
  primary_color text not null default '#7b4a2b',
  accent_color text not null default '#d8a657',
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.cafes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  cover_url text,
  phone text,
  instagram_url text,
  address text,
  city text,
  area text,
  status text not null default 'draft',
  is_published boolean not null default false,
  theme_id uuid references public.themes(id),
  default_locale text not null default 'fa-IR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cafe_members (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'cafe_manager',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (cafe_id, user_id)
);

create table public.cafe_settings (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null unique references public.cafes(id) on delete cascade,
  currency text not null default 'IRT',
  text_direction text not null default 'rtl',
  show_prices boolean not null default true,
  enable_mood_menu boolean not null default true,
  enable_coffee_story boolean not null default true,
  enable_recommendations boolean not null default true,
  enable_analytics boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cafe_id, slug)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null,
  description text,
  price integer not null default 0,
  discount_price integer,
  image_url text,
  video_url text,
  is_active boolean not null default true,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_popular_manual boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cafe_id, slug)
);

create table public.product_profiles (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null unique references public.products(id) on delete cascade,
  sweetness_level integer not null default 0 check (sweetness_level between 0 and 5),
  bitterness_level integer not null default 0 check (bitterness_level between 0 and 5),
  caffeine_level integer not null default 0 check (caffeine_level between 0 and 5),
  temperature_type text not null default 'hot',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_stories (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null unique references public.products(id) on delete cascade,
  origin_country text,
  ingredients text,
  preparation_method text,
  short_story text,
  history text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.moods (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  icon text,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true
);

create table public.product_moods (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  mood_id uuid not null references public.moods(id) on delete cascade,
  weight integer not null default 1,
  unique (product_id, mood_id)
);

create table public.product_recommendations (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  recommended_product_id uuid not null references public.products(id) on delete cascade,
  reason text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  check (product_id <> recommended_product_id)
);

create table public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  code text not null unique,
  type text not null default 'cafe',
  target_url text not null,
  scan_count integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  anonymous_id text not null,
  cafe_id uuid references public.cafes(id) on delete cascade,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  user_agent text,
  device_type text,
  referrer text
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  qr_code_id uuid references public.qr_codes(id) on delete set null,
  session_id uuid references public.visitor_sessions(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  key text not null unique,
  monthly_price integer not null default 0,
  yearly_price integer not null default 0,
  max_products integer not null default 50,
  enable_mood_menu boolean not null default false,
  enable_recommendations boolean not null default false,
  enable_analytics boolean not null default true,
  enable_custom_theme boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  plan_id uuid not null references public.plans(id),
  status text not null default 'trial',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  payment_status text not null default 'unpaid',
  renewal_type text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  amount integer not null,
  currency text not null default 'IRT',
  method text not null default 'manual_bank_transfer',
  status text not null default 'pending',
  tracking_code text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  cafe_id uuid references public.cafes(id) on delete cascade,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

create index cafes_owner_idx on public.cafes(owner_id);
create index products_cafe_category_idx on public.products(cafe_id, category_id);
create index products_active_available_idx on public.products(cafe_id, is_active, is_available);
create index analytics_events_cafe_created_idx on public.analytics_events(cafe_id, created_at desc);
create index analytics_events_type_created_idx on public.analytics_events(event_type, created_at desc);
create index subscriptions_cafe_idx on public.subscriptions(cafe_id);

alter table public.profiles enable row level security;
alter table public.cafes enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.analytics_events enable row level security;

create policy "public published cafes" on public.cafes for select using (is_published = true and status = 'active');
create policy "public active categories" on public.categories for select using (is_active = true);
create policy "public active products" on public.products for select using (is_active = true);
create policy "public insert analytics" on public.analytics_events for insert with check (true);
