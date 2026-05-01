"use client"

import { useState, useEffect } from "react";
import {
  Video,
  Shield,
  Settings,
  Camera,
  Users,
  Mic,
  AlertTriangle
} from "lucide-react";

const colorClasses = {
  blue: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  purple: "bg-[#022b59]/10 border-[#022b59]/30 text-[#022b59]",
  green: "bg-green-500/10 border-green-500/30 text-green-300",
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  pink: "bg-pink-500/10 border-pink-500/30 text-pink-300",
  yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-300"
};

const hoverClasses = {
  blue: "hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20",
  purple: "hover:bg-[#022b59]/20 hover:border-[#022b59]/50 hover:shadow-lg hover:shadow-[#022b59]/20",
  green: "hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20",
  cyan: "hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20",
  pink: "hover:bg-pink-500/20 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/20",
  yellow: "hover:bg-yellow-500/20 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20",
  orange: "hover:bg-orange-500/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/20"
};

const ReglementStreamer = () => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [expandedBlocs, setExpandedBlocs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
            setVisibleSections(prev => new Set([...prev, sectionIndex]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleBloc = (blocId: string) => {
    setExpandedBlocs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(blocId)) {
        newSet.delete(blocId);
      } else {
        newSet.add(blocId);
      }
      return newSet;
    });
  };

  const sections = [
    {
      title: "Déclaration et Statut de Streamer",
      icon: <Settings className="w-6 h-6 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Procédure de déclaration",
          color: "blue",
          items: [
            "Déclaration obligatoire auprès de l'administration",
            "Fourniture des liens de chaînes de streaming",
            "Justification du projet de contenu",
            "Engagement à respecter les règles du serveur",
            "Validation par l'équipe de modération",
          ],
        },
        {
          title: "Avantages du statut",
          color: "green",
          items: [
            "Accès à des zones réservées pour le contenu",
            "Support technique pour l'optimisation",
            "Visibilité sur les réseaux sociaux du serveur",
            "Possibilité d'organiser des événements spéciaux",
          ],
        },
      ],
    },
    {
      title: "Respect de la Vie Privée",
      icon: <Shield className="w-6 h-6 text-[#022b59] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Consentement obligatoire",
          color: "purple",
          items: [
            "Demande d'autorisation avant de filmer un joueur",
            "Respect du droit à l'image de tous les participants",
            "Floutage automatique des joueurs non consentants",
            "Interdiction de diffuser des informations personnelles",
          ],
        },
        {
          title: "Zones sensibles",
          color: "yellow",
          items: [
            "Interdiction de filmer dans les zones privées",
            "Respect des espaces de roleplay intime",
            "Éviter les zones d'administration et de modération",
            "Demande d'autorisation pour les événements privés",
          ],
        },
      ],
    },
    {
      title: "Qualité et Contenu Approprié",
      icon: <Camera className="w-6 h-6 text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Standards de contenu",
          color: "green",
          items: [
            "Contenu de qualité et respectueux de la communauté",
            "Éviter les contenus choquants ou inappropriés",
            "Respect des règles de la plateforme de streaming",
            "Maintien d'une image positive du serveur",
          ],
        },
        {
          title: "Interdictions",
          color: "orange",
          items: [
            "Pas de contenu à caractère sexuel ou violent",
            "Interdiction de montrer des bugs ou exploits",
            "Pas de divulgation d'informations sensibles",
            "Éviter les contenus qui nuisent à l'expérience RP",
          ],
        },
      ],
    },
    {
      title: "Gestion des Interactions",
      icon: <Users className="w-6 h-6 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Immersion roleplay",
          color: "cyan",
          items: [
            "Respect de l'immersion des autres joueurs",
            "Éviter de briser le roleplay pour le contenu",
            "Intégration naturelle dans les situations RP",
            "Respect des règles de métagaming",
          ],
        },
        {
          title: "Gestion de la communauté",
          color: "blue",
          items: [
            "Modération appropriée du chat de stream",
            "Réponse respectueuse aux questions des viewers",
            "Encouragement à rejoindre le serveur de manière positive",
            "Gestion des conflits avec maturité",
          ],
        },
      ],
    },
    {
      title: "Outils de Streaming",
      icon: <Mic className="w-6 h-6 text-pink-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Configuration technique",
          color: "pink",
          items: [
            "Utilisation d'outils de floutage automatique",
            "Configuration des overlays appropriés",
            "Optimisation des performances pour éviter le lag",
            "Sauvegarde des streams en cas de problème",
          ],
        },
        {
          title: "Équipement recommandé",
          color: "yellow",
          items: [
            "Micro de qualité pour une bonne communication",
            "Caméra optionnelle pour le facecam",
            "Logiciels de streaming à jour",
            "Connexion internet stable",
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#1C1C1B] text-white font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* En-tête animé */}
        <div className="flex items-center mb-14 group animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-[#022b59] flex items-center justify-center mr-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-[#022b59]/30">
            <Video className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="transform transition-transform duration-300 group-hover:translate-x-2">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-[#022b59]200 bg-clip-text text-transparent">
              Règlement Streamer
            </h1>
            <p className="text-[#022b59] text-lg transform transition-all duration-300 group-hover:text-[#022b59]">
              Règles pour les créateurs de contenu et streamers
            </p>
          </div>
        </div>

        {/* Sections avec animations progressives */}
        <div className="space-y-20">
          {sections.map((section, index) => (
            <div 
              key={index}
              data-section={index}
              className={`transform transition-all duration-700 ${
                visibleSections.has(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h2 className="text-3xl font-semibold mb-6 flex items-center border-b border-[#022b59]/20 pb-2 group cursor-pointer hover:border-[#022b59]/40 transition-all duration-300">
                <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {section.icon}
                </div>
                <span className="ml-3 transition-all duration-300 group-hover:text-[#022b59] group-hover:translate-x-1">
                  {section.title}
                </span>
              </h2>
              
              <div className="space-y-6">
                {section.blocs.map((bloc, i) => {
                  const blocId = `${index}-${i}`;
                  const isExpanded = expandedBlocs.has(blocId);
                  
                  return (
                    <div
                      key={i}
                      className={`p-5 border-l-4 rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
                        colorClasses[bloc.color as keyof typeof colorClasses]
                      } ${
                        hoverClasses[bloc.color as keyof typeof hoverClasses]
                      } ${
                        isExpanded ? 'ring-2 ring-white/20 scale-[1.01]' : ''
                      }`}
                      onClick={() => toggleBloc(blocId)}
                      style={{ 
                        animationDelay: `${(index * 200) + (i * 100)}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      <h3 className="font-bold mb-3 flex items-center justify-between group">
                        <span className="transition-colors duration-300 group-hover:text-white">
                          {bloc.title}
                        </span>
                        <div className={`w-5 h-5 transform transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}>
                          <div className="w-full h-0.5 bg-current transform transition-all duration-300"></div>
                          <div className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                            isExpanded ? 'rotate-0 opacity-0' : 'rotate-90 -translate-y-0.5'
                          }`}></div>
                        </div>
                      </h3>
                      
                      <div className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-24 opacity-70'
                      }`}>
                        <ul className="list-disc list-inside space-y-2 text-white">
                          {bloc.items.map((item, j) => (
                            <li 
                              key={j} 
                              className={`transform transition-all duration-300 hover:translate-x-2 hover:text-white/90 ${
                                isExpanded 
                                  ? 'translate-y-0 opacity-100' 
                                  : j >= 2 ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                              }`}
                              style={{ 
                                transitionDelay: isExpanded ? `${j * 50}ms` : '0ms' 
                              }}
                            >
                              <span className="relative">
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-30"></span>
                              </span>
                            </li>
                          ))}
                        </ul>
                        
                        {!isExpanded && bloc.items.length > 2 && (
                          <div className="mt-2 text-sm opacity-60 italic animate-pulse">
                            Cliquez pour voir plus...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Avertissement final animé */}
        <div className="mt-20 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-200 text-white transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500/15 group cursor-pointer">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-blue-400 mr-3 mt-0.5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
            <div>
              <strong className="transition-colors duration-300 group-hover:text-blue-100">
                Note importante :
              </strong>{" "}
              <span className="transition-colors duration-300 group-hover:text-white/90">
                Les streamers sont des ambassadeurs du serveur. Votre comportement et votre contenu reflètent 
                directement l'image de NEW LA. Respectez toujours les règles et privilégiez la qualité du roleplay.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReglementStreamer; 