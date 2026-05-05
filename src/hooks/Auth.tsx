import { useState, useEffect, useCallback, useRef } from 'react';
import type { User } from '../types';
import {
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_TOKEN_URL,
  REGISTER_URL,
  USERS_PROFILE_URL,
  VALIDATE_TOKEN_URL,
} from '../config';
import type { LoginResponse } from '../types/api';
import type { AuthUser, RegisterData } from '../types/auth';

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

// const getAuthHeader = useCallback((): HeadersInit => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }, []);

// Helper function to parse JWT and check expiration
export const parseJwt = (token: string): TokenPayload | null => {
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
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const decoded = parseJwt(token);
  if (!decoded) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const useInitAuthUser = (): [
  AuthUser | null,
  boolean,
  string | null,
  React.Dispatch<React.SetStateAction<AuthUser | null>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<string | null>>,
  () => Promise<{
    user: AuthUser | null;
    isAuthenticated: boolean;
  }>,
] => {
  const started = useRef(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const refreshUserToken = useRefreshToken();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('init auth');
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
          console.log('Token refreshed');
          setUser(refreshed.user);
          setIsLoading(false);
          return;
        }
      }

      // Validate token with backend
      try {
        const response = await fetch(VALIDATE_TOKEN_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const userData = storedUser && JSON.parse(storedUser);
          setUser(userData);
          setIsLoading(false);
        } else {
          // Token invalid, clear storage
          // localStorage.removeItem('token');
          // localStorage.removeItem('refreshToken');
          // localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth validation failed:', error);
        // Don't clear on network error, keep existing state
        // const userData = storedUser && JSON.parse(storedUser);
        // setUser(userData);
      }
    };

    if (started.current === false) {
      started.current = true;
      initializeAuth();
    }
  }, []);

  return [
    user,
    isLoading,
    error,
    setUser,
    setIsLoading,
    setError,
    refreshUserToken,
  ];
};
export const useRefreshToken = () => {
  return useCallback(async (): Promise<{
    user: AuthUser | null;
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
      console.log('-=sd-f=s', data);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      // if (data.refreshToken) {
      //   localStorage.setItem('refreshToken', data.refreshToken);
      // }

      return {
        user: data.data.user,
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
};

export const useLogin = (
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return async function lo(email: string, password: string) {
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
};

export const useRegister = (
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return async function lo(userData: RegisterData) {
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
};

export const useLogout = (
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return async function () {
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
          credentials: 'include',
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
};

export const useUpdateUser = (
  user: AuthUser | null,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return async function (userData: any) {
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
      const updatedUser = { ...user, ...data.user } as AuthUser;
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
};
