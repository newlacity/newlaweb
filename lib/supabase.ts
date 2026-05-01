import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error('Supabase non configuré')
  }
  if (!cachedClient) {
    cachedClient = createClient(url, anon)
  }
  return cachedClient
}

// Types pour la base de données
export interface WhitelistEntry {
  id: string
  user_id: string
  username: string
  avatar?: string
  discriminator?: string
  score: number
  passed: boolean
  answers: number[]
  created_at: string
  updated_at: string
}

export interface QuizAttempt {
  id: string
  user_id: string
  score: number
  passed: boolean
  answers: number[]
  created_at: string
}

// Service pour la gestion de la whitelist
export const whitelistService = {
  // Créer une nouvelle tentative de quiz
  async createAttempt(data: {
    user_id: string
    username: string
    avatar?: string
    discriminator?: string
    score: number
    passed: boolean
    answers: number[]
  }): Promise<WhitelistEntry | null> {
    const supabase = getSupabase()
    const { data: entry, error } = await supabase
      .from('whitelist_entries')
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error('Error creating whitelist entry:', error)
      return null
    }

    return entry
  },

  // Vérifier le statut d'un utilisateur
  async checkStatus(userId: string): Promise<{
    hasPassed: boolean
    score: number | null
    status: 'pending' | 'approved' | 'failed' | null
    lastAttempt: string | null
    canRetake: boolean
    cooldownRemaining?: number
    totalAttempts: number
  }> {
    // Récupérer toutes les tentatives de l'utilisateur
    const supabase = getSupabase()
    const { data: allAttempts, error: countError } = await supabase
      .from('whitelist_entries')
      .select('id, created_at, passed')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (countError) {
      console.error('Error counting attempts:', countError)
    }

    // Récupérer la dernière tentative
    const { data: lastAttempt, error } = await supabase
      .from('whitelist_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking whitelist status:', error)
      return {
        hasPassed: false,
        score: null,
        status: null,
        lastAttempt: null,
        canRetake: false,
        totalAttempts: 0
      }
    }

    if (!lastAttempt) {
      return {
        hasPassed: false,
        score: null,
        status: null,
        lastAttempt: null,
        canRetake: true,
        totalAttempts: 0
      }
    }

    const now = new Date()
    const lastAttemptDate = new Date(lastAttempt.created_at)
    const hoursSinceLastAttempt = (now.getTime() - lastAttemptDate.getTime()) / (1000 * 60 * 60)

    // Si l'utilisateur a réussi le quiz
    if (lastAttempt.passed) {
      return {
        hasPassed: true,
        score: lastAttempt.score,
        status: 'approved',
        lastAttempt: lastAttempt.created_at,
        canRetake: false,
        totalAttempts: allAttempts?.length || 1
      }
    }

    // Si l'utilisateur a échoué, vérifier le cooldown de 24h
    if (!lastAttempt.passed && hoursSinceLastAttempt < 24) {
      const cooldownRemaining = Math.ceil(24 - hoursSinceLastAttempt)
      return {
        hasPassed: false,
        score: lastAttempt.score,
        status: 'failed',
        lastAttempt: lastAttempt.created_at,
        canRetake: false,
        cooldownRemaining,
        totalAttempts: allAttempts?.length || 1
      }
    }

    // Peut retenter après 24h
    return {
      hasPassed: false,
      score: lastAttempt.score,
      status: 'failed',
      lastAttempt: lastAttempt.created_at,
      canRetake: true,
      totalAttempts: allAttempts?.length || 1
    }
  },

  // Vérifier si l'utilisateur peut passer le quiz
  async canTakeQuiz(userId: string): Promise<{
    canTake: boolean
    reason?: string
    cooldownRemaining?: number
  }> {
    const status = await this.checkStatus(userId)

    if (status.hasPassed) {
      return {
        canTake: false,
        reason: 'Vous avez déjà réussi le quiz et obtenu l\'accès whitelist.'
      }
    }

    if (!status.canRetake) {
      return {
        canTake: false,
        reason: `Vous devez attendre ${status.cooldownRemaining} heures avant de pouvoir retenter le quiz.`,
        cooldownRemaining: status.cooldownRemaining
      }
    }

    return { canTake: true }
  },

  // Obtenir les statistiques
  async getStats(): Promise<{
    total: number
    approved: number
    failed: number
    pending: number
  }> {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('whitelist_entries')
      .select('passed')

    if (error) {
      console.error('Error getting stats:', error)
      return { total: 0, approved: 0, failed: 0, pending: 0 }
    }

    const total = data.length
    const approved = data.filter(entry => entry.passed).length
    const failed = data.filter(entry => !entry.passed).length

    return {
      total,
      approved,
      failed,
      pending: 0 // Pas de statut pending dans ce système
    }
  }
} 