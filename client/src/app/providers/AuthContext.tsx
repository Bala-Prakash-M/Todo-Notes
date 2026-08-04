import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../features/auth/api/auth.api";
import type { User } from "../../features/auth/types/auth.types";
import {
  getAccessToken,
  refreshAccessToken,
  setAccessToken as apiSetAccessToken,
  registerOnTokenChange,
  registerOnUnauthenticated,
} from "../../services/api";


interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(() => getAccessToken());
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const isInitializingRef = useRef(true);

  const clearClientAuth = useCallback(() => {
    setUser(null);
    setAccessTokenState(null);
    apiSetAccessToken(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
  }, []);

  const handleClientLogout = useCallback(() => {
    setIsLoggingOut(true);
    clearClientAuth();
    navigate("/", { replace: true });
  }, [clearClientAuth, navigate]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      handleClientLogout();
    }
  }, [handleClientLogout]);

  const logoutAll = useCallback(async () => {
    try {
      await authApi.logoutAll();
    } catch (error) {
      console.error("Logout all devices request failed:", error);
    } finally {
      handleClientLogout();
    }
  }, [handleClientLogout]);

  // Sync token from Axios to Context state (e.g. on auto refresh)
  useEffect(() => {
    registerOnTokenChange((token) => {
      setAccessTokenState(token);
    });
    registerOnUnauthenticated(() => {
      if (isInitializingRef.current) {
        clearClientAuth();
        return;
      }

      handleClientLogout();
    });
  }, [clearClientAuth, handleClientLogout]);

  // Silent authentication boot check
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      isInitializingRef.current = true;

      const hasStoredToken = !!getAccessToken();
      const hadAuthenticatedSession = localStorage.getItem("isAuthenticated") === "true";

      if (!hasStoredToken && !hadAuthenticatedSession) {
        if (isMounted) {
          setIsLoading(false);
          setIsLoggingOut(false);
        }
        isInitializingRef.current = false;
        return;
      }

      try {
        if (!hasStoredToken && hadAuthenticatedSession) {
          await refreshAccessToken();
        }

        const response = await authApi.me();
        if (isMounted) {
          setUser(response.user);
          setIsLoggingOut(false);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userName", response.user.name);
          localStorage.setItem("email", response.user.email);
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        if (isMounted) {
          clearClientAuth();
          setIsLoggingOut(false);
        }
      } finally {
        isInitializingRef.current = false;
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
    return () => {
      isMounted = false;
    };
  }, [clearClientAuth]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login({ email, password });

    // Set localStorage flag and sync context + api
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", response.user.name);
    localStorage.setItem("email", response.user.email);
    // Set localStorage flag and sync context + api
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", response.user.name);
    localStorage.setItem("email", response.user.email);

    apiSetAccessToken(response.accessToken);
    setAccessTokenState(response.accessToken);
    setUser(response.user);
    setIsLoggingOut(false);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const response = await authApi.register({ name, email, password });

    // Set localStorage flag and sync context + api
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", response.user.name);
    localStorage.setItem("email", response.user.email);

    apiSetAccessToken(response.accessToken);
    setAccessTokenState(response.accessToken);
    setUser(response.user);
    setIsLoggingOut(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        isLoggingOut,
        login,
        register,
        logout,
        logoutAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
