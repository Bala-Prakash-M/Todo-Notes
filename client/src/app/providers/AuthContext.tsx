import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../features/auth/api/auth.api";
import type { User } from "../../features/auth/types/auth.types";
import {
  setAccessToken as apiSetAccessToken,
  registerOnTokenChange,
  registerOnUnauthenticated,
} from "../../services/api";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClientLogout = useCallback(() => {
    setUser(null);
    setAccessTokenState(null);
    apiSetAccessToken(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    navigate("/auth");
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
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
      handleClientLogout();
    });
  }, [handleClientLogout]);

  // Silent authentication boot check
  useEffect(() => {
    let isMounted = true;
    const initializeAuth = async () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      if (isAuthenticated) {
        try {
          // This will trigger the response interceptor automatically if token is missing/expired,
          // fetching me and refreshing token reactively.
          const response = await authApi.me();
          if (isMounted) {
            setUser(response.user);
          }
        } catch (error) {
          console.error("Failed to restore session:", error);
          if (isMounted) {
            handleClientLogout();
          }
        }
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };

    initializeAuth();
    return () => {
      isMounted = false;
    };
  }, [handleClientLogout]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    
    // Set localStorage flag and sync context + api
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", response.user.name);
    localStorage.setItem("email", response.user.email);
    
    apiSetAccessToken(response.accessToken);
    setAccessTokenState(response.accessToken);
    setUser(response.user);
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        login,
        register,
        logout,
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
