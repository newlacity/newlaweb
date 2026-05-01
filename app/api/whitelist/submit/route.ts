import { NextRequest, NextResponse } from 'next/server'
import { whitelistService } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID
const WHITELIST_ROLE_ID = process.env.WHITELIST_ROLE_ID
const QUIZ_SUCCESS_WEBHOOK_URL = process.env.QUIZ_SUCCESS_WEBHOOK_URL
const QUIZ_FAILED_WEBHOOK_URL = process.env.QUIZ_FAILED_WEBHOOK_URL

async function sendQuizWebhook(params: {
  webhookUrl?: string
  passed: boolean
  user: {
    id: string
    username: string
    discriminator?: string
  }
  score: number
}) {
  const { webhookUrl, passed, user, score } = params
  if (!webhookUrl) return

  const maxScore = 40
  const statusLabel = passed ? 'QUIZ REUSSI' : 'QUIZ RATE'
  const color = passed ? 0x22c55e : 0xef4444
  const discriminator =
    user.discriminator && user.discriminator !== '0'
      ? `#${user.discriminator}`
      : ''

  const payload = {
    embeds: [
      {
        title: statusLabel,
        color,
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: 'Utilisateur Discord',
            value: `${user.username}${discriminator}`,
            inline: true,
          },
          {
            name: 'Discord ID',
            value: user.id,
            inline: true,
          },
          {
            name: 'Score',
            value: `${score}/${maxScore}`,
            inline: true,
          },
        ],
      },
    ],
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text()
      console.error('Erreur webhook Discord:', errorText)
    }
  } catch (error) {
    console.error('Erreur envoi webhook Discord:', error)
  }
}

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

    await sendQuizWebhook({
      webhookUrl: passed ? QUIZ_SUCCESS_WEBHOOK_URL : QUIZ_FAILED_WEBHOOK_URL,
      passed,
      user,
      score,
    })

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