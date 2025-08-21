export async function sendChatMessage({ sessionId, message, history, token }: {
  sessionId?: string;
  message: string;
  history: { role: string; content: string }[];
  token?: string;
}) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${apiUrl}chat/convo`, {
    method: "POST",
    headers,
    body: JSON.stringify({ sessionId, message, history }),
  });
  if (!res.ok && res.status != 429) {
    throw new Error("Failed to fetch chat response");
  }
  return await res.json();
}