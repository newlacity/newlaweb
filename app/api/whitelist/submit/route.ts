import { NextRequest, NextResponse } from 'next/server'
import { whitelistService } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID
const WHITELIST_ROLE_ID = process.env.WHITELIST_ROLE_ID

export async function POST(request: NextRequest) {
  try {
    const discordUser = request.cookies.get('discord_user')
    
    if (!discordUser) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const user = JSON.parse(discordUser.value)
    const { score, answers, passed } = await request.json()

    // Vérifier si l'utilisateur peut passer le quiz
    const canTake = await whitelistService.canTakeQuiz(user.id)
    if (!canTake.canTake) {
      return NextResponse.json({ 
        error: canTake.reason,
        cooldownRemaining: canTake.cooldownRemaining
      }, { status: 429 })
    }

    // Créer l'entrée dans la base de données
    const entry = await whitelistService.createAttempt({
      user_id: user.id,
      username: user.username,
      avatar: user.avatar,
      discriminator: user.discriminator,
      score,
      passed,
      answers
    })

    if (!entry) {
      return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 })
    }

    if (passed) {
      // Ajouter le rôle Discord si le quiz est réussi
      if (DISCORD_BOT_TOKEN && DISCORD_GUILD_ID && WHITELIST_ROLE_ID) {
        try {
          await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${user.id}/roles/${WHITELIST_ROLE_ID}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
              'Content-Type': 'application/json',
            },
          })
        } catch (error) {
          console.error('Erreur ajout rôle Discord:', error)
        }
      }
    }

    return NextResponse.json({ 
      passed,
      score,
      status: passed ? 'approved' : 'failed'
    })

  } catch (error) {
    console.error('Erreur soumission whitelist:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 