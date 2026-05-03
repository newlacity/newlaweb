"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, User, Briefcase, FileText, Send, MapPin, Pill, Building2, Coins } from "lucide-react";
import {
  DOSSIER_SHORT_INPUT_MAX_LENGTH,
  DOSSIER_TEXTAREA_MAX_LENGTH,
} from "@/lib/dossier-limits";

type DossierType = "legal" | "illegal" | "staff";

interface DossierFormPageProps {
  type: DossierType;
  title: string;
  subtitle: string;
  prepList: string[];
}

interface DiscordUserLite {
  id?: string;
  username?: string;
}

const initialForm = {
  age: "",
  disponibilites: "",
  experience: "",
  motivation: "",
  details: "",
  nomStructure: "",
  typeActivite: "",
  prixProduitsEtServices: "",
  salairesEtPrimes: "",
  politiqueRecrutement: "",
  capitalEtFinancement: "",
  projetsAVenir: "",
  controleZones: "",
  lignesDrogue: "",
  businessAAcquire: "",
};

type FormState = typeof initialForm;

export function DossierFormPage({
  type,
  title,
  subtitle,
  prepList,
}: DossierFormPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<DiscordUserLite | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>(initialForm);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        if (res.ok) {
          const data = (await res.json()) as DiscordUserLite;
          setIsLoggedIn(true);
          setUser(data);
        }
      } catch (error) {
        console.error("Erreur auth:", error);
      }
    };
    checkAuth();
  }, []);

  const handleDiscordLogin = () => {
    window.open("/api/auth/discord", "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (type === "staff") {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/dossier/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type, ...formData }),
      });
      let data: { error?: string } = {};
      try {
        data = (await res.json()) as { error?: string };
      } catch {
        /* ignore */
      }
      if (!res.ok) {
        setSubmitError(data.error ?? "Erreur lors de l'envoi");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Erreur réseau. Réessayez dans un instant.");
    } finally {
      setSubmitting(false);
    }
  };

  const detailsLabel =
    type === "staff"
      ? "Pourquoi vous voulez rejoindre le staff ?"
      : type === "legal"
        ? "Informations complémentaires (livrables, calendrier, contacts RP…)"
        : "Informations complémentaires (cohérence RP, risques, partenaires…)";

  const isDossierWebhook = type === "legal" || type === "illegal";
  const shortMax = isDossierWebhook ? DOSSIER_SHORT_INPUT_MAX_LENGTH : undefined;
  const longMax = isDossierWebhook ? DOSSIER_TEXTAREA_MAX_LENGTH : undefined;

  const reglementLinks =
    type === "legal"
      ? [
          { href: "/reglement-societes", label: "Règlement Sociétés" },
          { href: "/reglement-general", label: "Règlement général" },
        ]
      : type === "illegal"
        ? [{ href: "/reglement-illegal", label: "Règlement illégal" }]
        : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Shield className="w-14 h-14 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
          <p className="text-white/70 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Ce qu&apos;il faut préparer
          </h2>
          <ul className="space-y-2 text-white/80">
            {prepList.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {reglementLinks.length > 0 && (
            <p className="mt-6 text-sm text-white/60">
              Rappel : votre dossier doit rester cohérent avec le{" "}
              {reglementLinks.map((l, i) => (
                <React.Fragment key={l.href}>
                  {i > 0 && " et le "}
                  <Link
                    href={l.href}
                    className="text-white underline underline-offset-2 hover:text-white/90"
                  >
                    {l.label}
                  </Link>
                </React.Fragment>
              ))}
              .
            </p>
          )}
        </div>

        {!isLoggedIn ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-white/80 mb-6">
              Connectez-vous avec Discord pour accéder au formulaire.
            </p>
            <button
              type="button"
              onClick={handleDiscordLogin}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Se connecter avec Discord
            </button>
          </div>
        ) : submitted ? (
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl text-white font-bold mb-2">
              Formulaire envoyé
            </h3>
            <p className="text-white/80">
              Merci {user?.username ?? "joueur"}, votre dossier a bien été
              rempli.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2 text-sm">
                  <User className="w-4 h-4 inline mr-2" />
                  Âge (IRL ou RP, précisez)
                </label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  maxLength={shortMax}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                  placeholder="Ex : 21 ans IRL / 32 ans RP"
                />
              </div>
              <div>
                <label className="block text-white mb-2 text-sm">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Disponibilités
                </label>
                <input
                  name="disponibilites"
                  value={formData.disponibilites}
                  onChange={handleChange}
                  required
                  maxLength={shortMax}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                  placeholder="Ex : soirs + week-end"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm">
                Expérience RP / FiveM
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                maxLength={longMax}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Parcours, factions, types de scènes déjà jouées…"
              />
            </div>

            <div>
              <label className="block text-white mb-2 text-sm">
                Motivation
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                maxLength={longMax}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Pourquoi ce dossier maintenant, et ce que vous apportez au serveur…"
              />
            </div>

            {type === "legal" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2 text-sm">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      Nom de la structure / société (RP)
                    </label>
                    <input
                      name="nomStructure"
                      value={formData.nomStructure}
                      onChange={handleChange}
                      required
                      maxLength={shortMax}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                      placeholder="Ex : Los Santos Logistics Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-sm">
                      Type d&apos;activité légale
                    </label>
                    <input
                      name="typeActivite"
                      value={formData.typeActivite}
                      onChange={handleChange}
                      required
                      maxLength={shortMax}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                      placeholder="Commerce, restauration, garage, import-export…"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    <Coins className="w-4 h-4 inline mr-2" />
                    Grille tarifaire prévue (prix des produits / services)
                  </label>
                  <textarea
                    name="prixProduitsEtServices"
                    value={formData.prixProduitsEtServices}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Listez les articles ou prestations avec le prix public prévu (ex : menu à 45 $, réparation moteur 120 $…). Indiquez si les prix sont fixes ou négociables."
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    Rémunération des employés (salaires, extras, primes)
                  </label>
                  <textarea
                    name="salairesEtPrimes"
                    value={formData.salairesEtPrimes}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Fourchettes ou montants par poste (ex : vendeur 800–1200 $/semaine RP, manager + primes objectifs…). Précisez la fréquence de versement RP."
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    Politique de recrutement & formation (alignée règlement
                    sociétés)
                  </label>
                  <textarea
                    name="politiqueRecrutement"
                    value={formData.politiqueRecrutement}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Entretiens RP, période d'essai, formation poste, hiérarchie prévue…"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    Capital de départ & financement (business plan sommaire)
                  </label>
                  <textarea
                    name="capitalEtFinancement"
                    value={formData.capitalEtFinancement}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Montant ou fourchette RP, origine des fonds RP, besoins locaux / stock / véhicules…"
                  />
                </div>
              </>
            )}

            {type === "illegal" && (
              <>
                <div>
                  <label className="block text-white mb-2 text-sm">
                    Projets illégaux à venir (court & moyen terme)
                  </label>
                  <textarea
                    name="projetsAVenir"
                    value={formData.projetsAVenir}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Objectifs RP sur 1–4 semaines : braquages, expansion, alliances, guerre d’influence… Restez réalistes et cohérents avec le règlement (cooldowns, horaires braquages majeurs, etc.)."
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Zones que vous souhaitez contrôler ou influencer
                  </label>
                  <textarea
                    name="controleZones"
                    value={formData.controleZones}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Quartiers, points de vente, routes, lieux stratégiques… Expliquez le RP derrière (pas de ‘claim’ abusif hors scène)."
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    <Pill className="w-4 h-4 inline mr-2" />
                    Lignes de drogue que vous comptez gérer
                  </label>
                  <textarea
                    name="lignesDrogue"
                    value={formData.lignesDrogue}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Production, gros, détail, territoire cible, partenaires ou grossistes RP…"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Acquisition ou reprise de business (légal ou illégal)
                  </label>
                  <textarea
                    name="businessAAcquire"
                    value={formData.businessAAcquire}
                    onChange={handleChange}
                    required
                    maxLength={longMax}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                    placeholder="Oui / Non. Si oui : lequel, avec quel RP (extorsion, achat, infiltration…), et le calendrier envisagé."
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-white mb-2 text-sm">
                <FileText className="w-4 h-4 inline mr-2" />
                {detailsLabel}
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                maxLength={longMax}
                rows={type === "staff" ? 5 : 4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                placeholder={
                  type === "illegal"
                    ? "Respect du fair-play, des échecs, des arrestations ; pas d’actes gratuits ; lien avec le règlement illégal si besoin…"
                    : type === "legal"
                      ? "Documents annexes, associés, locaux, besoins admin, scénarios d’ouverture…"
                      : "Ajoutez toutes les informations utiles…"
                }
              />
            </div>

            {submitError && (
              <p className="text-red-300 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-60 disabled:pointer-events-none"
            >
              <Send className="w-4 h-4 inline mr-2" />
              {submitting ? "Envoi en cours…" : "Envoyer le formulaire"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
