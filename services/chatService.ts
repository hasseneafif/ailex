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

  if (res.status === 429) {
    const data = await res.json();
    throw new Error(data.error || "Rate limit reached");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch chat response");
  }
  return await res.json();
}