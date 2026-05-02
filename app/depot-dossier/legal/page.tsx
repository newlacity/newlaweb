import { DossierFormPage } from "@/components/dossier-form-page";

export default function DepotDossierLegalPage() {
  return (
    <DossierFormPage
      type="legal"
      title="Dépôt de dossier légal"
      subtitle="Dossier aligné sur le règlement sociétés : activité légale, tarification, RH et financement. Les champs servent de business plan RP pour validation."
      prepList={[
        "Nom de la société ou structure et type d'activité légale",
        "Grille tarifaire prévue (prix produits / services) et politique de prix",
        "Rémunération employés : salaires, primes, extras, fréquence de versement RP",
        "Politique de recrutement (entretiens RP, période d'essai, formation) conforme au règlement sociétés",
        "Capital de départ, origine des fonds RP et besoins (local, stock, flotte…)",
        "Liste des associés ou actionnaires RP si applicable",
      ]}
    />
  );
}
