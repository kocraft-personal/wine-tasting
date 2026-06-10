alter table wt_sessions
  add column if not exists welcome_settings jsonb;
