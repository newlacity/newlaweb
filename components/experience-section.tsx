"use client"

import { useEffect } from "react"

export function ExperienceSection() {


  const features = [
    {
      title: "Système de whitelist",
      description: "Un système de whitelist pour garantir une qualité de joueur parmi les meilleurs",
      icon: "01",
    },
    {
      title: "Immersion 100% Los Angeles",
      description: "Un lore unique centré sur Los Angeles, dans l'univers NEW LA",
      icon: "02",
    },
    {
      title: "Equipe de Staff",
      description: "Une équipe compétente et professionnelle, afin de répondre à vos besoins",
      icon: "03",
    },
    {
      title: "Développement",
      description: "Un développement constant et régulier, afin de vous offrir un environnement de jeu optimal",
      icon: "04",
    },
    {
      title: "Événements",
      description: "Des événements réguliers pour vous offrir une expérience de jeu exceptionnelle",
      icon: "05",
    },
    {
      title: "Communauté",
      description: "Une communauté active et engagée, qui vous accompagnera dans votre aventure",
      icon: "06",
    },

  ]

  const handleDiscordLogin = () => {
    window.location.href = "https://discord.gg/newlacity"
  }

    return (
    <section id="experience" className="py-32 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Conçu pour
            <br />
            <span className="text-white">l'excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
            >
              <div className="absolute top-6 right-6 text-4xl font-extralight text-white/10 group-hover:text-white/20 transition-colors duration-500">
                {feature.icon}
              </div>

              <h3 className="text-xl font-light text-white mb-4 group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>

              <div className="mt-6 w-12 h-px bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-8">
            <button onClick={handleDiscordLogin} className="group relative overflow-hidden bg-white text-black px-12 py-4 rounded-full text-sm font-medium transition-all duration-500 hover:scale-105">
              <span className="relative z-10">Commencer</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
