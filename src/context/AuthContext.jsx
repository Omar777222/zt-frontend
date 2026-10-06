import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { authService } from '../api/authService.js';

export const AuthContext = createContext(null);
const STORAGE_KEY = 'zt_session';

// Lee la fecha de expiracion del JWT (solo para la interfaz;
// quien realmente valida el token es el backend).
function getTokenExpiry(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload)).exp * 1000;
  } catch {
    return 0;
  }
}

function loadSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (session?.token && getTokenExpiry(session.token) > Date.now()) return session;
  } catch { /* sesion corrupta */ }
  sessionStorage.removeItem(STORAGE_KEY);
  return null;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  const login = useCallback(async (username, password) => {
    const { token, user } = await authService.login(username, password);
    const newSession = { token, user };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  // Cierra la sesion automaticamente cuando el token expira
  useEffect(() => {
    if (!session) return undefined;
    const msLeft = getTokenExpiry(session.token) - Date.now();
    const timer = setTimeout(logout, Math.max(msLeft, 0));
    return () => clearTimeout(timer);
  }, [session, logout]);

  const value = useMemo(
    () => ({
      token: session?.token ?? null,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
