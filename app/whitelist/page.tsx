"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Trophy,
  LogOut,
} from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "Quels comportements sont autorisés ?",
    options: [
      "Respecter les joueurs et favoriser l'immersion RP",
      "Insulter OOC",
      "Forcer les joueurs à agir contre leur volonté",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "Quels comportements sont interdits ?",
    options: ["Powergaming", "Metagaming", "Freekill", "Tous les précédents"],
    correct: 3,
  },
  {
    id: 3,
    question: "Pourquoi faut-il rester en personnage (IC) ?",
    options: [
      "Pour éviter les bugs",
      "Pour préserver l'immersion RP",
      "Pour gagner plus d'argent",
    ],
    correct: 1,
  },
  {
    id: 4,
    question: "Quel langage est recommandé en jeu ?",
    options: [
      "Adapté au RP et respectueux",
      "Argot, insultes IRL",
      "Aucun filtre",
    ],
    correct: 0,
  },
  {
    id: 5,
    question: "Pourquoi aider les nouveaux joueurs ?",
    options: [
      "Pour avoir plus d'amis",
      "Pour renforcer la communauté et l'immersion",
      "Pour obtenir des récompenses",
    ],
    correct: 1,
  },
  {
    id: 6,
    question: "Quelles sanctions existent ?",
    options: [
      "Avertissement",
      "Jail RP / kick",
      "Ban temporaire ou permanent",
      "Toutes",
    ],
    correct: 3,
  },
  {
    id: 7,
    question: "Qu'est-ce que le powergaming ?",
    options: [
      "Utiliser des infos hors RP",
      "Faire des actions irréalistes ou impossibles",
      "Tuer sans raison",
    ],
    correct: 1,
  },
  {
    id: 8,
    question: "Exemple de metagaming :",
    options: [
      "Lire le chat Twitch et l'utiliser en RP",
      "Négocier avec un PNJ",
      "Se cacher derrière une voiture",
    ],
    correct: 0,
  },
  {
    id: 9,
    question: "Pourquoi privilégier la qualité du RP ?",
    options: [
      "Pour gagner plus d'argent",
      "Pour enrichir les scènes et l'immersion",
      "Pour raccourcir les scènes",
    ],
    correct: 1,
  },
  {
    id: 10,
    question: "Que faire si vous voyez un comportement inapproprié ?",
    options: ["Insulter le joueur", "Le signaler à un staff", "Se venger"],
    correct: 1,
  },
  {
    id: 11,
    question: "Activités criminelles autorisées ?",
    options: ["Braquages", "Trafic de drogues", "Kidnapping RP", "Toutes"],
    correct: 3,
  },
  {
    id: 12,
    question: "Les braquages majeurs sont possibles :",
    options: ["N'importe quand", "À certaines heures définies", "Jamais"],
    correct: 1,
  },
  {
    id: 13,
    question: "Cooldown entre deux braquages :",
    options: ["10 minutes", "1 heure", "Selon le règlement (ex. 2h)"],
    correct: 2,
  },
  {
    id: 14,
    question: "Nombre max de participants à un braquage ?",
    options: ["3", "6", "10"],
    correct: 1,
  },
  {
    id: 15,
    question: "Lors d'un crime, il est interdit de :",
    options: [
      "Improviser",
      "Faire des actes gratuits (free kill, torture inutile)",
      "Négocier avec la police",
    ],
    correct: 1,
  },
  {
    id: 16,
    question: "Une évasion doit être :",
    options: ["Rapide et incohérente", "Réaliste et préparée", "Impossible"],
    correct: 1,
  },
  {
    id: 17,
    question: "Une organisation criminelle doit avoir :",
    options: ["Une hiérarchie", "Tous au même grade", "Pas de structure"],
    correct: 0,
  },
  {
    id: 18,
    question: "Lors d'une arrestation RP :",
    options: [
      "Coopérer et jouer la scène",
      "Quitter le serveur",
      "Insulter la police OOC",
    ],
    correct: 0,
  },
  {
    id: 19,
    question: "Un braquage doit inclure :",
    options: ["Planification", "Négociation", "Fuite réaliste", "Tous"],
    correct: 3,
  },
  {
    id: 20,
    question: "Les factions criminelles doivent :",
    options: [
      "Respecter un code d'honneur interne",
      "Pouvoir tout faire librement",
      "Jouer solo",
    ],
    correct: 0,
  },
  {
    id: 21,
    question: "Pour créer une entreprise, il faut :",
    options: [
      "Faire un dossier",
      "Payer en jeu seulement",
      "Demander à un ami",
    ],
    correct: 0,
  },
  {
    id: 22,
    question: "Un dossier de société doit inclure :",
    options: ["Nom, activité, finances prévues", "Juste le nom", "Rien"],
    correct: 0,
  },
  {
    id: 23,
    question: "Durée minimale d'une période d'essai ?",
    options: [
      "1 jour",
      "Selon le règlement (ex. 1 semaine)",
      "Pas obligatoire",
    ],
    correct: 1,
  },
  {
    id: 24,
    question: "Hiérarchie en entreprise :",
    options: ["PDG / Manager / Employé", "Tous égaux", "PDG seulement"],
    correct: 0,
  },
  {
    id: 25,
    question: "Obligations légales des entreprises ?",
    options: [
      "Respecter les lois RP",
      "Frauder pour survivre",
      "Ne rien déclarer",
    ],
    correct: 0,
  },
  {
    id: 26,
    question: "Activités interdites pour les sociétés ?",
    options: ["Monopole abusif", "Blanchiment illégal", "Les deux"],
    correct: 2,
  },
  {
    id: 27,
    question: "La concurrence doit être :",
    options: ["Loyale", "Inexistante", "Illimitée"],
    correct: 0,
  },
  {
    id: 28,
    question: "Exemple de pratique régulée :",
    options: [
      "Fusion d'entreprises",
      "Employer des PNJ",
      "Recruter sans contrat",
    ],
    correct: 0,
  },
  {
    id: 29,
    question: "Comptes perso et pro doivent être :",
    options: ["Mélangés", "Séparés", "Oubliés"],
    correct: 1,
  },
  {
    id: 30,
    question: "Bonne gestion financière =",
    options: [
      "Comptabilité et justification",
      "Dépenser sans compter",
      "Cacher l'argent",
    ],
    correct: 0,
  },
  {
    id: 31,
    question: "Différence des sanctions général / illégal ?",
    options: [
      "Général = avertissements/staff ; Illégal = conséquences RP",
      "Les deux identiques",
      "Aucun suivi",
    ],
    correct: 0,
  },
  {
    id: 32,
    question: "Le réalisme est exigé :",
    options: ["En général uniquement", "Dans général et illégal", "Nulle part"],
    correct: 1,
  },
  {
    id: 33,
    question: "La planification est clé :",
    options: ["Pour les crimes", "Pour les sociétés", "Les deux"],
    correct: 2,
  },
  {
    id: 34,
    question: "Importance de la hiérarchie :",
    options: ["Dans les entreprises", "Dans les gangs", "Les deux"],
    correct: 2,
  },
  {
    id: 35,
    question: "Règles internes influencent le RP :",
    options: ["Vrai", "Faux"],
    correct: 0,
  },
  {
    id: 36,
    question: "La coopération est utile :",
    options: [
      "Aider les nouveaux joueurs",
      "Organiser une faction",
      "Les deux",
    ],
    correct: 2,
  },
  {
    id: 37,
    question: "Transparence est essentielle :",
    options: ["Dans les sociétés", "Dans les sanctions", "Les deux"],
    correct: 2,
  },
  {
    id: 38,
    question: "Restrictions :",
    options: [
      "Braquages (participants, horaires)",
      "Entreprises (lois, dossiers)",
      "Les deux",
    ],
    correct: 2,
  },
  {
    id: 39,
    question: "Conséquences (sanctions, pertes, poursuites) :",
    options: ["Renforcent l'immersion RP", "Gâchent le jeu"],
    correct: 0,
  },
  {
    id: 40,
    question:
      "Situation mixte : Un gang braque une société pendant qu'un joueur RP citoyen signale l'événement →",
    options: [
      "3 règlements appliqués (général, illégal, sociétés)",
      "Aucun règlement",
    ],
    correct: 0,
  },
];

export default function WhitelistPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 secondes par question
  const [whitelistStatus, setWhitelistStatus] = useState<string | null>(null);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Temps écoulé, passer à la question suivante ou terminer
            if (currentQuestion < quizQuestions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
              setTimeLeft(30); // Reset timer pour la nouvelle question
            } else {
              submitQuiz();
            }
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft, currentQuestion]);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        setIsLoggedIn(true);
        // Vérifier le statut whitelist
        checkWhitelistStatus(userData.id);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'authentification:",
        error,
      );
    }
  };

  const checkWhitelistStatus = async (userId: string) => {
    try {
      const res = await fetch("/api/whitelist/status");
      if (res.ok) {
        const status = await res.json();
        setWhitelistStatus(status.status);

        // Si l'utilisateur a déjà réussi, on peut afficher directement le statut approuvé
        if (status.hasPassed) {
          setWhitelistStatus("approved");
        } else if (status.status === "failed" && !status.canRetake) {
          setWhitelistStatus("failed");
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification du statut whitelist:",
        error,
      );
    }
  };

  const handleDiscordLogin = () => {
    window.open("/api/auth/discord", "_blank");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        setUser(null);
        setWhitelistStatus(null);
        setQuizStarted(false);
        setQuizCompleted(false);
        setScore(0);
        setCurrentQuestion(0);
        setAnswers([]);
        setTimeLeft(600);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const startQuiz = () => {
    hasSubmittedRef.current = false;
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers(new Array(quizQuestions.length).fill(-1));
    setTimeLeft(30);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    // Si c'est la dernière question, soumettre automatiquement
    if (currentQuestion === quizQuestions.length - 1) {
      setTimeout(() => submitQuiz(), 1000); // Attendre 1 seconde avant de soumettre
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30); // Reset timer pour la nouvelle question
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    // Empêche les doubles soumissions (auto-submit + clic utilisateur)
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const correctAnswers = answers.filter(
      (answer, index) => answer === quizQuestions[index].correct,
    ).length;
    const finalScore = correctAnswers;
    setScore(finalScore);
    setQuizCompleted(true);

    // Envoyer le résultat au serveur
    try {
      const res = await fetch("/api/whitelist/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: finalScore,
          answers: answers,
          passed: finalScore >= 30,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.passed) {
          setWhitelistStatus("approved");
        } else {
          setWhitelistStatus("failed");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du quiz:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 py-12">
          <div className="text-center">
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Accès Whitelist
            </h1>
            <p className="text-white/70 mb-8">
              Connectez-vous avec Discord pour accéder au quiz RP et obtenir
              l'accès whitelist
            </p>
            <button
              onClick={handleDiscordLogin}
              className="w-full bg-[#5865F2] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#4752C4] transition-colors duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Se connecter avec Discord
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (whitelistStatus === "approved") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 py-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Whitelist Approuvée !
          </h1>
          <p className="text-white/70 mb-6">
            Félicitations ! Vous avez réussi le quiz RP et obtenu l'accès
            whitelist.
          </p>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-green-400 text-sm">
              Le rôle « Quizz validé » a été ajouté à votre compte Discord.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() =>
                (window.location.href = "https://discord.gg/newlacity")
              }
              className="w-full bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300"
            >
              Rejoindre le Discord
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-white/10 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (whitelistStatus === "failed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 py-12 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Quiz Échoué</h1>
          <p className="text-white/70 mb-6">
            Vous n'avez pas obtenu le score minimum requis (30/40).
          </p>
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">
              Vous pouvez retenter le quiz dans 24h.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#D3965B] text-black py-3 px-6 rounded-lg font-medium hover:bg-[#b87c3e] transition-colors duration-300"
            >
              Actualiser la page
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-white/10 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 py-12 text-center">
          <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Quiz Terminé !</h1>
          <p className="text-white/70 mb-6">
            Votre score :{" "}
            <span className="text-white font-bold">{score}/40</span>
          </p>
          {score >= 30 ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-sm">
                Félicitations ! Vous avez réussi le quiz. Le rôle « Quizz validé »
                va être ajouté à votre compte Discord.
              </p>
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">
                Score insuffisant. Vous devez obtenir au moins 30/40 pour
                passer.
              </p>
            </div>
          )}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#D3965B] text-black py-3 px-6 rounded-lg font-medium hover:bg-[#b87c3e] transition-colors duration-300"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-white/10 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizStarted) {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{user?.username}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-white font-medium">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-white/60 mt-2">
              <span>
                Question {currentQuestion + 1} sur {quizQuestions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {question.question}
            </h2>
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                    answers[currentQuestion] === index
                      ? "bg-white/20 border-white text-white"
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === -1}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === quizQuestions.length - 1
                ? "Terminer"
                : "Suivant"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Quiz RP - Accès Whitelist
          </h1>
          <p className="text-white/70 mb-8">
            Bienvenue {user?.username} ! Pour obtenir l'accès whitelist, vous
            devez réussir un quiz de 40 questions sur les règles RP.
          </p>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">
              Informations du quiz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white/70">
                  Durée : 30 secondes par question
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-white/70">Score minimum : 35/40</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-white" />
                <span className="text-white/70">Questions : 40</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-white" />
                <span className="text-white/70">Récompense : Rôle Discord</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={startQuiz}
              className="w-full bg-white text-black py-4 px-8 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300 text-lg"
            >
              Commencer le Quiz
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-white/10 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
