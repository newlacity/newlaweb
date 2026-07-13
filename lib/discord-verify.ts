import { createPublicKey, verify } from "node:crypto";

export function verifyDiscordRequest(
  body: string,
  signature: string | null,
  timestamp: string | null,
  publicKeyHex: string,
): boolean {
  if (!signature || !timestamp || !publicKeyHex) return false;

  try {
    const publicKey = createPublicKey({
      key: Buffer.concat([
        Buffer.from("302a300506032b6570032100", "hex"),
        Buffer.from(publicKeyHex, "hex"),
      ]),
      format: "der",
      type: "spki",
    });

    return verify(
      null,
      Buffer.from(timestamp + body),
      publicKey,
      Buffer.from(signature, "hex"),
    );
  } catch {
    return false;
  }
}
