"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Car, Building, Users, Star, Factory, Music, Waves, Train } from "lucide-react"

const districts = [
  {
    name: "The Loop",
    description: "Centre financier et commercial avec ses gratte-ciels historiques et ses théâtres.",
    activities: ["Business", "Théâtres", "Shopping", "Restaurants"],
    icon: Building,
    color: "from-gray-500/20 to-slate-500/20"
  },
  {
    name: "Wicker Park",
    description: "Quartier hipster et artistique avec ses galeries, bars et boutiques vintage.",
    activities: ["Art", "Bars", "Shopping", "Cafés"],
    icon: Music,
    color: "from-[#022b59]/20 to-pink-500/20"
  },
  {
    name: "Lincoln Park",
    description: "Quartier résidentiel chic avec son parc, son zoo et ses restaurants gastronomiques.",
    activities: ["Parc", "Zoo", "Restaurants", "Sport"],
    icon: Users,
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    name: "Pilsen",
    description: "Quartier hispanique authentique avec ses murales colorées et sa culture latine.",
    activities: ["Art", "Culture", "Restaurants", "Festivals"],
    icon: Star,
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    name: "South Side",
    description: "Quartier historique avec ses traditions familiales et son authenticité urbaine.",
    activities: ["Culture", "Histoire", "Communauté", "Traditions"],
    icon: Factory,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    name: "River North",
    description: "Quartier moderne avec ses galeries d'art, restaurants et nightlife.",
    activities: ["Art", "Nightlife", "Restaurants", "Luxe"],
    icon: Train,
    color: "from-indigo-500/20 to-[#022b59]/20"
  }
]

const activities = [
  {
    title: "Business et Finance",
    description: "Développez votre empire dans le centre financier du Midwest américain.",
    icon: Building,
    examples: ["Bourse de Chicago", "Banques", "Startups", "Investissements"]
  },
  {
    title: "Culture et Arts",
    description: "Explorez les musées, galeries et événements culturels de la ville.",
    icon: Music,
    examples: ["Art Institute", "Museum Campus", "Street Art", "Théâtres"]
  },
  {
    title: "Sport et Loisirs",
    description: "Profitez des équipes sportives légendaires et des activités outdoor.",
    icon: Users,
    examples: ["Basketball", "Baseball", "Football", "Parcs"]
  },
  {
    title: "Gastronomie",
    description: "Dégustez la cuisine locale et internationale dans les meilleurs restaurants.",
    icon: Star,
    examples: ["Deep Dish Pizza", "Hot Dogs", "Steakhouses", "Food Trucks"]
  },
  {
    title: "Transport et Logistique",
    description: "Participez au hub de transport majeur de l'Amérique du Nord.",
    icon: Train,
    examples: ["Métro", "Trains", "Port", "Aéroports"]
  },
  {
    title: "Industrie et Manufacture",
    description: "Développez des entreprises dans le berceau industriel américain.",
    icon: Factory,
    examples: ["Manufacturing", "Logistics", "Warehouses", "Factories"]
  }
]

export default function ChicagoDetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
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
              Chicago
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Le cœur de l'Amérique - Découvrez l'authenticité du Midwest où les traditions familiales se mêlent à l'innovation urbaine
            </p>
            <div className="flex items-center justify-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Midwest</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Population: 2.7M+</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>Ville du Vent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Districts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Districts de Chicago
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {districts.map((district, index) => {
            const Icon = district.icon
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${district.color} backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-[#022b59]" />
                  <h3 className="text-xl font-bold text-white">{district.name}</h3>
                </div>
                <p className="text-white/70 mb-4 leading-relaxed">
                  {district.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white/80 mb-2">Activités principales :</h4>
                  <div className="flex flex-wrap gap-2">
                    {district.activities.map((activity, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activities */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Activités et Opportunités
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Icon className="w-10 h-10 text-[#022b59]" />
                  <h3 className="text-2xl font-bold text-white">{activity.title}</h3>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {activity.description}
                </p>
                <div>
                  <h4 className="text-sm font-semibold text-white/80 mb-3">Exemples :</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activity.examples.map((example, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-[#022b59]/20 text-[#022b59] text-sm rounded-lg"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Culture Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            La Culture Chicago
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Authenticité Midwest</h3>
              <p className="text-white/70 leading-relaxed">
                Chicago incarne l'esprit authentique du Midwest américain. Ici, les valeurs 
                traditionnelles de travail, de famille et de communauté se mêlent à l'innovation 
                urbaine. La ville est connue pour sa résilience, son histoire industrielle 
                et sa capacité à se réinventer constamment tout en préservant ses racines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Diversité Culturelle</h3>
              <p className="text-white/70 leading-relaxed">
                Chicago est un melting pot culturel où se rencontrent des communautés du monde entier. 
                Des quartiers ethniques vibrants aux communautés artistiques innovantes, 
                la ville offre une richesse culturelle unique. Chaque district a sa propre 
                identité et ses propres traditions, créant une mosaïque urbaine fascinante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Architecture et Innovation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Gratte-ciels Historiques</h3>
              <p className="text-white/70 leading-relaxed">
                Chicago est le berceau du gratte-ciel moderne. Des bâtiments historiques 
                comme le Willis Tower et le John Hancock Center aux nouvelles constructions 
                innovantes, l'architecture de Chicago raconte l'histoire de l'innovation 
                américaine et de l'ambition urbaine.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Hub de Transport</h3>
              <p className="text-white/70 leading-relaxed">
                Chicago est le centre névralgique du transport en Amérique du Nord. 
                Avec ses aéroports internationaux, son port majeur sur le lac Michigan 
                et son réseau ferroviaire étendu, la ville connecte l'est et l'ouest 
                du continent, facilitant le commerce et les échanges culturels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à découvrir le cœur de l'Amérique ?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Rejoignez NEW LA et commencez votre aventure dans les rues de Chicago. 
            Créez votre histoire, rencontrez d'autres joueurs et vivez l'expérience RP ultime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whitelist"
              className="bg-[#022b59] text-black px-8 py-4 rounded-lg font-medium hover:bg-[#022b59] transition-colors duration-300"
            >
              Demander l'accès
            </Link>
            <Link
              href="/catalogue"
              className="bg-white/10 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 border border-white/20"
            >
              Voir les véhicules
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 