-- Migration : demandes d'entretien en attente (pending) + refus (rejected)
-- À exécuter dans Supabase SQL Editor si la table existe déjà.

ALTER TABLE interview_bookings DROP CONSTRAINT IF EXISTS interview_bookings_status_check;

ALTER TABLE interview_bookings
  ADD CONSTRAINT interview_bookings_status_check
  CHECK (status IN ('pending', 'confirmed', 'cancelled', 'rejected'));

DROP INDEX IF EXISTS idx_interview_bookings_one_active_per_slot;
DROP INDEX IF EXISTS idx_interview_bookings_one_active_per_user;

CREATE UNIQUE INDEX IF NOT EXISTS idx_interview_bookings_one_active_per_slot
  ON interview_bookings(slot_id) WHERE status IN ('pending', 'confirmed');

CREATE UNIQUE INDEX IF NOT EXISTS idx_interview_bookings_one_active_per_user
  ON interview_bookings(user_id) WHERE status IN ('pending', 'confirmed');
