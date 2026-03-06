// Base user type for authenticated user (minimal info from JWT/session)
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  // Only essential fields needed for the UI immediately after login
  role?: 'user' | 'admin' | 'moderator';
  isEmailVerified?: boolean;
}

// Extended user profile (fetched from API when needed)
export interface UserProfile extends AuthUser {
  bio?: string | null;
  company?: string | null;
  location?: string | null;
  blog?: string | null;
  twitter?: string | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
  isVerified?: boolean;
  isSponsor?: boolean;
  status?: UserStatus;
  organizations?: Organization[];
  pinnedRepositories?: any[];
}

// Login request/response types
export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  user: AuthUser;
}

// Register request types
export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  name?: string;
  acceptTerms?: boolean;
}

export interface RegisterResponse {
  message: string;
  userId: number;
  requiresEmailVerification?: boolean;
}

// Token types
export interface TokenPayload {
  sub: number; // user id
  username: string;
  email: string;
  role?: string;
  exp?: number;
  iat?: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

// Password reset types
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// Email verification types
export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  message: string;
  user: AuthUser;
}

export interface ResendVerificationRequest {
  email: string;
}

// 2FA types
export interface TwoFactorRequest {
  code: string;
  rememberDevice?: boolean;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerifyRequest {
  code: string;
}

export interface TwoFactorDisableRequest {
  password: string;
  code?: string;
}

// OAuth types
export interface OAuthProvider {
  provider: 'github' | 'google' | 'gitlab';
  redirectUri: string;
}

export interface OAuthCallbackParams {
  code: string;
  state?: string;
  provider: string;
}

// Session types
export interface Session {
  id: string;
  userId: number;
  token: string;
  userAgent?: string;
  ipAddress?: string;
  location?: string;
  expiresAt: string;
  createdAt: string;
  lastActiveAt: string;
  isCurrent?: boolean;
}

export interface SessionInfo {
  sessions: Session[];
  currentSessionId: string;
}

// Auth state types
export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  requiresTwoFactor: boolean;
  twoFactorToken?: string;
}

// Auth context type
export interface AuthContextType {
  // State
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  requiresTwoFactor: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithTwoFactor: (code: string, rememberDevice?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<RegisterResponse>;

  // Token management
  refreshToken: () => Promise<void>;
  getToken: () => string | null;

  // Session management
  fetchSessions: () => Promise<Session[]>;
  revokeSession: (sessionId: string) => Promise<void>;
  revokeAllOtherSessions: () => Promise<void>;

  // Email verification
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;

  // Password management
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;

  // 2FA
  setupTwoFactor: () => Promise<TwoFactorSetupResponse>;
  verifyTwoFactor: (code: string) => Promise<void>;
  disableTwoFactor: (password: string, code?: string) => Promise<void>;

  // Profile
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  refreshUser: () => Promise<void>;
}

// API response types
export interface AuthApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Error types
export interface AuthError {
  code: AuthErrorCode;
  message: string;
  field?: string;
  details?: any;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_DISABLED'
  | 'EMAIL_NOT_VERIFIED'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'REFRESH_TOKEN_EXPIRED'
  | 'INVALID_REFRESH_TOKEN'
  | 'USER_NOT_FOUND'
  | 'USER_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'PASSWORD_MISMATCH'
  | 'INVALID_2FA_CODE'
  | '2FA_REQUIRED'
  | '2FA_ALREADY_ENABLED'
  | '2FA_NOT_ENABLED'
  | 'RATE_LIMITED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

// User status type
export interface UserStatus {
  emoji?: string;
  message: string;
  expiresAt?: string;
}

// Organization type (minimal for auth)
export interface Organization {
  id: number;
  login: string;
  name?: string;
  avatar?: string;
  role?: 'member' | 'admin';
}
