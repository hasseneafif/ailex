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

export const chatService = {
  async sendMessage(message: string, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message }),
    });

    return handleResponse(response);
  }
};

export const pdfService = {
  async analyzePdf(file: File, token?: string) {
    const formData = new FormData();
    formData.append('pdf', file);

    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/analyze-pdf`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return handleResponse(response);
  }
};

export { ApiError };