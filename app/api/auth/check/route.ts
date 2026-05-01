import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const discordUser = request.cookies.get('discord_user')
    
    if (!discordUser) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const user = JSON.parse(discordUser.value)
    
    return NextResponse.json({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      discriminator: user.discriminator
    })

  } catch (error) {
    console.error('Erreur vérification auth:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 