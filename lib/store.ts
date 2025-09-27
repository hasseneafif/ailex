// lib/store.ts
import { create } from 'zustand';

interface TokenStore {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  token: null,
  isLoading: false,
  error: null,
  setToken: (token) => set({ token, error: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearToken: () => set({ token: null, error: null, isLoading: false }),
}));