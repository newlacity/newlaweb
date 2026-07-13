export async function sendDiscordDirectMessage(
  userId: string,
  payload: { content?: string; embeds?: object[] },
): Promise<boolean> {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    console.warn("DISCORD_BOT_TOKEN manquant — MP Discord impossible.");
    return false;
  }

  try {
    const channelRes = await fetch(
      "https://discord.com/api/v10/users/@me/channels",
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient_id: userId }),
      },
    );

    if (!channelRes.ok) {
      console.error("Création canal DM échouée:", await channelRes.text());
      return false;
    }

    const channel = (await channelRes.json()) as { id: string };

    const msgRes = await fetch(
      `https://discord.com/api/v10/channels/${channel.id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!msgRes.ok) {
      console.error("Envoi MP Discord échoué:", await msgRes.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur envoi MP Discord:", error);
    return false;
  }
}
