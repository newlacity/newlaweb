"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { ChevronDown } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSubHeader, setShowSubHeader] = useState(false);
  const [subHeaderAnimated, setSubHeaderAnimated] = useState(false);
  const [isReglementDropdownOpen, setIsReglementDropdownOpen] = useState(false);
  const [isNousRejoindreOpen, setIsNousRejoindreOpen] = useState(false);
  const subHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Désactiver le subheader sur les pages blog
      const isBlogPage = window.location.pathname.startsWith("/blog");
      setShowSubHeader(window.scrollY > 120 && !isBlogPage);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showSubHeader) {
      setSubHeaderAnimated(false);
      setTimeout(() => setSubHeaderAnimated(true), 500);
    }
  }, [showSubHeader]);

  useEffect(() => {
    setIsReglementDropdownOpen(false);
    setIsNousRejoindreOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Sub-header sticky qui apparaît au scroll */}
      {showSubHeader && (
        <div
          ref={subHeaderRef}
          className={`fixed top-0 left-1/2 transform ${subHeaderAnimated ? "-translate-x-1/2 mt-5" : "translate-x-0"} w-full sm:w-2/3 md:w-1/2 max-w-2xl z-[100] bg-neutral-900/20 border-b border-white/10 backdrop-blur flex items-center justify-between gap-8 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 rounded-full`}
          style={{
            animation: "subHeaderFadeIn 0.5s cubic-bezier(0.4,0,0.2,0.5) ",
          }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          </Link>
          <Link
            href="https://discord.gg/newlacity"
            className="bg-white text-black font-semibold px-4 py-2 rounded-full shadow hover:bg-neutral-200 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      )}
      {/* Header principal */}
      <header
        className={`relative z-50 transition-all duration-700 bg-gradient-to-b from-black/70 via-black/35 to-transparent`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="group">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
              <Link
                href="/blog"
                className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Guide</span>
              </Link>
              <Link
                href="/catalogue"
                className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Catalogue</span>
              </Link>
              <Link
                href="/boutique"
                className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Boutique</span>
              </Link>

              {/* Règlement Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsReglementDropdownOpen(!isReglementDropdownOpen);
                    setIsNousRejoindreOpen(false);
                  }}
                  className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>Règlement</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isReglementDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isReglementDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-neutral-900/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm z-50">
                    <div className="py-2">
                      <Link
                        href="/reglement-general"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsReglementDropdownOpen(false)}
                      >
                        Règlement Général
                      </Link>
                      <Link
                        href="/reglement-illegal"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsReglementDropdownOpen(false)}
                      >
                        Règlement Illégal
                      </Link>
                      <Link
                        href="/reglement-societes"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsReglementDropdownOpen(false)}
                      >
                        Règlement Sociétés
                      </Link>
                      <Link
                        href="/reglement-streamer"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsReglementDropdownOpen(false)}
                      >
                        Règlement Streamer
                      </Link>
                      <Link
                        href="/reglement-faction"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsReglementDropdownOpen(false)}
                      >
                        Règlement Faction
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Nous rejoindre : whitelist + dépôts */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsNousRejoindreOpen(!isNousRejoindreOpen);
                    setIsReglementDropdownOpen(false);
                  }}
                  className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>Nous rejoindre</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isNousRejoindreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isNousRejoindreOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-neutral-900/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm z-50">
                    <div className="py-2">
                      <Link
                        href="/whitelist"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsNousRejoindreOpen(false)}
                      >
                        Passer sa whitelist
                      </Link>
                      <div className="my-1 border-t border-white/10" />
                      <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/45">
                        Dépôt de dossier
                      </p>
                      <Link
                        href="/depot-dossier/legal"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsNousRejoindreOpen(false)}
                      >
                        Légal
                      </Link>
                      <Link
                        href="/depot-dossier/illegal"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsNousRejoindreOpen(false)}
                      >
                        Illégal
                      </Link>
                      <Link
                        href="/depot-dossier/staff"
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setIsNousRejoindreOpen(false)}
                      >
                        Staff
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <button className="group relative overflow-hidden bg-white text-black px-4 lg:px-6 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 hover:scale-105">
                <a href="https://discord.gg/newlacity" className="relative z-10">
                  Se connecter
                </a>
                <div className="absolute inset-0 bg-neutral-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute top-1.5 left-0 w-5 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-2.5 left-0 w-5 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-3.5 left-0 w-5 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-8 space-y-4">
            <Link
              href="/#experience"
              className="flex items-center space-x-4 text-white/60 hover:text-white transition-all duration-300 text-lg font-light p-3 rounded-lg hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Experience</span>
            </Link>
            <Link
              href="/#community"
              className="flex items-center space-x-4 text-white/60 hover:text-white transition-all duration-300 text-lg font-light p-3 rounded-lg hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Community</span>
            </Link>
            <Link
              href="/boutique"
              className="flex items-center space-x-4 text-white/60 hover:text-white transition-all duration-300 text-lg font-light p-3 rounded-lg hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Boutique</span>
            </Link>

            {/* Nous rejoindre Mobile */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4 text-white/60 text-lg font-light p-3">
                <span>Nous rejoindre</span>
              </div>
              <div className="ml-4 space-y-2">
                <Link
                  href="/whitelist"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Passer sa whitelist
                </Link>
                <p className="px-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-white/40">
                  Dépôt de dossier
                </p>
                <Link
                  href="/depot-dossier/legal"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Légal
                </Link>
                <Link
                  href="/depot-dossier/illegal"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Illégal
                </Link>
                <Link
                  href="/depot-dossier/staff"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Staff
                </Link>
              </div>
            </div>

            {/* Règlement Mobile */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4 text-white/60 text-lg font-light p-3">
                <span>Règlement</span>
              </div>
              <div className="ml-4 space-y-2">
                <Link
                  href="/reglement-general"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Règlement Général
                </Link>
                <Link
                  href="/reglement-illegal"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Règlement Illégal
                </Link>
                <Link
                  href="/reglement-societes"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Règlement Sociétés
                </Link>
                <Link
                  href="/reglement-streamer"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Règlement Streamer
                </Link>
                <Link
                  href="/reglement-faction"
                  className="block text-white/50 hover:text-white transition-all duration-300 text-sm font-light p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Règlement Faction
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="#"
                className="flex items-center space-x-4 text-white/60 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-white/5"
              >
                <FontAwesomeIcon icon={faDiscord} className="w-6 h-6" />
                <span>Discord</span>
              </Link>
            </div>
            <button className="w-full bg-white text-black py-4 rounded-full text-sm font-medium mt-6 hover:scale-105 transition-transform duration-300">
              Connect
            </button>
          </nav>
        </div>
      </header>
      <style jsx global>{`
        @keyframes subHeaderFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-100%) translateX(-50%);
          }
          100% {
            opacity: 1;
            transform: translateY(-90%) translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
