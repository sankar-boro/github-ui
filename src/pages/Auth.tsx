import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Alert from "../components/common/Alert";

interface AuthFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      } else if (!/^[a-zA-Z0-9-]+$/.test(formData.username)) {
        newErrors.username =
          "Username can only contain letters, numbers, and hyphens";
      }

      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isLogin) {
        // Login
        // const response = await authApi.login({
        //   username: formData.username,
        //   password: formData.password,
        // });

        // Mock successful login
        login("fake-jwt-token", {
          id: 1,
          username: formData.username || "john-doe",
          email: formData.email || "john@example.com",
          name: "John Doe",
          avatar: `https://ui-avatars.com/api/?name=${formData.username || "John+Doe"}`,
        });

        navigate("/");
      } else {
        // Register
        // const response = await authApi.register(formData);

        setSuccessMessage(
          "Account created successfully! Please check your email to verify your account.",
        );

        // Switch to login after successful registration
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (err: any) {
      setErrors({
        general:
          err.response?.data?.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccessMessage(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleGithubLogin = () => {
    // Redirect to GitHub OAuth
    window.location.href = "/api/auth/github";
  };

  return (
    <div className="min-h-screen bg-github-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Github size={48} className="mx-auto text-white" />
          <h2 className="mt-6 text-3xl font-bold text-white">
            {isLogin ? "Sign in to GitHub Clone" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="text-blue-400 hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Success message */}
        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage(null)}
            className="mb-4"
          >
            {successMessage}
          </Alert>
        )}

        {/* Error message */}
        {errors.general && (
          <Alert
            variant="error"
            onClose={() =>
              setErrors((prev) => ({ ...prev, general: undefined }))
            }
            className="mb-4"
          >
            {errors.general}
          </Alert>
        )}

        {/* Auth form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <>
                <Input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  leftIcon={<User size={16} />}
                  error={errors.username}
                  fullWidth
                  autoComplete="username"
                />

                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  leftIcon={<Mail size={16} />}
                  error={errors.email}
                  fullWidth
                  autoComplete="email"
                />
              </>
            )}

            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              leftIcon={<Lock size={16} />}
              rightIcon={
                showPassword ? <EyeOff size={16} /> : <Eye size={16} />
              }
              onRightIconClick={() => setShowPassword(!showPassword)}
              error={errors.password}
              fullWidth
              autoComplete={isLogin ? "current-password" : "new-password"}
            />

            {!isLogin && (
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                leftIcon={<Lock size={16} />}
                rightIcon={
                  showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />
                }
                onRightIconClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={errors.confirmPassword}
                fullWidth
                autoComplete="new-password"
              />
            )}
          </div>

          {isLogin && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              {isLogin ? "Sign in" : "Create account"}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-github-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-github-dark text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social login */}
          <Button
            type="button"
            variant="secondary"
            fullWidth
            size="lg"
            onClick={handleGithubLogin}
            icon={<Github size={16} />}
          >
            Sign in with GitHub
          </Button>

          {/* Terms */}
          {!isLogin && (
            <p className="text-xs text-center text-gray-400">
              By creating an account, you agree to our{" "}
              <a href="/terms" className="text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          )}
        </form>

        {/* Password requirements (for signup) */}
        {!isLogin && (
          <div className="bg-github-darker border border-github-border rounded-md p-4 mt-4">
            <h3 className="text-sm font-medium mb-2">Password requirements:</h3>
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="flex items-center gap-1">
                {formData.password.length >= 8 ? (
                  <CheckCircle size={12} className="text-green-500" />
                ) : (
                  <AlertCircle size={12} className="text-gray-500" />
                )}
                At least 8 characters
              </li>
              <li className="flex items-center gap-1">
                {/[A-Z]/.test(formData.password) ? (
                  <CheckCircle size={12} className="text-green-500" />
                ) : (
                  <AlertCircle size={12} className="text-gray-500" />
                )}
                At least one uppercase letter
              </li>
              <li className="flex items-center gap-1">
                {/[a-z]/.test(formData.password) ? (
                  <CheckCircle size={12} className="text-green-500" />
                ) : (
                  <AlertCircle size={12} className="text-gray-500" />
                )}
                At least one lowercase letter
              </li>
              <li className="flex items-center gap-1">
                {/[0-9]/.test(formData.password) ? (
                  <CheckCircle size={12} className="text-green-500" />
                ) : (
                  <AlertCircle size={12} className="text-gray-500" />
                )}
                At least one number
              </li>
              <li className="flex items-center gap-1">
                {formData.password === formData.confirmPassword &&
                formData.confirmPassword ? (
                  <CheckCircle size={12} className="text-green-500" />
                ) : (
                  <AlertCircle size={12} className="text-gray-500" />
                )}
                Passwords match
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
