import { DossierFormPage } from "@/components/dossier-form-page";

export default function DepotDossierIllegalPage() {
  return (
    <DossierFormPage
      type="illegal"
      title="Dépôt de dossier illégal"
      subtitle="Décrivez votre ligne criminelle en cohérence avec le règlement illégal : projets, territoire, drogue, extensions économiques. Le RP réaliste et les conséquences (arrestations, échecs) sont attendus."
      prepList={[
        "Projets illégaux à court et moyen terme (objectifs RP clairs)",
        "Zones visées pour influence ou contrôle (sans meta/abuse de claim)",
        "Lignes de drogue envisagées (production, vente, distribution, partenaires RP)",
        "Intentions d'acquisition ou reprise de business (légal ou illégal), avec motivation RP",
        "Respect des restrictions (cooldowns braquages, plages horaires majeurs, fair-play)",
        "Discord / pseudos des contacts ou cellule si déjà constituée",
      ]}
    />
  );
}
