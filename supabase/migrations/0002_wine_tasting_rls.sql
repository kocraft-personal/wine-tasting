-- ============================================================
-- Wine Tasting App — RLS Policies
-- Run after 0001_wine_tasting_init.sql
-- ============================================================

-- Enable RLS on all tables
alter table wt_profiles      enable row level security;
alter table wt_sessions      enable row level security;
alter table wt_session_wines enable row level security;
alter table wt_ratings       enable row level security;
alter table wt_superlatives  enable row level security;

-- ─── wt_profiles ──────────────────────────────────────────────────────────────
-- Anyone (including anonymous) can read display names (needed for scoreboard)
create policy "wt_profiles: anyone reads"
  on wt_profiles for select using (true);

create policy "wt_profiles: insert own row"
  on wt_profiles for insert with check (id = auth.uid());

create policy "wt_profiles: update own row"
  on wt_profiles for update using (id = auth.uid());

-- ─── wt_sessions ──────────────────────────────────────────────────────────────
-- Any authenticated user (including anonymous) can read sessions
create policy "wt_sessions: authed reads"
  on wt_sessions for select using (auth.uid() is not null);

create policy "wt_sessions: creator inserts"
  on wt_sessions for insert with check (auth.uid() = created_by);

create policy "wt_sessions: creator updates"
  on wt_sessions for update using (auth.uid() = created_by);

create policy "wt_sessions: creator deletes"
  on wt_sessions for delete using (auth.uid() = created_by);

-- ─── wt_session_wines ─────────────────────────────────────────────────────────
create policy "wt_session_wines: authed reads"
  on wt_session_wines for select using (auth.uid() is not null);

create policy "wt_session_wines: session creator inserts"
  on wt_session_wines for insert with check (
    auth.uid() = created_by
    and exists (
      select 1 from wt_sessions
      where id = session_id and created_by = auth.uid()
    )
  );

create policy "wt_session_wines: session creator updates"
  on wt_session_wines for update using (
    exists (
      select 1 from wt_sessions
      where id = session_id and created_by = auth.uid()
    )
  );

create policy "wt_session_wines: session creator deletes"
  on wt_session_wines for delete using (
    exists (
      select 1 from wt_sessions
      where id = session_id and created_by = auth.uid()
    )
  );

-- ─── wt_ratings ───────────────────────────────────────────────────────────────
create policy "wt_ratings: authed reads"
  on wt_ratings for select using (auth.uid() is not null);

create policy "wt_ratings: insert own"
  on wt_ratings for insert with check (auth.uid() = user_id);

create policy "wt_ratings: update own"
  on wt_ratings for update using (auth.uid() = user_id);

-- ─── wt_superlatives ──────────────────────────────────────────────────────────
create policy "wt_superlatives: authed reads"
  on wt_superlatives for select using (auth.uid() is not null);

create policy "wt_superlatives: insert own"
  on wt_superlatives for insert with check (auth.uid() = user_id);

create policy "wt_superlatives: update own"
  on wt_superlatives for update using (auth.uid() = user_id);
