// hooks/useToken.ts
import { useEffect } from 'react';
import { useTokenStore } from '../../lib/store';
import { ApiError, tokenService } from '../../lib/api';

export const useToken = () => {
  const { token, isLoading, error, setToken, setLoading, setError, clearToken } = useTokenStore();

  useEffect(() => {
    const fetchToken = async () => {
      // If we already have a token or are already loading, don't fetch
      if (token || isLoading) {
        console.log('Skip fetch - token exists:', !!token, 'isLoading:', isLoading);
        return;
      }

      console.log('Fetching token...');
      setLoading(true);

      try {
        const response = await tokenService.getToken();
        console.log('Token fetched successfully');
        setToken(response.token);
      }catch (err) {
  console.error('Failed to fetch token:', err);

  if (err instanceof ApiError) {
    setError({ message: err.message, status: err.status });
  } else {
    setError({ message: 'Failed to fetch token' });
  }
}

    };

    fetchToken();
  }, [token]);

  return {
    token,
    isLoading,
    error,
    clearToken,
    refetch: () => {
      console.log('Manual refetch triggered');
      clearToken();
    }
  };
};