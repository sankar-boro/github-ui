import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { User } from '../types';
import {
  REFRESH_TOKEN_URL,
  VALIDATE_TOKEN_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  USERS_PROFILE_URL,
} from '../config';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshUserToken: () => Promise<{
    user: User | null;
    isAuthenticated: boolean;
  }>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  [key: string]: any;
}

interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to parse JWT and check expiration
  const parseJwt = (token: string): TokenPayload | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  // Check if token is expired
  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    const decoded = parseJwt(token);
    if (!decoded) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  // Refresh the access token
  const refreshUserToken = useCallback(async (): Promise<{
    user: User | null;
    isAuthenticated: boolean;
  }> => {
    try {
      // const refreshToken = localStorage.getItem('refreshToken');
      // if (!refreshToken) return false;

      const response = await fetch(REFRESH_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      // if (data.refreshToken) {
      //   localStorage.setItem('refreshToken', data.refreshToken);
      // }

      return {
        user: data.data,
        isAuthenticated: true,
      };
    } catch (error) {
      console.error('Token refresh failed:', error);

      return {
        user: null,
        isAuthenticated: false,
      };
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      // const refreshToken = localStorage.getItem('refreshToken');

      // if (!token || !storedUser) {
      //   setIsLoading(false);
      //   return;
      // }

      // Check if token is expired
      if (isTokenExpired(token)) {
        // Try to refresh the token
        const refreshed = await refreshUserToken();
        if (!refreshed) {
          // If refresh fails, clear everything
          // localStorage.removeItem('token');
          // localStorage.removeItem('refreshToken');
          // localStorage.removeItem('user');
          setIsLoading(false);
          return;
        } else {
          setUser(refreshed.user);
          return;
        }
      }

      // Validate token with backend
      try {
        const response = await fetch(VALIDATE_TOKEN_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const userData = storedUser && JSON.parse(storedUser);
          setUser(userData);
        } else {
          // Token invalid, clear storage
          // localStorage.removeItem('token');
          // localStorage.removeItem('refreshToken');
          // localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth validation failed:', error);
        // Don't clear on network error, keep existing state
        const userData = storedUser && JSON.parse(storedUser);
        setUser(userData);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [refreshUserToken]);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username_or_email: email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const {
        token,
        refreshToken: newRefreshToken,
        user,
      } = data.data as LoginResponse;

      // Store tokens
      localStorage.setItem('token', token);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const {
        token,
        refreshToken: newRefreshToken,
        user,
      } = data as LoginResponse;

      localStorage.setItem('token', token);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      if (token) {
        // Notify backend about logout (optional)
        await fetch(LOGOUT_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).catch((err) => console.error('Logout API call failed:', err));
      }
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsLoading(false);
    }
  };

  // Update user information
  const updateUser = async (userData: Partial<User>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(USERS_PROFILE_URL, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user');
      }

      // Update stored user
      const updatedUser = { ...user, ...data.user } as User;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to update user',
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get auth header
  const getAuthHeader = useCallback((): HeadersInit => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  if (isLoading) return null;

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
