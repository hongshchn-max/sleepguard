-- Story System Schema for Dormiveglia Chapter 1: Luna's Secret
-- Run after the main schema.sql

-- Story Progress: tracks user's narrative state
CREATE TABLE IF NOT EXISTS story_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  chapter INT NOT NULL DEFAULT 1,
  phase INT NOT NULL DEFAULT 0 CHECK (phase >= 0 AND phase <= 5),
  screen_off_accumulated INT NOT NULL DEFAULT 0,
  phase_state JSONB NOT NULL DEFAULT '{}',
  phase_advanced_at TIMESTAMPTZ,
  chapter_completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, chapter)
);

-- Screen Off Sessions: raw visibility API data
CREATE TABLE IF NOT EXISTS screen_off_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_minutes INT,
  is_sleep_window BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Story Events: audit log for phase transitions
CREATE TABLE IF NOT EXISTS story_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  chapter INT NOT NULL,
  from_phase INT NOT NULL,
  to_phase INT NOT NULL,
  trigger_reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_story_progress_user ON story_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_screen_off_sessions_user_date ON screen_off_sessions(user_id, session_date);
CREATE INDEX IF NOT EXISTS idx_story_events_user ON story_events(user_id);

-- RLS Policies
ALTER TABLE story_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE screen_off_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own story progress" ON story_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own story progress" ON story_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own story progress" ON story_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own screen off sessions" ON screen_off_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own screen off sessions" ON screen_off_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own story events" ON story_events
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can manage story events" ON story_events
  FOR INSERT WITH CHECK (true);
