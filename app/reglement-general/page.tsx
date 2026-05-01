"use client"

import { useState, useEffect } from "react";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

const colorClasses = {
  green: "bg-green-500/10 border-green-500/30 text-green-300",
  red: "bg-red-500/10 border-red-500/30 text-red-300",
  blue: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-300"
};

const hoverClasses = {
  green: "hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20",
  red: "hover:bg-red-500/20 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20",
  blue: "hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20",
  yellow: "hover:bg-yellow-500/20 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20",
  orange: "hover:bg-orange-500/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/20"
};

const ReglementGeneral = () => {
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
      title: "Respect et Comportement",
      icon: <CheckCircle className="w-6 h-6 text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Comportements autorisés :",
          color: "green",
          items: [
            "Respecter tous les joueurs, peu importe leur niveau ou expérience",
            "Utiliser un langage approprié et respectueux",
            "Aider les nouveaux joueurs à s'intégrer",
            "Signaler les comportements inappropriés à l'administration"
          ]
        },
        {
          title: "Comportements interdits :",
          color: "red",
          items: [
            "Harcèlement sous toutes ses formes",
            "Propos discriminatoires (racisme, sexisme, homophobie, etc.)",
            "Insultes et provocations gratuites",
            "Spam ou flood dans les chats",
            "Divulgation d'informations personnelles"
          ]
        }
      ]
    },
    {
      title: "Règles de Roleplay",
      icon: <Info className="w-6 h-6 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Fondamentaux du RP :",
          color: "blue",
          items: [
            "Restez en personnage en permanence en ville",
            "Développez une histoire cohérente pour votre personnage",
            "Respectez la chronologie et la continuité des événements",
            "Adaptez vos actions aux circonstances du roleplay"
          ]
        },
        {
          title: "Qualité du roleplay :",
          color: "orange",
          items: [
            "Privilégiez la qualité à la quantité dans vos actions",
            "Laissez du temps aux autres pour réagir",
            "Évitez les actions répétitives ou sans sens",
            "Acceptez les conséquences de vos actions"
          ]
        }
      ]
    },
    {
      title: "Métagaming et Powergaming",
      icon: <XCircle className="w-6 h-6 text-red-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Métagaming (Interdit) :",
          color: "red",
          items: [
            "Utiliser des informations obtenues hors du jeu (Discord, streams, etc.)",
            "Connaître le nom d'un joueur sans présentation RP",
            "Agir sur des informations que votre personnage ne peut pas connaître",
            "Utiliser l'interface de jeu pour obtenir des informations RP"
          ]
        },
        {
          title: "Powergaming (Interdit) :",
          color: "red",
          items: [
            "Forcer des actions sur d'autres joueurs sans leur consentement",
            "Ignorer les blessures ou la fatigue de votre personnage",
            "Effectuer des actions physiquement impossibles",
            "Refuser systématiquement la mort de votre personnage"
          ]
        }
      ]
    },
    {
      title: "Règles de Communication",
      icon: <Info className="w-6 h-6 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Communication vocale :",
          color: "blue",
          items: [
            "Utilisez un micro de qualité correcte",
            "Respectez la portée réaliste de la voix",
            "Évitez les bruits parasites et la musique",
            "Coupez votre micro quand vous ne parlez pas en RP"
          ]
        },
        {
          title: "Communications hors roleplay :",
          color: "yellow",
          items: [
            "Utilisez /ooc avec parcimonie et uniquement pour des clarifications",
            "Les discussions OOC prolongées doivent se faire en privé",
            "Respectez les canaux Discord appropriés",
            "Ne mélangez jamais IC et OOC"
          ]
        }
      ]
    },
    {
      title: "Système de Sanctions",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Échelle des sanctions :",
          color: "yellow",
          items: [
            "🟢 Avertissement verbal - Infractions mineures",
            "🟡 Avertissement écrit - Récidive ou infraction modérée",
            "🟠 Kick temporaire - 1h à 7 jours",
            "🔴 Bannissement - 1 semaine à permanent"
          ]
        }
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#1C1C1B] text-white font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* En-tête animé */}
        <div className="flex items-center mb-14 group animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-[#022b59] flex items-center justify-center mr-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-[#022b59]/30">
            <FileText className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="transform transition-transform duration-300 group-hover:translate-x-2">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-[#022b59]200 bg-clip-text text-transparent">
              Règlement Général
            </h1>
            <p className="text-[#022b59] text-lg transform transition-all duration-300 group-hover:text-[#022b59]">
              Les règles fondamentales de NEW LA
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
        <div className="mt-20 p-6 bg-[#022b59]/10 border border-[#022b59]/30 rounded-xl text-[#022b59] text-white transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#022b59]/20 hover:bg-[#022b59]/15 group cursor-pointer">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-[#022b59] mr-3 mt-0.5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
            <div>
              <strong className="transition-colors duration-300 group-hover:text-[#022b59]">
                Note importante :
              </strong>{" "}
              <span className="transition-colors duration-300 group-hover:text-white/90">
                Ce règlement est évolutif et peut être modifié à tout moment. Les joueurs sont tenus de se tenir informés des mises à jour via les annonces officielles.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReglementGeneral; 