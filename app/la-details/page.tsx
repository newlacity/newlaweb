"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Car, Building, Users, Star, Camera, Music, Waves } from "lucide-react"

const districts = [
  {
    name: "Hollywood",
    description: "Le cœur du cinéma américain, où les rêves prennent vie sous les néons.",
    activities: ["Cinéma", "Théâtres", "Bars VIP", "Studios"],
    icon: Camera,
    color: "from-[#022b59]/20 to-pink-500/20"
  },
  {
    name: "Santa Monica",
    description: "Plages de sable fin, promenade au bord de l'océan et ambiance décontractée.",
    activities: ["Plage", "Surf", "Promenade", "Restaurants"],
    icon: Waves,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    name: "Downtown LA",
    description: "Centre financier et culturel avec ses gratte-ciels et ses musées.",
    activities: ["Business", "Musées", "Shopping", "Nightlife"],
    icon: Building,
    color: "from-gray-500/20 to-slate-500/20"
  },
  {
    name: "Venice Beach",
    description: "Quartier bohème avec ses artistes de rue et son skatepark légendaire.",
    activities: ["Skate", "Art", "Street Performers", "Cafés"],
    icon: Music,
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    name: "Beverly Hills",
    description: "Luxueux quartier résidentiel où vivent les stars et les millionnaires.",
    activities: ["Luxe", "Shopping", "Restaurants", "Spas"],
    icon: Star,
    color: "from-yellow-500/20 to-amber-500/20"
  },
  {
    name: "Echo Park",
    description: "Quartier hipster en pleine gentrification avec ses bars et ses food trucks.",
    activities: ["Food Trucks", "Bars", "Art", "Lac"],
    icon: Users,
    color: "from-green-500/20 to-emerald-500/20"
  }
]

const activities = [
  {
    title: "Cinéma et Entertainment",
    description: "Participez à des castings, tournez des films ou assistez à des avant-premières.",
    icon: Camera,
    examples: ["Studios Warner Bros", "Walk of Fame", "Dolby Theatre", "Universal Studios"]
  },
  {
    title: "Business et Finance",
    description: "Développez votre empire commercial dans le centre financier de la côte ouest.",
    icon: Building,
    examples: ["Bourse de LA", "Banques", "Startups", "Investissements"]
  },
  {
    title: "Mode et Luxe",
    description: "Découvrez les dernières tendances dans les boutiques de Beverly Hills.",
    icon: Star,
    examples: ["Rodeo Drive", "Boutiques de luxe", "Fashion Shows", "Spas"]
  },
  {
    title: "Culture et Art",
    description: "Explorez les musées, galeries et événements culturels de la ville.",
    icon: Music,
    examples: ["LACMA", "Getty Center", "Street Art", "Concerts"]
  },
  {
    title: "Sport et Loisirs",
    description: "Profitez du climat californien avec des activités outdoor variées.",
    icon: Waves,
    examples: ["Surf", "Basketball", "Skate", "Yoga"]
  },
  {
    title: "Gastronomie",
    description: "Dégustez la cuisine internationale dans les meilleurs restaurants.",
    icon: Users,
    examples: ["Food Trucks", "Restaurants étoilés", "Marchés", "Cafés"]
  }
]

export default function LADetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b59]/20 to-pink-600/20"></div>
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
              Los Angeles
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Le glamour et la rue - Plongez dans l'univers hollywoodien où le rêve américain rencontre la réalité urbaine
            </p>
            <div className="flex items-center justify-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Côte Ouest</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Population: 4M+</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>Capital du Cinéma</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Districts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Districts de Los Angeles
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
        <div className="bg-gradient-to-r from-[#022b59]/10 to-pink-600/10 border border-[#022b59]/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            La Culture LA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Lifestyle Californien</h3>
              <p className="text-white/70 leading-relaxed">
                Los Angeles incarne le rêve américain par excellence. Ici, tout est possible : 
                devenir une star du cinéma, créer une startup révolutionnaire, ou simplement 
                profiter du soleil et de la bonne vie. La ville mélange glamour hollywoodien 
                et authenticité urbaine, créant un environnement unique où les opportunités 
                sont infinies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Diversité Culturelle</h3>
              <p className="text-white/70 leading-relaxed">
                LA est un melting pot culturel où se rencontrent des influences du monde entier. 
                Des quartiers ethniques vibrants aux communautés artistiques avant-gardistes, 
                la ville offre une richesse culturelle incomparable. Chaque district a sa propre 
                identité et ses propres traditions, créant une mosaïque urbaine fascinante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à vivre le rêve californien ?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Rejoignez NEW LA et commencez votre aventure dans les rues de Los Angeles. 
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