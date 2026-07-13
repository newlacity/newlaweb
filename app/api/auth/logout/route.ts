import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true })
    
    // Supprimer le cookie de session
    response.cookies.set('discord_user', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })

    response.cookies.set('discord_access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Erreur déconnexion:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 