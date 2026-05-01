"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, List } from "lucide-react"

const blogPosts = {
  "guide-debutant": {
    title: "Guide de débutant - Premiers pas sur NEW LA",
    excerpt: "Tout ce que vous devez savoir pour bien commencer votre aventure sur notre serveur RP.",
    author: "Équipe NEW LA",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Débutant",
    content: `
      <h2>Bienvenue sur NEW LA !</h2>
      <p>Félicitations pour avoir rejoint notre communauté RP ! Ce guide vous accompagnera dans vos premiers pas sur le serveur.</p>
      
      <h3>1. Première connexion</h3>
      <p>Lors de votre première connexion, vous serez accueilli par notre système de création de personnage. Prenez le temps de bien réfléchir à votre identité RP :</p>
      <ul>
        <li>Choisissez un nom réaliste et approprié</li>
        <li>Définissez votre background et votre histoire</li>
        <li>Sélectionnez votre apparence avec soin</li>
      </ul>
      
      <h3>2. Les commandes essentielles</h3>
      <p>Voici les commandes de base que vous devez connaître :</p>
      <ul>
        <li><code>/help</code> - Affiche l'aide générale</li>
        <li><code>/me [action]</code> - Décrit une action RP</li>
        <li><code>/do [description]</code> - Décrit l'environnement</li>
        <li><code>/ooc [message]</code> - Message hors RP</li>
        <li><code>/pm [joueur] [message]</code> - Message privé</li>
      </ul>
      
      <h3>3. Les règles de base</h3>
      <p>Respectez toujours ces règles fondamentales :</p>
      <ul>
        <li>Restez en RP en permanence</li>
        <li>Respectez les autres joueurs</li>
        <li>Évitez le powergaming et le metagaming</li>
        <li>Utilisez le chat OOC avec modération</li>
      </ul>
      
      <h3>4. Premiers objectifs</h3>
      <p>Une fois connecté, voici ce que nous vous recommandons :</p>
      <ol>
        <li>Explorer la ville pour vous familiariser</li>
        <li>Rencontrer d'autres joueurs</li>
        <li>Choisir un métier de base</li>
        <li>Participer aux événements communautaires</li>
      </ol>
      
      <h3>Besoin d'aide ?</h3>
      <p>N'hésitez pas à demander de l'aide aux autres joueurs ou à l'équipe de modération. Notre communauté est là pour vous accompagner !</p>
    `
  },
  "regles-serveur": {
    title: "Les règles du serveur - Guide complet",
    excerpt: "Découvrez toutes les règles essentielles pour une expérience RP optimale et respectueuse.",
    author: "Équipe NEW LA",
    date: "2024-01-10",
    readTime: "8 min",
    category: "Règles",
    content: `
      <h2>Règles générales du serveur</h2>
      <p>Ces règles sont essentielles pour maintenir une communauté saine et une expérience RP de qualité.</p>
      
      <h3>1. Respect et comportement</h3>
      <ul>
        <li>Traitement respectueux de tous les joueurs</li>
        <li>Interdiction du harcèlement et des propos discriminatoires</li>
        <li>Respect des décisions de l'équipe de modération</li>
        <li>Pas de spam ou de flood dans les chats</li>
      </ul>
      
      <h3>2. Règles RP</h3>
      <ul>
        <li><strong>IC (In Character) :</strong> Toujours rester en personnage</li>
        <li><strong>OOC (Out of Character) :</strong> Utiliser /ooc pour les messages hors RP</li>
        <li>Interdiction du metagaming (utiliser des infos OOC en RP)</li>
        <li>Interdiction du powergaming (actions irréalistes)</li>
        <li>Respect de la continuité RP</li>
      </ul>
      
      <h3>3. Règles de combat</h3>
      <ul>
        <li>Combat RP obligatoire avec /me et /do</li>
        <li>Respect des règles de spawn killing</li>
        <li>Interdiction du combat sans raison RP valable</li>
        <li>Utilisation des armes selon les règles établies</li>
      </ul>
      
      <h3>4. Règles économiques</h3>
      <ul>
        <li>Interdiction de la duplication d'argent</li>
        <li>Prix réalistes pour les transactions</li>
        <li>Respect des contrats et accords RP</li>
        <li>Pas d'exploitation de bugs économiques</li>
      </ul>
      
      <h3>5. Sanctions</h3>
      <p>Les infractions peuvent entraîner :</p>
      <ul>
        <li>Avertissement verbal</li>
        <li>Kick temporaire</li>
        <li>Ban temporaire</li>
        <li>Ban permanent (cas graves)</li>
      </ul>
      
      <h3>6. Contact modération</h3>
      <p>Pour signaler un problème ou contester une sanction :</p>
      <ul>
        <li>Discord : #moderation</li>
        <li>Ticket : /ticket</li>
        <li>Email : moderation@newlacity.fr</li>
      </ul>
    `
  },
  "creer-personnage": {
    title: "Comment créer un personnage RP convaincant",
    excerpt: "Conseils et astuces pour créer un personnage unique et immersif dans l'univers de NEW LA.",
    author: "Équipe NEW LA",
    date: "2024-01-08",
    readTime: "6 min",
    category: "RP",
    content: `
      <h2>Créer un personnage mémorable</h2>
      <p>Un bon personnage RP est la base d'une expérience immersive. Voici comment créer le vôtre.</p>
      
      <h3>1. L'identité de base</h3>
      <ul>
        <li><strong>Nom :</strong> Choisissez un nom réaliste et approprié</li>
        <li><strong>Âge :</strong> Cohérent avec votre apparence et votre histoire</li>
        <li><strong>Origine :</strong> Définissez d'où vient votre personnage</li>
        <li><strong>Profession :</strong> Choisissez un métier qui vous plaît</li>
      </ul>
      
      <h3>2. Le background</h3>
      <p>Créez une histoire riche et détaillée :</p>
      <ul>
        <li>Enfance et famille</li>
        <li>Éducation et formation</li>
        <li>Événements marquants</li>
        <li>Relations importantes</li>
        <li>Objectifs et motivations</li>
      </ul>
      
      <h3>3. La personnalité</h3>
      <p>Définissez des traits de caractère cohérents :</p>
      <ul>
        <li>Forces et faiblesses</li>
        <li>Hobbys et passions</li>
        <li>Peur et phobies</li>
        <li>Valeurs et principes</li>
        <li>Façons de parler et tics</li>
      </ul>
      
      <h3>4. L'apparence</h3>
      <p>Votre apparence doit refléter votre personnage :</p>
      <ul>
        <li>Style vestimentaire cohérent</li>
        <li>Accessoires significatifs</li>
        <li>Marques ou cicatrices</li>
        <li>Coiffure et maquillage</li>
      </ul>
      
      <h3>5. Évolution du personnage</h3>
      <p>Un personnage doit évoluer avec le temps :</p>
      <ul>
        <li>Apprendre de ses expériences</li>
        <li>Développer de nouvelles relations</li>
        <li>Changer d'objectifs</li>
        <li>Évoluer dans sa carrière</li>
      </ul>
      
      <h3>6. Conseils pratiques</h3>
      <ul>
        <li>Gardez un carnet RP pour noter vos interactions</li>
        <li>Créez des liens avec d'autres personnages</li>
        <li>Participez aux événements communautaires</li>
        <li>Restez cohérent dans vos actions</li>
        <li>N'ayez pas peur de faire des erreurs RP</li>
      </ul>
    `
  },
  "metiers-disponibles": {
    title: "Les métiers disponibles - Guide des carrières",
    excerpt: "Explorez tous les métiers disponibles et choisissez celui qui correspond le mieux à votre style de jeu.",
    author: "Équipe NEW LA",
    date: "2024-01-05",
    readTime: "10 min",
    category: "Métiers",
    content: `
      <h2>Les carrières de NEW LA</h2>
      <p>Découvrez tous les métiers disponibles et leurs spécificités pour choisir votre voie.</p>
      
      <h3>1. Métiers civils</h3>
      <h4>Services publics</h4>
      <ul>
        <li><strong>Médecin :</strong> Soigner les blessés, gérer l'hôpital</li>
        <li><strong>Pompier :</strong> Intervenir sur les incendies et accidents</li>
        <li><strong>Éboueur :</strong> Nettoyer la ville, recyclage</li>
        <li><strong>Électricien :</strong> Réparer les installations électriques</li>
      </ul>
      
      <h4>Commerce et services</h4>
      <ul>
        <li><strong>Commerçant :</strong> Gérer une boutique, vendre des produits</li>
        <li><strong>Restaurateur :</strong> Cuisiner, servir des clients</li>
        <li><strong>Taxi :</strong> Transporter des passagers</li>
        <li><strong>Mécanicien :</strong> Réparer les véhicules</li>
      </ul>
      
      <h3>2. Métiers de sécurité</h3>
      <ul>
        <li><strong>Policier :</strong> Maintenir l'ordre, enquêter</li>
        <li><strong>Agent de sécurité :</strong> Protéger des lieux privés</li>
        <li><strong>Avocat :</strong> Défendre des clients, justice</li>
        <li><strong>Juge :</strong> Rendre la justice</li>
      </ul>
      
      <h3>3. Métiers illégaux</h3>
      <p><em>Attention : Ces métiers impliquent des risques RP et des sanctions possibles</em></p>
      <ul>
        <li><strong>Trafic de drogue :</strong> Production et vente</li>
        <li><strong>Braquage :</strong> Vols organisés</li>
        <li><strong>Contrebande :</strong> Transport de marchandises illégales</li>
        <li><strong>Hacking :</strong> Piratage informatique</li>
      </ul>
      
      <h3>4. Comment choisir son métier</h3>
      <ul>
        <li>Réfléchissez à votre style de jeu</li>
        <li>Considérez vos disponibilités horaires</li>
        <li>Évaluez les risques et responsabilités</li>
        <li>Pensez aux interactions avec les autres</li>
      </ul>
      
      <h3>5. Évolution de carrière</h3>
      <ul>
        <li>Débuter comme stagiaire</li>
        <li>Monter en grade avec l'expérience</li>
        <li>Spécialiser dans un domaine</li>
        <li>Créer sa propre entreprise</li>
      </ul>
      
      <h3>6. Salaires et avantages</h3>
      <p>Chaque métier offre des avantages différents :</p>
      <ul>
        <li>Salaire de base</li>
        <li>Bonus de performance</li>
        <li>Avantages sociaux</li>
        <li>Équipements fournis</li>
        <li>Prestige social</li>
      </ul>
    `
  },
  "systeme-economique": {
    title: "Système économique - Comprendre l'économie du serveur",
    excerpt: "Maîtrisez l'économie de NEW LA et découvrez comment gérer vos finances efficacement.",
    author: "Équipe NEW LA",
    date: "2024-01-03",
    readTime: "7 min",
    category: "Économie",
    content: `
      <h2>L'économie de NEW LA</h2>
      <p>Comprendre le système économique est essentiel pour prospérer sur le serveur.</p>
      
      <h3>1. La monnaie</h3>
      <ul>
        <li><strong>Dollar ($) :</strong> Monnaie principale du serveur</li>
        <li><strong>Gains :</strong> Travail, missions, activités</li>
        <li><strong>Dépenses :</strong> Logement, véhicules, services</li>
        <li><strong>Épargne :</strong> Banque sécurisée</li>
      </ul>
      
      <h3>2. Sources de revenus</h3>
      <h4>Revenus légaux</h4>
      <ul>
        <li>Salaire de base (métiers)</li>
        <li>Bonus de performance</li>
        <li>Missions gouvernementales</li>
        <li>Investissements</li>
        <li>Commerce légal</li>
      </ul>
      
      <h4>Revenus illégaux</h4>
      <ul>
        <li>Trafic de drogue</li>
        <li>Braquages</li>
        <li>Contrebande</li>
        <li>Extorsion</li>
        <li><em>Risque de confiscation et sanctions</em></li>
      </ul>
      
      <h3>3. Gestion des finances</h3>
      <ul>
        <li><strong>Budget :</strong> Planifiez vos dépenses</li>
        <li><strong>Épargne :</strong> Gardez des réserves</li>
        <li><strong>Investissement :</strong> Faites fructifier votre argent</li>
        <li><strong>Assurance :</strong> Protégez vos biens</li>
      </ul>
      
      <h3>4. Marché immobilier</h3>
      <ul>
        <li><strong>Appartements :</strong> Logements de base</li>
        <li><strong>Maisons :</strong> Propriétés familiales</li>
        <li><strong>Locaux commerciaux :</strong> Pour les entreprises</li>
        <li><strong>Garages :</strong> Stockage de véhicules</li>
      </ul>
      
      <h3>5. Marché automobile</h3>
      <ul>
        <li><strong>Véhicules d'occasion :</strong> Prix abordables</li>
        <li><strong>Véhicules neufs :</strong> Performance garantie</li>
        <li><strong>Véhicules de luxe :</strong> Prestige et confort</li>
        <li><strong>Entretien :</strong> Coûts réguliers</li>
      </ul>
      
      <h3>6. Conseils économiques</h3>
      <ul>
        <li>Diversifiez vos sources de revenus</li>
        <li>Évitez les dépenses impulsives</li>
        <li>Négociez les prix</li>
        <li>Investissez dans l'immobilier</li>
        <li>Gardez des liquidités</li>
        <li>Surveillez l'inflation</li>
      </ul>
      
      <h3>7. Éviter les pièges</h3>
      <ul>
        <li>Arnaques et escroqueries</li>
        <li>Prêts à taux élevés</li>
        <li>Investissements douteux</li>
        <li>Dépenses excessives</li>
      </ul>
    `
  },
  "evenements-activites": {
    title: "Les événements et activités - S'amuser sur le serveur",
    excerpt: "Découvrez tous les événements et activités organisés régulièrement pour enrichir votre expérience.",
    author: "Équipe NEW LA",
    date: "2024-01-01",
    readTime: "4 min",
    category: "Événements",
    content: `
      <h2>Événements et activités communautaires</h2>
      <p>NEW LA propose de nombreux événements pour enrichir votre expérience RP.</p>
      
      <h3>1. Événements réguliers</h3>
      <h4>Hebdomadaires</h4>
      <ul>
        <li><strong>Marché aux puces :</strong> Dimanche après-midi</li>
        <li><strong>Karaoké :</strong> Vendredi soir</li>
        <li><strong>Course de véhicules :</strong> Samedi soir</li>
        <li><strong>Poker night :</strong> Mercredi soir</li>
      </ul>
      
      <h4>Mensuels</h4>
      <ul>
        <li><strong>Festival de musique :</strong> Premier weekend</li>
        <li><strong>Exposition d'art :</strong> Deuxième weekend</li>
        <li><strong>Compétition sportive :</strong> Troisième weekend</li>
        <li><strong>Gala de charité :</strong> Dernier weekend</li>
      </ul>
      
      <h3>2. Événements saisonniers</h3>
      <ul>
        <li><strong>Halloween :</strong> Soirée horrifique</li>
        <li><strong>Noël :</strong> Marché de Noël et cadeaux</li>
        <li><strong>Nouvel An :</strong> Feux d'artifice et célébration</li>
        <li><strong>Été :</strong> Festival de plage</li>
      </ul>
      
      <h3>3. Activités spontanées</h3>
      <ul>
        <li><strong>Chasses au trésor :</strong> Organisées par les joueurs</li>
        <li><strong>Concerts :</strong> Musiciens amateurs</li>
        <li><strong>Pièces de théâtre :</strong> Troupes locales</li>
        <li><strong>Défilés de mode :</strong> Créateurs locaux</li>
      </ul>
      
      <h3>4. Compétitions</h3>
      <ul>
        <li><strong>Course de véhicules :</strong> Prix en argent</li>
        <li><strong>Concours de beauté :</strong> Prestige et récompenses</li>
        <li><strong>Tournois de poker :</strong> Gains importants</li>
        <li><strong>Compétitions sportives :</strong> Trophées</li>
      </ul>
      
      <h3>5. Comment participer</h3>
      <ul>
        <li>Surveillez les annonces Discord</li>
        <li>Inscrivez-vous aux événements</li>
        <li>Préparez votre personnage</li>
        <li>Participez activement</li>
        <li>Respectez les règles de l'événement</li>
      </ul>
      
      <h3>6. Organiser un événement</h3>
      <p>Vous pouvez aussi organiser vos propres événements :</p>
      <ul>
        <li>Proposez votre idée à l'équipe</li>
        <li>Planifiez les détails</li>
        <li>Promouvez votre événement</li>
        <li>Gérez l'organisation</li>
      </ul>
      
      <h3>7. Récompenses</h3>
      <ul>
        <li>Argent et objets rares</li>
        <li>Prestige social</li>
        <li>Expérience RP enrichie</li>
        <li>Nouvelles relations</li>
        <li>Médailles et trophées</li>
      </ul>
    `
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  const [activeSection, setActiveSection] = useState("")
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -35% 0px" }
    )

    const headings = document.querySelectorAll("h2, h3")
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  const extractHeadings = (content: string) => {
    const headings: { id: string; text: string; level: number }[] = []
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
    
    doc.querySelectorAll("h2, h3").forEach((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || ""
      headings.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1))
      })
    })
    
    return headings
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article non trouvé</h1>
          <p className="text-white/70 mb-8">L'article que vous recherchez n'existe pas.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  const headings = extractHeadings(post.content)

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b59]/20 to-[#022b59]/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <button className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <Share2 className="w-4 h-4" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Table of Contents */}
        {headings.length > 0 && (
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setShowToc(!showToc)}
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-colors duration-300"
            >
              <List className="w-4 h-4" />
              <span>Table des matières</span>
            </button>
            {showToc && (
              <div className="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Sommaire</h4>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToSection(heading.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeSection === heading.id
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      } ${heading.level === 3 ? "ml-4 text-sm" : "font-medium"}`}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-zinc-100 leading-relaxed [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:border-b [&>h2]:border-amber-200/30 [&>h2]:pb-2 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-red-500 [&>h3]:mt-8 [&>h3]:mb-4 [&>h4]:text-xl [&>h4]:font-medium [&>h4]:text-violet-100 [&>h4]:mt-6 [&>h4]:mb-3 [&>p]:text-lg [&>p]:leading-7 [&>p]:mb-6 [&>p]:text-zinc-100 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-3 [&>ul>li]:text-lg [&>ul>li]:leading-7 [&>ul>li]:before:content-['•'] [&>ul>li]:before:text-sky-300 [&>ul>li]:before:font-bold [&>ul>li]:before:flex-shrink-0 [&>ul>li]:before:mt-1 [&>ol]:space-y-2 [&>ol]:mb-6 [&>ol>li]:text-lg [&>ol>li]:leading-7 [&>ol>li]:pl-2 [&>ol>li]:text-zinc-100 [&>code]:bg-emerald-200/15 [&>code]:text-emerald-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:font-mono [&>code]:text-sm [&>strong]:text-white [&>strong]:font-semibold [&>em]:text-amber-100/90 [&>em]:italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Desktop Table of Contents */}
          {headings.length > 0 && (
            <div className="hidden lg:block">
              <div className="sticky top-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Table des matières
                </h4>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToSection(heading.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeSection === heading.id
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      } ${heading.level === 3 ? "ml-4 text-sm" : "font-medium"}`}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Related Articles */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white mb-8">Articles similaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(blogPosts)
              .filter(([slug]) => slug !== params.slug)
              .slice(0, 4)
              .map(([slug, article]) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                    {article.title}
                  </h4>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span>{article.readTime}</span>
                    <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-white/10 to-white/10 border border-white/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Restez informé des nouveaux guides
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Recevez nos derniers guides et tutoriels directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white"
            />
            <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors duration-300">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 