// services/pingService.js
export async function sendPing(data) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    await fetch(`${apiUrl}chat/ping`, {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("Failed to send ping:", err);
  }
}
