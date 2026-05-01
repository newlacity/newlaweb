"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Users, Shield, Car, Star, Clock, Trophy, Heart, Zap, Globe } from "lucide-react"

const features = [
  {
    title: "Une ville iconique",
    description: "Explorez Los Angeles a travers ses quartiers, ses opportunites et ses styles de roleplay.",
    icon: Globe,
    color: "from-[#022b59]/20 to-pink-500/20"
  },
  {
    title: "Communauté active",
    description: "Rejoignez une communauté de joueurs passionnés et créatifs.",
    icon: Users,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Système RP avancé",
    description: "Profitez d'un système de roleplay complet et immersif.",
    icon: Heart,
    color: "from-red-500/20 to-pink-500/20"
  },
  {
    title: "Économie dynamique",
    description: "Participez à une économie réaliste et en constante évolution.",
    icon: Star,
    color: "from-yellow-500/20 to-amber-500/20"
  },
  {
    title: "Véhicules variés",
    description: "Accédez à une large gamme de véhicules pour tous les styles.",
    icon: Car,
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Événements réguliers",
    description: "Participez à des événements et activités organisés régulièrement.",
    icon: Trophy,
    color: "from-orange-500/20 to-red-500/20"
  }
]

const steps = [
  {
    step: "01",
    title: "Demander l'accès",
    description: "Passez le quiz RP pour obtenir votre accès whitelist",
    action: "Commencer le quiz",
    href: "/whitelist",
    icon: Shield
  },
  {
    step: "02",
    title: "Rejoindre Discord",
    description: "Intégrez notre communauté Discord pour rester connecté",
    action: "Rejoindre Discord",
    href: "https://discord.gg/newlawl",
    icon: Users
  },
  {
    step: "03",
    title: "Créer son personnage",
    description: "Développez votre identité RP et votre histoire",
    action: "Voir les guides",
    href: "/blog",
    icon: Heart
  },
  {
    step: "04",
    title: "Commencer l'aventure",
    description: "Connectez-vous au serveur et vivez votre histoire",
    action: "Se connecter",
    href: "#",
    icon: Zap
  }
]

const stats = [
  { label: "Joueurs actifs", value: "500+", icon: Users },
  { label: "Heures de jeu", value: "24/7", icon: Clock },
  { label: "Véhicules", value: "100+", icon: Car },
  { label: "Métiers", value: "20+", icon: Star }
]

export default function JoinPage() {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Rejoindre l'Univers
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Un seul decor: Los Angeles. Forgez votre destin dans un univers roleplay riche et immersif.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 text-[#022b59] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Pourquoi choisir NEW LA ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-[#022b59]" />
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Comment commencer ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#022b59] rounded-full flex items-center justify-center text-black font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-[#022b59]" />
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/70 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <Link
                      href={step.href}
                      className="inline-flex items-center gap-2 bg-[#022b59] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#022b59] transition-colors duration-300 text-sm"
                    >
                      {step.action}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Los Angeles Focus */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Votre aventure a Los Angeles
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Los Angeles */}
          <div className="bg-gradient-to-br from-[#022b59]/10 to-pink-600/10 border border-[#022b59]/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Los Angeles</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Le glamour et la rue. Plongez dans l'univers hollywoodien où le rêve américain 
              rencontre la réalité urbaine. Parfait pour ceux qui aiment le soleil, 
              l'industrie du divertissement et le lifestyle californien.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-white/80">
                <Star className="w-4 h-4 text-[#022b59]" />
                <span>Industrie du cinéma</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Star className="w-4 h-4 text-[#022b59]" />
                <span>Lifestyle californien</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Star className="w-4 h-4 text-[#022b59]" />
                <span>Plages et outdoor</span>
              </div>
            </div>
            <Link
              href="/la-details"
              className="inline-flex items-center gap-2 bg-[#022b59] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#022b59] transition-colors duration-300"
            >
              Découvrir LA
            </Link>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#022b59]/10 to-[#022b59]/10 border border-[#022b59]/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à commencer votre aventure ?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Rejoignez NEW LA et devenez partie intégrante de notre univers RP unique. 
            Créez votre histoire, rencontrez d'autres joueurs et vivez l'expérience ultime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whitelist"
              className="bg-[#022b59] text-black px-8 py-4 rounded-lg font-medium hover:bg-[#022b59] transition-colors duration-300"
            >
              Demander l'accès maintenant
            </Link>
            <Link
              href="https://discord.gg/newlawl"
              className="bg-[#5865F2] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#4752C4] transition-colors duration-300"
            >
              Rejoindre Discord
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 