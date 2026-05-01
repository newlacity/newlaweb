import { DossierFormPage } from "@/components/dossier-form-page";

export default function DepotDossierIllegalPage() {
  return (
    <DossierFormPage
      type="illegal"
      title="Dépôt de dossier illégal"
      subtitle="Remplissez ce formulaire pour déposer votre dossier illégal sur le serveur."
      prepList={[
        "Le type d'activité illégale concernée",
        "Les preuves et captures utiles",
        "Les noms/IDs Discord des personnes impliquées",
        "Les dates/heures des événements",
      ]}
    />
  );
}
