import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import apiClient from "../api/apiClient";

const AuthContext = createContext(null);

const TOKEN_KEY = "budgetBuddyToken";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] =
    useState(true);
  const [authError, setAuthError] =
    useState("");

  const refreshCurrentUser = async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setUser(null);
      return null;
    }

    try {
      setAuthError("");

      const response = await apiClient.get(
        "/auth/me"
      );

      setUser(response.data.user);

      return response.data.user;
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);

      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshCurrentUser();
      } catch (error) {
        setAuthError(
          error.response?.data?.message ||
            "Your session could not be restored."
        );
      } finally {
        setAuthLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (formData) => {
    try {
      setAuthError("");

      const response = await apiClient.post(
        "/auth/register",
        formData
      );

      localStorage.setItem(
        TOKEN_KEY,
        response.data.token
      );

      setUser(response.data.user);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to create your account.";

      setAuthError(message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      setAuthError("");

      const response = await apiClient.post(
        "/auth/login",
        credentials
      );

      localStorage.setItem(
        TOKEN_KEY,
        response.data.token
      );

      setUser(response.data.user);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to log in.";

      setAuthError(message);
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setAuthError("");

      const response = await apiClient.put(
        "/auth/profile",
        profileData
      );

      setUser(response.data.user);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to update your profile.";

      setAuthError(message);
      throw error;
    }
  };

  const changePassword = async (
    passwordData
  ) => {
    try {
      setAuthError("");

      const response = await apiClient.put(
        "/auth/change-password",
        passwordData
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to change your password.";

      setAuthError(message);
      throw error;
    }
  };

  const clearAuthError = () => {
    setAuthError("");
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);

    setUser(null);
    setAuthError("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authError,
        isAuthenticated: Boolean(user),
        register,
        login,
        logout,
        refreshCurrentUser,
        updateProfile,
        changePassword,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};