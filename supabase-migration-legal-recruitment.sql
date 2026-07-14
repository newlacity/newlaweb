-- Migration : dossier légal + entretiens
-- À exécuter dans Supabase SQL Editor.

ALTER TABLE interview_bookings DROP CONSTRAINT IF EXISTS interview_bookings_booking_kind_check;

ALTER TABLE interview_bookings
  ADD CONSTRAINT interview_bookings_booking_kind_check
  CHECK (booking_kind IN ('whitelist', 'staff', 'legal'));

CREATE TABLE IF NOT EXISTS legal_dossier_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_legal_dossier_submissions_user_id
  ON legal_dossier_submissions(user_id);

ALTER TABLE legal_dossier_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to legal_dossier_submissions"
  ON legal_dossier_submissions;
DROP POLICY IF EXISTS "Allow public insert access to legal_dossier_submissions"
  ON legal_dossier_submissions;
DROP POLICY IF EXISTS "Allow public update access to legal_dossier_submissions"
  ON legal_dossier_submissions;

CREATE POLICY "Allow public read access to legal_dossier_submissions"
  ON legal_dossier_submissions FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to legal_dossier_submissions"
  ON legal_dossier_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to legal_dossier_submissions"
  ON legal_dossier_submissions FOR UPDATE USING (true);
