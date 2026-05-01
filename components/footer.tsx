import Link from "next/link"
import { MessageCircle, Users, Globe, Mail, ArrowRight, Youtube } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
                <img src="/logo.png" alt="NEWLA" className="w-20 h-20" />
                <span className="text-4xl font-extralight text-white tracking-tight font-">NEW LA<span className="text-[#022b59] font-medium"> CITY</span></span>
            </div>
            <p className="text-white/60 font-light text-lg leading-relaxed mb-8 max-w-lg">
              Plongez dans l'univers ultime du roleplay FiveM a Los Angeles. 
              Rejoignez des milliers de joueurs dans une expérience immersive unique.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: faDiscord, href: "https://discord.gg/newlawl", label: "Discord" },
                { icon: faTiktok, href: "#", label: "Community" },
                { icon: faYoutube, href: "#", label: "Contact" },
              ].map((social, index) => (
                <Link 
                  key={index}
                  href={social.href} 
                  className="group relative w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#022b59]/30 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5 text-white/60 group-hover:text-[#022b59] transition-colors" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6 tracking-tight">Navigation</h3>
            <ul className="space-y-4">
              {[
                { href: "https://newlacity.gitbook.io/newlacity", label: "Wiki" },
                { href: "/blog", label: "Guide" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/whitelist", label: "Whitelist" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-white/60 hover:text-[#022b59] font-light transition-colors duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6 tracking-tight">Communauté</h3>
            <ul className="space-y-4">
              {[
                { href: "https://discord.gg/newlawl", label: "Discord" },
                { href: "https://discord.gg/newlawl", label: "Support" },
                { href: "https://discord.gg/newlawl", label: "Candidatures Staff" },
                { href: "https://boutique.newlacity.fr", label: "Boutique" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-white/60 hover:text-[#022b59] font-light transition-colors duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-white/40 font-light text-sm">
              © 2025 NEW LA FiveM Server. Tous droits réservés.
            </p>
            <div className="flex space-x-8">
              {[
                { href: "/contact", label: "Contact" },
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/conditions-d-utilisation", label: "Conditions d'utilisation" },
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-white/40 hover:text-[#022b59] font-light text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
