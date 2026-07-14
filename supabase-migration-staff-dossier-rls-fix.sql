-- Correctif : permissions RLS manquantes sur staff_dossier_submissions
-- À exécuter si l'erreur « Impossible d'enregistrer le dossier » apparaît.

ALTER TABLE staff_dossier_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to staff_dossier_submissions"
  ON staff_dossier_submissions;
DROP POLICY IF EXISTS "Allow public insert access to staff_dossier_submissions"
  ON staff_dossier_submissions;
DROP POLICY IF EXISTS "Allow public update access to staff_dossier_submissions"
  ON staff_dossier_submissions;

CREATE POLICY "Allow public read access to staff_dossier_submissions"
  ON staff_dossier_submissions FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to staff_dossier_submissions"
  ON staff_dossier_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to staff_dossier_submissions"
  ON staff_dossier_submissions FOR UPDATE USING (true);
