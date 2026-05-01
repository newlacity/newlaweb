"use client";

import React, { useEffect, useState } from "react";
import { Shield, User, Briefcase, FileText, Send } from "lucide-react";

type DossierType = "legal" | "illegal" | "staff";

interface DossierFormPageProps {
  type: DossierType;
  title: string;
  subtitle: string;
  prepList: string[];
}

export function DossierFormPage({
  type,
  title,
  subtitle,
  prepList,
}: DossierFormPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    disponibilites: "",
    experience: "",
    motivation: "",
    details: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        if (res.ok) {
          const data = await res.json();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const detailsLabel =
    type === "staff"
      ? "Pourquoi vous voulez rejoindre le staff ?"
      : "Décrivez votre projet de dossier";

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Shield className="w-14 h-14 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
          <p className="text-white/70 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Ce qu'il faut préparer</h2>
          <ul className="space-y-2 text-white/80">
            {prepList.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {!isLoggedIn ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-white/80 mb-6">
              Connectez-vous avec Discord pour accéder au formulaire.
            </p>
            <button
              onClick={handleDiscordLogin}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Se connecter avec Discord
            </button>
          </div>
        ) : submitted ? (
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl text-white font-bold mb-2">Formulaire envoyé</h3>
            <p className="text-white/80">
              Merci {user?.username}, votre dossier a bien été rempli.
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
                  Âge
                </label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                  placeholder="Ex: 21"
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                  placeholder="Ex: soirs + week-end"
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
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Expliquez votre expérience..."
              />
            </div>

            <div>
              <label className="block text-white mb-2 text-sm">Motivation</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Expliquez vos motivations..."
              />
            </div>

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
                rows={5}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Ajoutez toutes les informations utiles..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              <Send className="w-4 h-4 inline mr-2" />
              Envoyer le formulaire
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
