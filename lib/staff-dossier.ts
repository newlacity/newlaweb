import { getSupabase } from "./supabase";

export interface StaffDossierSubmission {
  id: string;
  user_id: string;
  username: string;
  form_data: Record<string, unknown>;
  created_at: string;
}

export const staffDossierService = {
  async hasSubmitted(userId: string): Promise<boolean> {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("staff_dossier_submissions")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("staffDossier.hasSubmitted:", error);
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
    const { error } = await supabase.from("staff_dossier_submissions").upsert(
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
      console.error("staffDossier.recordSubmission:", error);
      return { ok: false, error: "Impossible d'enregistrer le dossier." };
    }
    return { ok: true };
  },
};
