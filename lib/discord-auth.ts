export interface DiscordUser {
  id: string
  username: string
  avatar: string
  discriminator: string
}

export const getDiscordAvatarUrl = (userId: string, avatar: string) => {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
}

export const getDiscordFallbackAvatar = (userId: string, discriminator: string) => {
  const avatarNumber = parseInt(discriminator) % 5
  return `https://cdn.discordapp.com/embed/avatars/${avatarNumber}.png`
}

export const parseSessionToken = (token: string): DiscordUser | null => {
  try {
    const decoded = Buffer.from(token, 'base64').toString()
    return JSON.parse(decoded)
  } catch {
    return null
  }
} 