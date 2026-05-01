import { NextRequest, NextResponse } from 'next/server'
import { whitelistService } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const discordUser = request.cookies.get('discord_user')
    
    if (!discordUser) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const user = JSON.parse(discordUser.value)
    const status = await whitelistService.checkStatus(user.id)
    
    return NextResponse.json({ 
      status: status.status,
      hasPassed: status.hasPassed,
      score: status.score,
      canRetake: status.canRetake,
      cooldownRemaining: status.cooldownRemaining,
      totalAttempts: status.totalAttempts
    })

  } catch (error) {
    console.error('Erreur vérification whitelist:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 