"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, ApiError } from "./api";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "COACH" | "ADMIN";
  avatarUrl?: string | null;
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const fetchMe = useCallback(async () => {
    try {
      const { user } = await api.get<{ user: AuthUser }>("/auth/me");
      setState({ user, loading: false, error: null });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        // Try refresh once
        try {
          await api.post("/auth/refresh");
          const { user } = await api.get<{ user: AuthUser }>("/auth/me");
          setState({ user, loading: false, error: null });
          return;
        } catch {
          /* fall through */
        }
      }
      setState({ user: null, loading: false, error: null });
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { user } = await api.post<{ user: AuthUser }>("/auth/login", {
        email,
        password,
      });
      setState({ user, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setState((s) => ({ ...s, loading: false, error: message }));
      throw err;
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const { user } = await api.post<{ user: AuthUser }>("/auth/register", {
          email,
          password,
          name,
        });
        setState({ user, loading: false, error: null });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Register failed";
        setState((s) => ({ ...s, loading: false, error: message }));
        throw err;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    }
    setState({ user: null, loading: false, error: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, refresh: fetchMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
