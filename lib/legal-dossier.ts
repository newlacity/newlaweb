import { getSupabase } from "./supabase";

export interface LegalDossierSubmission {
  id: string;
  user_id: string;
  username: string;
  form_data: Record<string, unknown>;
  created_at: string;
}

export const legalDossierService = {
  async hasSubmitted(userId: string): Promise<boolean> {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("legal_dossier_submissions")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("legalDossier.hasSubmitted:", error);
      return false;
    }
    return Boolean(data);
  },

  async recordSubmission(
    userId: string,
    username: string,
    formData: Record<string, unknown>,
  ): Promise<{ ok: boolean; error?: string }> {
    const supabase = getSupabase();
    const { error } = await supabase.from("legal_dossier_submissions").upsert(
      [
        {
          user_id: userId,
          username,
          form_data: formData,
        },
      ],
      { onConflict: "user_id" },
    );

    if (error) {
      console.error("legalDossier.recordSubmission:", error);
      return { ok: false, error: "Impossible d'enregistrer le dossier." };
    }
    return { ok: true };
  },
};
