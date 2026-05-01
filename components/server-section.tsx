"use client"

import React, { useRef, useEffect, useState } from "react";

export function ServerSection() {
  const steps = [
    {
      title: "Los Angeles : Le glamour et la rue",
      desc:
        "Plongez dans l'univers hollywoodien où le rêve américain rencontre la réalité urbaine. Des plages de Santa Monica aux collines d'Hollywood, chaque district raconte une histoire unique de réussite et de survie.",
      link: { href: "/la-details", label: "En savoir plus →" },
    },
    {
      title: "Los Angeles : Opportunités et ambition",
      desc:
        "Développez votre parcours entre business, criminalité, institutions et vie civile. NEW LA propose un environnement riche pour tous les styles de roleplay, du plus légal au plus intense.",
      link: { href: "/join", label: "Découvrir l'univers →" },
    },
    {
      title: "Un univers, une seule ville",
      desc:
        "Los Angeles est au coeur de l'expérience. Forgez votre destin dans une ville vivante, exigeante et pleine d'opportunités, où chaque décision façonne votre histoire.",
      link: { href: "/join", label: "Rejoindre l'univers →" },
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const lastScroll = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Observer pour activer le scroll jacking quand la section est visible
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    const observer = new window.IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Lock/unlock le scroll du body
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      setIsScrollLocked(true);
      // Scroll pour centrer la section dans la fenêtre
      setTimeout(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const scrollY = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
          window.scrollTo({ top: scrollY, behavior: "smooth" });
        }
      }, 50);
    } else {
      document.body.style.overflow = "";
      setIsScrollLocked(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  // Navigation entre étapes avec la molette et les flèches
  useEffect(() => {
    if (!isScrollLocked) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollTimeout.current) return;
      if (e.deltaY > 0 && activeStep < steps.length - 1) {
        setActiveStep((s) => Math.min(steps.length - 1, s + 1));
      } else if (e.deltaY < 0 && activeStep > 0) {
        setActiveStep((s) => Math.max(0, s - 1));
      } else if (e.deltaY < 0 && activeStep === 0) {
        // On libère le scroll ET on fait défiler la page avant la section
        setIsActive(false);
        setTimeout(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollY = window.scrollY + rect.top - 1;
            window.scrollTo({ top: scrollY, behavior: "smooth" });
          }
        }, 50);
      } else if (e.deltaY > 0 && activeStep === steps.length - 1) {
        // On libère le scroll ET on fait défiler la page après la section
        setIsActive(false);
        setTimeout(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollY = window.scrollY + rect.bottom;
            window.scrollTo({ top: scrollY + 1, behavior: "smooth" });
          }
        }, 50);
      }
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 500);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && activeStep < steps.length - 1) {
        setActiveStep((s) => Math.min(steps.length - 1, s + 1));
      } else if (e.key === "ArrowUp" && activeStep > 0) {
        setActiveStep((s) => Math.max(0, s - 1));
      } else if (e.key === "ArrowUp" && activeStep === 0) {
        setIsActive(false);
        setTimeout(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollY = window.scrollY + rect.top - 1;
            window.scrollTo({ top: scrollY, behavior: "smooth" });
          }
        }, 50);
      } else if (e.key === "ArrowDown" && activeStep === steps.length - 1) {
        setIsActive(false);
        setTimeout(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollY = window.scrollY + rect.bottom;
            window.scrollTo({ top: scrollY + 1, behavior: "smooth" });
          }
        }, 50);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isScrollLocked, activeStep, steps.length]);

  return (
    <section id="server" className="py-32 px-8">
      <div className="container mx-auto max-w-7xl px-8" ref={sectionRef}>
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Los Angeles,
            <br />
            <span className="text-white font-medium">Un univers.</span>
          </h2>
        </div>
        <div className="relative flex flex-row gap-8 min-h-[800px] items-center justify-center">
          {/* Progress Bar verticale à gauche */}
          <div className="relative h-full flex flex-col items-center justify-center mr-8">
            <div className="relative h-80 w-1 bg-white/10 rounded-full flex flex-col items-center">
              <div
                className="absolute left-0 top-0 w-1 bg-white rounded-full transition-all duration-500"
                style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
              ></div>
              {/* Steps markers */}
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                    i <= activeStep
                      ? "bg-white border-white"
                      : "bg-white/10 border-white/30"
                  }`}
                  style={{ top: `${(i / (steps.length - 1)) * 100}%`, transform: "translate(-50%, -50%)" }}
                ></div>
              ))}
            </div>
          </div>

          {/* Étapes verticales */}
          <div className="flex-1 flex flex-col gap-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === activeStep
                    ? "opacity-100 text-white"
                    : "opacity-40 text-zinc-300"
                }`}
                style={{ filter: i === activeStep ? "none" : "blur(0.5px)" }}
              >
                <h3 className="text-2xl md:text-3xl font-medium mb-4">
                  {step.title}
                </h3>
                <p className="font-light text-lg leading-relaxed mb-6">
                  {step.desc}
                </p>
                <a
                  href={step.link.href}
                  className={`font-medium transition-colors ${
                    i === activeStep
                      ? "text-white hover:text-white/80"
                      : "text-white/50 pointer-events-none"
                  }`}
                >
                  {step.link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
