export async function editInteractionOriginalMessage(
  applicationId: string,
  interactionToken: string,
  payload: {
    content?: string;
    embeds?: object[];
    components?: object[];
  },
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}/messages/@original`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      console.error(
        "Édition message interaction échouée:",
        await res.text(),
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Édition message interaction:", error);
    return false;
  }
}
