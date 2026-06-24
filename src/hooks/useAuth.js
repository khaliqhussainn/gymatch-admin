import { useState, useCallback } from "react";
import { authService } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState(() => authService.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const u = await authService.login(email, password);
      setUser(u);
      return u;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return { user, loading, error, login, logout, isAuthenticated: Boolean(user) };
}
