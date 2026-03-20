const API_BASE_URL = '';

class ApiError extends Error {
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
  status?: number;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new ApiError(errorData.error || 'Request failed', response.status);
  }
  return response.json();
};

export const tokenService = {
  async getToken(): Promise<{ token: string }> {
    const response = await fetch(`${API_BASE_URL}/api/auth/meta`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  }
};

type StreamEvent =
  | { type: 'chunk'; text: string }
  | { type: 'risks'; risks: unknown[] }
  | { type: 'error'; message: string };

export const chatService = {
  async *streamMessage(
    message: string,
    token?: string,
    history?: { role: 'user' | 'assistant'; content: string }[]
  ): AsyncGenerator<StreamEvent> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new ApiError(errorData.error || 'Request failed', response.status);
    }

    if (!response.body) throw new ApiError('No response body', 500);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') return;
        try {
          yield JSON.parse(data) as StreamEvent;
        } catch {
          // ignore malformed events
        }
      }
    }
  },
};

type PdfStreamEvent =
  | { type: 'progress'; current: number; total: number }
  | { type: 'issues'; issues: unknown[] }
  | { type: 'complete'; metadata: { totalPages: number; textLength: number; chunksAnalyzed: number } }
  | { type: 'error'; message: string };

export const pdfService = {
  async *streamAnalyzePdf(file: File, token?: string): AsyncGenerator<PdfStreamEvent> {
    const formData = new FormData();
    formData.append('pdf', file);

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/analyze-pdf`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new ApiError(errorData.error || 'Request failed', response.status);
    }

    if (!response.body) throw new ApiError('No response body', 500);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        try {
          yield JSON.parse(line.slice(6)) as PdfStreamEvent;
        } catch {
          // ignore malformed events
        }
      }
    }
  },
};

export { ApiError };