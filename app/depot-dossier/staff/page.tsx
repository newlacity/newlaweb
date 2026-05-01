import { DossierFormPage } from "@/components/dossier-form-page";

export default function DevenirStaffPage() {
  return (
    <DossierFormPage
      type="staff"
      title="Devenir staff"
      subtitle="Complétez ce formulaire de candidature staff après connexion Discord."
      prepList={[
        "Votre expérience en modération/staff",
        "Vos disponibilités hebdomadaires",
        "Pourquoi vous voulez rejoindre l'équipe",
        "Votre vision pour améliorer le serveur",
      ]}
    />
  );
}
