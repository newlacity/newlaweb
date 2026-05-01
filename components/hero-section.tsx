"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    // Initial set
    handleResize()
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleDiscordLogin = () => {
    window.location.href = "https://discord.gg/newlacity"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/home-bg.png')" }}
      ></div>
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(2, 43, 89, 0.15), transparent 40%)`,
        }}
      ></div>

      {/* Geometric elements */}
      <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="relative w-1/2 mx-auto">
            <img 
              src="logo.png" 
              alt="Logo" 
              className="w-full transition-transform duration-300 ease-out"
              style={{
                transform: `
                  perspective(1000px) 
                  rotateX(${(mousePosition.y - windowSize.height / 2) * 0.03}deg) 
                  rotateY(${(mousePosition.x - windowSize.width / 2) * 0.03}deg)
                  scale(${1 + Math.abs(mousePosition.x - windowSize.width / 2) * 0.00012})
                `,
                filter: `drop-shadow(0 0 40px rgba(2, 43, 89, ${0.5 + Math.abs(mousePosition.x - windowSize.width / 2) * 0.0002}))`
              }}
            />
          </div>
          <div className="space-y-4 mb-12">
            <p className="text-2xl md:text-3xl font-extralight text-white/80 tracking-wide">Découvrez une nouvelle vision de <span className="text-white font-medium">Los Angeles</span></p>
            <p className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
              Une ville où les rêves se réalisent, où les gens se rencontrent et où les opportunités sont innombrables.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button onClick={handleDiscordLogin} className="group relative overflow-hidden bg-white text-black px-12 py-4 rounded-full text-sm font-medium transition-all duration-500 hover:scale-105">
            <a href="https://discord.gg/newlacity" className="relative z-10 group-hover:text-white transition-colors duration-300">Rejoindre</a>
            <div className="absolute inset-0 bg-neutral-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>

          <button className="group flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-300">
            <span className="text-sm font-light">Découvrir plus</span>
            <div className="w-8 h-px bg-white/30 group-hover:w-12 group-hover:bg-white transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce"></div>
      </div>
    </section>
  )
}
