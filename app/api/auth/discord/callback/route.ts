import { NextRequest, NextResponse } from 'next/server'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/api/auth/discord/callback'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const storedState = request.cookies.get('discord_state')?.value

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL('/whitelist?error=invalid_state', request.url))
  }

  try {
    // Échanger le code contre un token d'accès
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error('Erreur token Discord:', tokenData)
      return NextResponse.redirect(new URL('/whitelist?error=token_error', request.url))
    }

    // Récupérer les informations de l'utilisateur
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    if (!userResponse.ok) {
      console.error('Erreur user Discord:', userData)
      return NextResponse.redirect(new URL('/whitelist?error=user_error', request.url))
    }

    // Créer une session pour l'utilisateur
    const response = NextResponse.redirect(new URL('/whitelist', request.url))
    response.cookies.set('discord_user', JSON.stringify({
      id: userData.id,
      username: userData.username,
      avatar: userData.avatar,
      discriminator: userData.discriminator
    }), { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 jours
    })

    // Ajouter un script pour fermer la fenêtre et rafraîchir la page parente
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Connexion réussie</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.location.reload();
              window.close();
            } else {
              window.location.href = '/whitelist';
            }
          </script>
          <p>Connexion réussie ! Redirection en cours...</p>
        </body>
      </html>
    `
    
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Set-Cookie': response.headers.get('Set-Cookie') || ''
      }
    })

  } catch (error) {
    console.error('Erreur callback Discord:', error)
    return NextResponse.redirect(new URL('/whitelist?error=server_error', request.url))
  }
} 