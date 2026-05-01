import { DossierFormPage } from "@/components/dossier-form-page";

export default function DepotDossierLegalPage() {
  return (
    <DossierFormPage
      type="legal"
      title="Dépôt de dossier légal"
      subtitle="Remplissez ce formulaire pour déposer votre dossier légal sur le serveur."
      prepList={[
        "Votre identité RP complète",
        "Le contexte et les preuves de votre dossier",
        "Les noms/IDs Discord des personnes concernées",
        "Les horaires approximatifs des faits",
      ]}
    />
  );
}
