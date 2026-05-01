import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServerSection } from "@/components/server-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"
import { DiscordSection } from "@/components/discord-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-[#022b59]/35 overflow-x-hidden">
      <main>
        <HeroSection />
        <ServerSection />
        <ExperienceSection />
        <DiscordSection />
        <Footer />
      </main>
    </div>
  )
}
