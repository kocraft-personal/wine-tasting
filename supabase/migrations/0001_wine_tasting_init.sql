-- ============================================================
-- Wine Tasting App — Run this in the Supabase SQL Editor
-- Tables are prefixed with wt_ to avoid collision with
-- existing Craft Fam App tables in the same project.
-- ============================================================

-- ─── Enum ────────────────────────────────────────────────────────────────────

create type wt_wine_style as enum (
  'sparkling',
  'white_crisp',
  'white_aromatic',
  'white_oaked',
  'rose',
  'red_light',
  'red_medium',
  'red_bold',
  'dessert',
  'orange',
  'blend'
);

-- ─── Profiles ─────────────────────────────────────────────────────────────────

create table if not exists wt_profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name  text not null,
  created_at timestamptz not null default now()
);

-- ─── Sessions ─────────────────────────────────────────────────────────────────

create table if not exists wt_sessions (
  id           uuid    primary key default gen_random_uuid(),
  name         text    not null,
  tasting_date date,
  created_by   uuid    not null references auth.users(id) on delete cascade,
  invite_code  text    not null unique
                 default substring(replace(gen_random_uuid()::text, '-', ''), 1, 8),
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

create index if not exists wt_sessions_invite_code_idx on wt_sessions(invite_code);
create index if not exists wt_sessions_created_by_idx  on wt_sessions(created_by);

-- ─── Session Wines ────────────────────────────────────────────────────────────

create table if not exists wt_session_wines (
  id                uuid          primary key default gen_random_uuid(),
  session_id        uuid          not null references wt_sessions(id) on delete cascade,
  position          int           not null,
  wine_name         text          not null,
  wine_style        wt_wine_style not null,
  varietal          text,                         -- e.g. "Chardonnay" (null for blend)
  blend_composition jsonb,                        -- [{varietal, pct}] for blends
  region            text,                         -- e.g. "Napa Valley"
  country           text,                         -- e.g. "United States"
  custom_options    jsonb,                        -- host overrides; null = use defaults
  created_by        uuid          not null references auth.users(id) on delete cascade,
  created_at        timestamptz   not null default now(),
  unique(session_id, position)
);

create index if not exists wt_session_wines_session_idx on wt_session_wines(session_id, position);

-- ─── Ratings ──────────────────────────────────────────────────────────────────

create table if not exists wt_ratings (
  id                     uuid primary key default gen_random_uuid(),
  session_id             uuid not null references wt_sessions(id) on delete cascade,
  wine_id                uuid not null references wt_session_wines(id) on delete cascade,
  user_id                uuid not null references auth.users(id) on delete cascade,
  -- Look
  look_color             text,
  look_color_hex         text,
  look_clarity           text,
  look_clarity_other     text,
  -- Nose
  aromas_fruity          text[] not null default '{}',
  aromas_non_fruity      text[] not null default '{}',
  aromas_fruity_other    text,
  aromas_nonfruity_other text,
  nose_notes             text,
  -- Taste
  sweet                  text,
  sweet_other            text,
  tannin                 text,
  tannin_other           text,
  acidity                text,
  acidity_other          text,
  body                   text,
  body_other             text,
  finish                 text,
  finish_other           text,
  bubbles                text,
  bubbles_other          text,
  -- Verdict
  stars                  int check (stars between 1 and 5),
  verdict_word           text,
  food_pairing           text,
  -- Metadata
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  unique(session_id, wine_id, user_id)
);

create index if not exists wt_ratings_session_idx on wt_ratings(session_id);
create index if not exists wt_ratings_user_idx    on wt_ratings(user_id);
create index if not exists wt_ratings_wine_idx    on wt_ratings(wine_id);

-- Auto-update updated_at on wt_ratings
create or replace function wt_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger wt_ratings_updated_at
  before update on wt_ratings
  for each row execute function wt_set_updated_at();

-- ─── Superlatives ─────────────────────────────────────────────────────────────

create table if not exists wt_superlatives (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references wt_sessions(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  category   text not null,   -- 'overall_favorite', 'most_surprising', etc.
  wine_id    uuid not null references wt_session_wines(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(session_id, user_id, category)
);

create index if not exists wt_superlatives_session_idx on wt_superlatives(session_id);
