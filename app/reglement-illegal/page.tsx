"use client"

import { useState, useEffect } from "react";
import {
  Users,
  Skull,
  DollarSign,
  Shield,
  AlertTriangle,
  Clock,
  Target,
} from "lucide-react";

const colorClasses = {
  red: "bg-red-500/10 border-red-500/30 text-red-300",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-300",
  yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
  green: "bg-green-500/10 border-green-500/30 text-green-300",
  blue: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  purple: "bg-[#022b59]/10 border-[#022b59]/30 text-[#022b59]",
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
};

const hoverClasses = {
  red: "hover:bg-red-500/20 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20",
  orange: "hover:bg-orange-500/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/20",
  yellow: "hover:bg-yellow-500/20 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20",
  green: "hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20",
  blue: "hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20",
  purple: "hover:bg-[#022b59]/20 hover:border-[#022b59]/50 hover:shadow-lg hover:shadow-[#022b59]/20",
  cyan: "hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20",
};

const ReglementIllegal = () => {
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
      title: "Types d'Activités Criminelles",
      icon: <Skull className="w-6 h-6 text-red-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Crimes autorisés :",
          color: "red",
          items: [
            "Vol simple : Pickpocket, vol de véhicule (selon conditions)",
            "Trafic de drogue : Production, vente et distribution",
            "Braquage : Magasins, banques (avec restrictions horaires)",
            "Extorsion : Racket de commerces ou particuliers",
            "Contrebande : Armes, marchandises illégales",
          ],
        },
        {
          title: "Conditions générales :",
          color: "orange",
          items: [
            "Roleplay réaliste et conséquent obligatoire",
            "Respect des autres joueurs même en situation criminelle",
            "Acceptation des échecs et des arrestations",
            "Éviter les actes gratuits sans motivation RP",
          ],
        },
      ],
    },
    {
      title: "Braquages et Cambriolages",
      icon: <Target className="w-6 h-6 text-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Restrictions horaires :",
          color: "yellow",
          items: [
            "Braquages majeurs : Uniquement entre 20h et 2h du matin",
            "Vols simples : Toute la journée selon le contexte",
            "Cambriolages : Préférablement en l'absence des propriétaires",
            "Interdiction absolue : Pendant les événements serveur",
          ],
        },
        {
          title: "Règles de braquage :",
          color: "red",
          items: [
            "Maximum 4 participants par braquage",
            "Planification et préparation obligatoires",
            "Respect des otages et négociation possible",
            "Fuite réaliste avec plan d'évasion cohérent",
            "Cooldown de 2h minimum entre chaque braquage",
          ],
        },
      ],
    },
    {
      title: "Trafic de Substances",
      icon: <DollarSign className="w-6 h-6 text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Organisation du trafic :",
          color: "green",
          items: [
            "Hiérarchie claire entre producteurs, distributeurs et dealers",
            "Zones de vente définies et respectées entre organisations",
            "Prix cohérents avec l'économie du serveur",
            "Qualité du roleplay dans les transactions",
          ],
        },
        {
          title: "Zones et horaires :",
          color: "orange",
          items: [
            "Vente autorisée principalement dans les quartiers populaires",
            "Éviter les zones gouvernementales et très fréquentées",
            "Activité réduite pendant les heures de pointe",
            "Respect des territoires des autres organisations",
          ],
        },
      ],
    },
    {
      title: "Interactions Police/Criminels",
      icon: <Shield className="w-6 h-6 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Règles d'engagement :",
          color: "blue",
          items: [
            "Respect mutuel entre joueurs malgré l'opposition RP",
            "Roleplay réaliste lors des arrestations et interrogatoires",
            "Possibilité de négociation et de corruption selon le contexte",
            "Acceptation des procédures judiciaires",
          ],
        },
        {
          title: "Poursuites et évasions :",
          color: "purple",
          items: [
            "Conduite réaliste lors des poursuites automobiles",
            "Respect de la sécurité des autres joueurs",
            "Évasions créatives mais cohérentes",
            "Prise d'otages exceptionnelle et justifiée",
          ],
        },
      ],
    },
    {
      title: "Gangs et Organisations",
      icon: <Clock className="w-6 h-6 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Structure organisationnelle :",
          color: "cyan",
          items: [
            "Chef/Boss : Direction générale de l'organisation",
            "Lieutenant : Responsable d'activités spécifiques",
            "Soldat : Exécutant expérimenté",
            "Associé : Membre récent en probation",
          ],
        },
        {
          title: "Règles internes :",
          color: "red",
          items: [
            "Code d'honneur et règles de conduite claires",
            "Sanctions internes pour les manquements",
            "Protection des membres loyaux",
            "Gestion des conflits avec les organisations rivales",
          ],
        },
        {
          title: "Activités collectives :",
          color: "orange",
          items: [
            "Planification d'opérations d'envergure",
            "Contrôle de territoires et d'activités lucratives",
            "Alliances et guerres avec d'autres organisations",
            "Blanchiment d'argent et investissements légaux",
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
            <Users className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="transform transition-transform duration-300 group-hover:translate-x-2">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-[#022b59]200 bg-clip-text text-transparent">
              Règlement Illégal
            </h1>
            <p className="text-[#022b59] text-lg transform transition-all duration-300 group-hover:text-[#022b59]">
              Activités criminelles et organisations illégales
            </p>
          </div>
        </div>

        {/* Avertissement haut animé */}
        <div className="p-5 border-l-4 rounded-xl bg-red-500/10 border-red-500/30 mb-20 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-red-500/20 hover:bg-red-500/15 group cursor-pointer animate-fade-in">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold text-red-300 transition-colors duration-300 group-hover:text-red-200">Avertissement Important</span>
          </div>
          <p className="text-sm text-red-200 transition-colors duration-300 group-hover:text-red-100">
            Les activités illégales comportent des risques réels en jeu. Assumez pleinement les conséquences 
            de vos actions criminelles et respectez le roleplay des forces de l'ordre.
          </p>
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
        <div className="mt-20 p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-white transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-red-500/20 hover:bg-red-500/15 group cursor-pointer">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-400 mr-3 mt-0.5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
            <div>
              <strong className="transition-colors duration-300 group-hover:text-red-100">
                Rappel crucial :
              </strong>{" "}
              <span className="transition-colors duration-300 group-hover:text-white/90">
                Toutes les activités illégales doivent être roleplayées avec réalisme 
                et maturité. Les conséquences de vos actes (prison, amendes, mort) font partie intégrante de l'expérience 
                et doivent être acceptées sans contestation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReglementIllegal; 