import { NextRequest, NextResponse } from 'next/server'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/api/auth/discord/callback'

export async function GET(request: NextRequest) {
  const state = Math.random().toString(36).substring(7)
  
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID!,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds.members.read',
    state: state
  })

  const url = `https://discord.com/api/oauth2/authorize?${params.toString()}`
  
  const response = NextResponse.redirect(url)
  response.cookies.set('discord_state', state, { httpOnly: true, secure: true, sameSite: 'lax' })
  
  return response
} 