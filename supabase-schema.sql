-- Création de la table questionnaires
CREATE TABLE questionnaires (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discord_id TEXT NOT NULL,
  discord_username TEXT NOT NULL,
  score INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  grade TEXT NOT NULL,
  answers JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Création de la table whitelist_applications
CREATE TABLE whitelist_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discord_id TEXT NOT NULL,
  discord_username TEXT NOT NULL,
  username TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Création de la table whitelist_entries
CREATE TABLE IF NOT EXISTS whitelist_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  avatar TEXT,
  discriminator TEXT,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  answers INTEGER[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_questionnaires_discord_id ON questionnaires(discord_id);
CREATE INDEX idx_questionnaires_status ON questionnaires(status);
CREATE INDEX idx_questionnaires_created_at ON questionnaires(created_at);

CREATE INDEX idx_whitelist_applications_discord_id ON whitelist_applications(discord_id);
CREATE INDEX idx_whitelist_applications_status ON whitelist_applications(status);
CREATE INDEX idx_whitelist_applications_created_at ON whitelist_applications(created_at);

CREATE INDEX IF NOT EXISTS idx_whitelist_entries_user_id ON whitelist_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_whitelist_entries_created_at ON whitelist_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_whitelist_entries_passed ON whitelist_entries(passed);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_questionnaires_updated_at 
    BEFORE UPDATE ON questionnaires 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_whitelist_applications_updated_at 
    BEFORE UPDATE ON whitelist_applications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_whitelist_entries_updated_at 
  BEFORE UPDATE ON whitelist_entries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Politique RLS (Row Level Security) - Optionnel mais recommandé
ALTER TABLE questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitelist_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitelist_entries ENABLE ROW LEVEL SECURITY;

-- Politiques pour permettre l'accès public (à ajuster selon tes besoins)
CREATE POLICY "Allow public read access to questionnaires" ON questionnaires
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to questionnaires" ON questionnaires
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to questionnaires" ON questionnaires
    FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to whitelist_applications" ON whitelist_applications
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to whitelist_applications" ON whitelist_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to whitelist_applications" ON whitelist_applications
    FOR UPDATE USING (true);

-- Exemple de politique (à adapter selon vos besoins)
-- CREATE POLICY "Users can view their own entries" ON whitelist_entries
--   FOR SELECT USING (auth.uid()::text = user_id);

-- CREATE POLICY "Users can insert their own entries" ON whitelist_entries
--   FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Fonction pour obtenir les statistiques
CREATE OR REPLACE FUNCTION get_whitelist_stats()
RETURNS TABLE (
  pending_count BIGINT,
  accepted_count BIGINT,
  rejected_count BIGINT,
  total_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE status = 'accepted') as accepted_count,
    COUNT(*) FILTER (WHERE status = 'rejected') as rejected_count,
    COUNT(*) as total_count
  FROM whitelist_applications;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour vérifier le cooldown d'un utilisateur
CREATE OR REPLACE FUNCTION check_questionnaire_cooldown(user_discord_id TEXT)
RETURNS TABLE (
  can_take BOOLEAN,
  reason TEXT,
  cooldown_remaining INTEGER
) AS $$
DECLARE
  last_attempt TIMESTAMP WITH TIME ZONE;
  hours_since_last INTEGER;
BEGIN
  -- Récupérer la dernière tentative
  SELECT created_at INTO last_attempt
  FROM questionnaires
  WHERE discord_id = user_discord_id
  ORDER BY created_at DESC
  LIMIT 1;

  -- Si pas de tentative précédente
  IF last_attempt IS NULL THEN
    RETURN QUERY SELECT true, NULL::TEXT, NULL::INTEGER;
    RETURN;
  END IF;

  -- Calculer les heures depuis la dernière tentative
  hours_since_last := EXTRACT(EPOCH FROM (NOW() - last_attempt)) / 3600;

  -- Cooldown de 24h
  IF hours_since_last < 24 THEN
    RETURN QUERY SELECT false, 'Vous devez attendre 24h entre chaque tentative'::TEXT, (24 - hours_since_last)::INTEGER;
  ELSE
    RETURN QUERY SELECT true, NULL::TEXT, NULL::INTEGER;
  END IF;
END;
$$ LANGUAGE plpgsql; 

-- Politique RLS (Row Level Security) - Accès public pour l'API
ALTER TABLE whitelist_entries ENABLE ROW LEVEL SECURITY;

-- Politiques pour permettre l'accès public (nécessaire pour l'API)
CREATE POLICY "Allow public read access" ON whitelist_entries
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON whitelist_entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON whitelist_entries
  FOR UPDATE USING (true); 