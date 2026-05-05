import React, { createContext, useContext } from 'react';
import type { User } from '../types';
import {
  useInitAuthUser,
  useLogin,
  useLogout,
  useRefreshToken,
  useRegister,
  useUpdateUser,
} from '../hooks/Auth';
import type { RegisterData, AuthContextType } from '../types/auth';

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (userData: RegisterData) => Promise<void>;
//   updateUser: (userData: Partial<User>) => Promise<void>;
//   refreshUserToken: () => Promise<{
//     user: User | null;
//     isAuthenticated: boolean;
//   }>;
//   isAuthenticated: boolean;
// }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Refresh the access token
  const [
    user,
    isLoading,
    error,
    setUser,
    setIsLoading,
    setError,
    refreshUserToken,
  ] = useInitAuthUser();

  // Login function
  const login = useLogin(setUser, setError, setIsLoading);

  // Register function
  const register = useRegister(setUser, setError, setIsLoading);

  // Logout function
  const logout = useLogout(setUser, setError, setIsLoading);

  // Update user information
  const updateUser = useUpdateUser(user, setUser, setError, setIsLoading);

  // Helper function to get auth header

  // if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        register,
        updateUser,
        refreshUserToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom hook for making authenticated API calls
export const useAuthenticatedAPI = () => {
  const { refreshUserToken, logout } = useAuth();

  const authenticatedFetch = async (
    url: string,
    options: RequestInit = {},
  ): Promise<Response> => {
    let token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    // Check if token is expired and try to refresh
    const isExpired = () => {
      try {
        const decoded = JSON.parse(atob(token!.split('.')[1]));
        return decoded.exp < Date.now() / 1000;
      } catch {
        return true;
      }
    };

    if (isExpired()) {
      const refreshed = await refreshUserToken();
      if (!refreshed) {
        await logout();
        throw new Error('Session expired. Please login again.');
      }
      token = localStorage.getItem('token');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized - token might be invalid
    if (response.status === 401) {
      await logout();
      throw new Error('Session expired. Please login again.');
    }

    return response;
  };

  return { authenticatedFetch };
};
