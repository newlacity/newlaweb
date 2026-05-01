"use client"

import { useState, useEffect } from "react";
import {
  Building,
  FileText,
  DollarSign,
  Users,
  Scale,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const colorClasses = {
  green: "bg-green-500/10 border-green-500/30 text-green-300",
  red: "bg-red-500/10 border-red-500/30 text-red-300",
  blue: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-300",
  purple: "bg-[#022b59]/10 border-[#022b59]/30 text-[#022b59]",
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
};

const hoverClasses = {
  green: "hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20",
  red: "hover:bg-red-500/20 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20",
  blue: "hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20",
  yellow: "hover:bg-yellow-500/20 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20",
  orange: "hover:bg-orange-500/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/20",
  purple: "hover:bg-[#022b59]/20 hover:border-[#022b59]/50 hover:shadow-lg hover:shadow-[#022b59]/20",
  cyan: "hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
};

const ReglementSocietes = () => {
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
      title: "Création et Enregistrement",
      icon: <FileText className="w-6 h-6 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Procédure de création",
          color: "blue",
          items: [
            "Dépôt d'un dossier complet auprès de l'administration",
            "Business plan détaillé avec objectifs et projections",
            "Justification roleplay de la création de l'entreprise",
            "Preuve de financement initial (capital de départ)",
            "Localisation et description des installations",
          ],
        },
        {
          title: "Documents requis",
          color: "green",
          items: [
            "Statuts de la société et règlement intérieur",
            "Liste des associés et répartition des parts",
            "Description détaillée de l'activité commerciale",
            "Plan de recrutement et politique salariale",
          ],
        },
      ],
    },
    {
      title: "Ressources Humaines",
      icon: <Users className="w-6 h-6 text-[#022b59] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Recrutement",
          color: "purple",
          items: [
            "Processus de recrutement transparent et équitable",
            "Entretiens d'embauche roleplayés obligatoires",
            "Période d'essai de 72h minimum avant confirmation",
            "Formation appropriée pour chaque nouveau poste",
          ],
        },
        {
          title: "Conditions de travail",
          color: "orange",
          items: [
            "Horaires de travail réalistes et respectés",
            "Salaires versés régulièrement selon les accords",
            "Respect des droits des employés",
            "Procédures disciplinaires justes et documentées",
          ],
        },
        {
          title: "Hiérarchie d'entreprise",
          color: "yellow",
          items: [
            "PDG/Directeur : Direction générale et stratégie",
            "Manager : Gestion opérationnelle quotidienne",
            "Superviseur : Encadrement d'équipe",
            "Employé confirmé : Expérience et autonomie",
            "Stagiaire/Apprenti : Formation et apprentissage",
          ],
        },
      ],
    },
    {
      title: "Respect de la Légalité",
      icon: <Scale className="w-6 h-6 text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Obligations légales",
          color: "green",
          items: [
            "Respect de toutes les lois en vigueur sur le serveur",
            "Déclaration correcte des revenus et paiement des taxes",
            "Licences et autorisations nécessaires à jour",
            "Coopération avec les forces de l'ordre si nécessaire",
          ],
        },
        {
          title: "Activités interdites",
          color: "red",
          items: [
            "Blanchiment d'argent ou évasion fiscale",
            "Emploi de personnel sans contrat légal",
            "Vente de produits contrefaits ou dangereux",
            "Corruption d'agents publics",
          ],
        },
      ],
    },
    {
      title: "Concurrence et Économie",
      icon: <TrendingUp className="w-6 h-6 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Concurrence loyale",
          color: "cyan",
          items: [
            "Respect des autres entreprises du même secteur",
            "Prix de vente équitables et compétitifs",
            "Innovation et amélioration continue des services",
            "Collaboration possible sur certains projets",
          ],
        },
        {
          title: "Pratiques régulées",
          color: "yellow",
          items: [
            "Interdiction des monopoles abusifs",
            "Contrôle des fusions et acquisitions importantes",
            "Surveillance des pratiques anticoncurrentielles",
            "Protection des petits commerçants",
          ],
        },
      ],
    },
    {
      title: "Finances et Comptabilité",
      icon: <DollarSign className="w-6 h-6 text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      blocs: [
        {
          title: "Gestion des finances",
          color: "green",
          items: [
            "Tenue d'une comptabilité claire et transparente",
            "Séparation des comptes personnels et professionnels",
            "Justification de toutes les transactions importantes",
            "Réserves financières pour assurer la pérennité",
          ],
        },
        {
          title: "Investissements",
          color: "blue",
          items: [
            "Planification des investissements à moyen terme",
            "Évaluation des risques avant tout engagement",
            "Diversification des activités si approprié",
            "Consultation des associés pour les gros investissements",
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
            <Building className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="transform transition-transform duration-300 group-hover:translate-x-2">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-[#022b59]200 bg-clip-text text-transparent">
              Règlement Sociétés
            </h1>
            <p className="text-[#022b59] text-lg transform transition-all duration-300 group-hover:text-[#022b59]">
              Gestion des entreprises et activités commerciales
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
                Information importante :
              </strong>{" "}
              <span className="transition-colors duration-300 group-hover:text-white/90">
                Les propriétaires d'entreprises sont entièrement responsables de leurs activités commerciales et de leurs employés. 
                Toute violation du règlement peut entraîner la fermeture définitive de l'entreprise.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReglementSocietes; 