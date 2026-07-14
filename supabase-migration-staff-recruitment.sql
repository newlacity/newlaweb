-- Migration : recrutement staff (dossier + entretiens)
-- À exécuter dans Supabase SQL Editor.

ALTER TABLE interview_bookings
  ADD COLUMN IF NOT EXISTS booking_kind TEXT NOT NULL DEFAULT 'whitelist';

ALTER TABLE interview_bookings DROP CONSTRAINT IF EXISTS interview_bookings_booking_kind_check;

ALTER TABLE interview_bookings
  ADD CONSTRAINT interview_bookings_booking_kind_check
  CHECK (booking_kind IN ('whitelist', 'staff'));

DROP INDEX IF EXISTS idx_interview_bookings_one_active_per_user;

CREATE UNIQUE INDEX IF NOT EXISTS idx_interview_bookings_one_active_per_user_kind
  ON interview_bookings(user_id, booking_kind)
  WHERE status IN ('pending', 'confirmed');

CREATE TABLE IF NOT EXISTS staff_dossier_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_dossier_submissions_user_id
  ON staff_dossier_submissions(user_id);

ALTER TABLE staff_dossier_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to staff_dossier_submissions"
  ON staff_dossier_submissions FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to staff_dossier_submissions"
  ON staff_dossier_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to staff_dossier_submissions"
  ON staff_dossier_submissions FOR UPDATE USING (true);
