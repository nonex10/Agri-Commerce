'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, AuthUser } from '@/services/auth.service';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
}

export type { AuthContextType };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * On app load: ask the backend if there is an active session.
   * The browser sends the HTTP-only cookie automatically.
   * If the cookie is valid the backend returns the user object.
   * If not (no cookie / expired) it returns 401 — user stays null.
   */
  useEffect(() => {
    authService.getProfile().then(({ data }) => {
      if (data) setUser(data);
      setIsLoading(false);
    });
  }, []);

  const logout = async () => {
    await authService.logout(); // backend clears the cookie
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}