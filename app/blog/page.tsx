"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Guide de débutant - Premiers pas sur NEW LA",
    excerpt: "Tout ce que vous devez savoir pour bien commencer votre aventure sur notre serveur RP.",
    author: "Équipe NEW LA",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Débutant",
    slug: "guide-debutant"
  },
  {
    id: 2,
    title: "Les règles du serveur - Guide complet",
    excerpt: "Découvrez toutes les règles essentielles pour une expérience RP optimale et respectueuse.",
    author: "Équipe NEW LA",
    date: "2024-01-10",
    readTime: "8 min",
    category: "Règles",
    slug: "regles-serveur"
  },
  {
    id: 3,
    title: "Comment créer un personnage RP convaincant",
    excerpt: "Conseils et astuces pour créer un personnage unique et immersif dans l'univers de NEW LA.",
    author: "Équipe NEW LA",
    date: "2024-01-08",
    readTime: "6 min",
    category: "RP",
    slug: "creer-personnage"
  },
  {
    id: 4,
    title: "Les métiers disponibles - Guide des carrières",
    excerpt: "Explorez tous les métiers disponibles et choisissez celui qui correspond le mieux à votre style de jeu.",
    author: "Équipe NEW LA",
    date: "2024-01-05",
    readTime: "10 min",
    category: "Métiers",
    slug: "metiers-disponibles"
  },
  {
    id: 5,
    title: "Système économique - Comprendre l'économie du serveur",
    excerpt: "Maîtrisez l'économie de NEW LA et découvrez comment gérer vos finances efficacement.",
    author: "Équipe NEW LA",
    date: "2024-01-03",
    readTime: "7 min",
    category: "Économie",
    slug: "systeme-economique"
  },
  {
    id: 6,
    title: "Les événements et activités - S'amuser sur le serveur",
    excerpt: "Découvrez tous les événements et activités organisés régulièrement pour enrichir votre expérience.",
    author: "Équipe NEW LA",
    date: "2024-01-01",
    readTime: "4 min",
    category: "Événements",
    slug: "evenements-activites"
  }
]

const categories = ["Tous", "Débutant", "Règles", "RP", "Métiers", "Économie", "Événements"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b59]/20 to-[#022b59]/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Guide NEW LA
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Découvrez tous nos guides et tutoriels pour maîtriser parfaitement votre expérience sur le serveur
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                category === "Tous"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                  {post.title}
                </h2>
                
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-white/50">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-white text-sm font-medium hover:gap-2 transition-all duration-300"
                  >
                    Lire plus
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
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