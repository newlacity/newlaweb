-- Migration : créneaux séparés par pôle (whitelist, staff, legal)
-- À exécuter dans Supabase SQL Editor.

ALTER TABLE interview_slots
  ADD COLUMN IF NOT EXISTS slot_kind TEXT NOT NULL DEFAULT 'whitelist';

ALTER TABLE interview_slots DROP CONSTRAINT IF EXISTS interview_slots_slot_kind_check;

ALTER TABLE interview_slots
  ADD CONSTRAINT interview_slots_slot_kind_check
  CHECK (slot_kind IN ('whitelist', 'staff', 'legal'));

ALTER TABLE interview_slots DROP CONSTRAINT IF EXISTS interview_slots_starts_at_key;

DROP INDEX IF EXISTS interview_slots_starts_at_key;
DROP INDEX IF EXISTS idx_interview_slots_starts_at_kind;

CREATE UNIQUE INDEX IF NOT EXISTS idx_interview_slots_starts_at_kind
  ON interview_slots(starts_at, slot_kind);

CREATE INDEX IF NOT EXISTS idx_interview_slots_slot_kind
  ON interview_slots(slot_kind);
