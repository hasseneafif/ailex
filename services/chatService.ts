export async function sendChatMessage({
  sessionId,
  message,
  history,
  token
}: {
  sessionId?: string;
  message: string;
  history: { role: string; content: string }[];
  token?: string;
}) {
  const headers: Record<string, string> = { "Content-Type": "application/json", "x-session-id": sessionId };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${apiUrl}chat/convo`, {
    method: "POST",
    headers,
    body: JSON.stringify({ sessionId, message, history }),
  });

  if (!res.ok && res.status != 429) throw new Error("Failed to fetch chat response");
  return await res.json();
}


export const sendActionMessage = async (userMessage: string, aiReply: string, sessionId: string, token?: string) => {
    const headers: Record<string, string> = { "Content-Type": "application/json", "x-session-id": sessionId };
    if (token) headers["Authorization"] = `Bearer ${token}`;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    await fetch(`${apiUrl}chat/convo-action`, {
      method: "POST",
      headers,
      body: JSON.stringify({ userMessage, aiReply }),
    });
  } catch (err) {
    console.error("Failed to save frontend message:", err);
  }
};
