"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone, Shield, Users, FileText, Heart } from "lucide-react"

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b59]/20 to-[#022b59]/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#022b59] hover:text-[#022b59] transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <div className="text-center">
            <FileText className="w-16 h-16 text-[#022b59] mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Mentions Légales
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Informations légales et conditions d'utilisation du site NEW LA
            </p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Éditeur */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#022b59]" />
              Éditeur du site
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Nom :</strong> NEW LA</p>
              <p><strong className="text-white">Type :</strong> Serveur de jeu vidéo communautaire</p>
              <p><strong className="text-white">Site web :</strong> <a href="https://newlacity.com" className="text-[#022b59] hover:underline">https://newlacity.com</a></p>
              <p><strong className="text-white">Discord :</strong> <a href="https://discord.gg/newlawl" className="text-[#022b59] hover:underline">https://discord.gg/newlawl</a></p>
            </div>
          </section>

          {/* Hébergement */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#022b59]" />
              Hébergement
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Hébergeur :</strong> Vercel Inc.</p>
              <p><strong className="text-white">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
              <p><strong className="text-white">Site web :</strong> <a href="https://vercel.com" className="text-[#022b59] hover:underline">https://vercel.com</a></p>
            </div>
          </section>

          {/* Base de données */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#022b59]" />
              Base de données
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Fournisseur :</strong> Supabase</p>
              <p><strong className="text-white">Adresse :</strong> 201 Post Street, San Francisco, CA 94108, États-Unis</p>
              <p><strong className="text-white">Site web :</strong> <a href="https://supabase.com" className="text-[#022b59] hover:underline">https://supabase.com</a></p>
              <p><strong className="text-white">Données stockées :</strong> Informations de connexion Discord, résultats des quiz whitelist, préférences utilisateur</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#022b59]" />
              Propriété intellectuelle
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
              <p>
                <strong className="text-white">Jeux vidéo :</strong> Ce site fait référence à des jeux vidéo dont les droits appartiennent à leurs éditeurs respectifs. 
                NEW LA n'est pas affilié à ces éditeurs et n'utilise leurs marques qu'à des fins descriptives.
              </p>
            </div>
          </section>

          {/* Protection des données */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#022b59]" />
              Protection des données personnelles
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p><strong className="text-white">Données collectées :</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Identifiant Discord (ID, nom d'utilisateur, avatar)</li>
                <li>Résultats des quiz whitelist</li>
                <li>Données de connexion et d'utilisation</li>
                <li>Cookies de session</li>
              </ul>
              <p><strong className="text-white">Finalité :</strong> Gestion de l'accès whitelist, amélioration du service, support utilisateur</p>
              <p><strong className="text-white">Durée de conservation :</strong> 7 ans pour les données de connexion, durée de vie du compte pour les données de profil</p>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#022b59]" />
              Cookies
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                Ce site utilise des cookies pour améliorer votre expérience utilisateur et assurer le bon fonctionnement du service.
              </p>
              <p><strong className="text-white">Types de cookies utilisés :</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cookies de session :</strong> Nécessaires au fonctionnement de l'authentification Discord</li>
                <li><strong>Cookies techniques :</strong> Assurent le bon fonctionnement du site</li>
                <li><strong>Cookies d'analyse :</strong> Mesurent l'audience et l'utilisation du site</li>
              </ul>
              <p>
                Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter le fonctionnement du site.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#022b59]" />
              Limitation de responsabilité
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p>
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler 
                par email à l'adresse mentionnée dans la page de contact.
              </p>
              <p>
                Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité. 
                En conséquence, NEW LA ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur de l'utilisateur 
                ou d'une quelconque perte de données consécutives au téléchargement.
              </p>
            </div>
          </section>

          {/* Liens hypertextes */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#022b59]" />
              Liens hypertextes
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet 
                ne sauraient engager la responsabilité de NEW LA.
              </p>
              <p>
                <strong className="text-white">Liens externes :</strong> Discord, Vercel, Supabase, éditeurs de jeux vidéo
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#022b59]" />
              Droit applicable
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                Tout litige en relation avec l'utilisation du site NEW LA est soumis au droit français. 
                En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents.
              </p>
              <p>
                <strong className="text-white">Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-[#022b59]/10 to-[#022b59]/10 border border-[#022b59]/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#022b59]" />
              Contact
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                Pour toute question concernant ces mentions légales ou pour exercer vos droits RGPD, 
                vous pouvez nous contacter via :
              </p>
              <div className="space-y-2">
                <p><strong className="text-white">Discord :</strong> <a href="https://discord.gg/newlawl" className="text-[#022b59] hover:underline">https://discord.gg/newlawl</a></p>
                <p><strong className="text-white">Email :</strong> <a href="mailto:contact@newlacity.com" className="text-[#022b59] hover:underline">contact@newlacity.com</a></p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-white/60">
          <p className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" />
            NEW LA - Mentions légales
          </p>
        </div>
      </div>
    </div>
  )
} 