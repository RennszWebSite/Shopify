
import fetch from "node-fetch";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1368399711769198642/1UZY2nHfDcP-jULpAVtm7AhS9UP6CYzgSPF1TqmwngunAsqIaPeQjnQvEwlEgzxKbxLb";

export async function sendLogToDiscord(log: string): Promise<void> {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `**Shopify Log**: ${log}`,
      }),
    });
  } catch (error) {
    console.error("Failed to send log to Discord:", error);
  }
}

export async function sendErrorToDiscord(error: Error | string): Promise<void> {
  try {
    const errorMessage = typeof error === "string" ? error : `${error.name}: ${error.message}\n${error.stack || ""}`;
    
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `**Shopify Error**:\n\`\`\`\n${errorMessage}\n\`\`\``,
      }),
    });
  } catch (err) {
    console.error("Failed to send error to Discord:", err);
  }
}
