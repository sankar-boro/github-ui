import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // User,
  // Lock,
  // Bell,
  // Shield,
  // Key,
  // LogOut,
  // AlertTriangle,
  // CheckCircle,
  // Github,
  // Globe,
  // Palette,
  // Code2,
  // ChevronRight,
  Mail,
  Eye,
  EyeOff,
  Camera,
  Save,
  Trash2,
  Twitter,
  Link as LinkIcon,
  MapPin,
  Building,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
// import Tabs from '../components/common/Tabs';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Alert from '../components/common/Alert';
import Skeleton from '../components/common/Skeleton';
import type {
  // ProfileSettings,
  Session,
  SSHKey,
  NotificationSettings,
  AppearanceSettings,
} from '../types/settings';
import { mockSessions, mockSSHKeys } from '../data/settings';
import type { User as AuthUser } from '../types';
import { USERS_PROFILE_URL } from '../config';

type SettingsTab =
  | 'profile'
  | 'account'
  | 'notifications'
  | 'security'
  | 'appearance'
  | 'billing';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: {
      mentions: true,
      comments: true,
      pullRequests: true,
      releases: false,
      security: true,
    },
    web: {
      mentions: true,
      comments: true,
      pullRequests: true,
      releases: false,
      security: true,
    },
    desktop: true,
    mobile: false,
  });
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [sshKeys, setSSHKeys] = useState<SSHKey[]>(mockSSHKeys);
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'dark',
    themeColor: 'blue',
    codeTheme: 'github-dark',
    fontSize: 14,
    tabSize: 2,
    wordWrap: true,
    lineNumbers: true,
  });

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Avatar upload
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Two-factor authentication
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  // const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(USERS_PROFILE_URL + '/' + user?.username, {
        method: 'GET',
        credentials: 'include',
      });
      const jsonResponse = await response.json();
      const userProfile = jsonResponse.data.user;
      setProfile(userProfile);
      // Data would be fetched here
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload avatar
      setUploadingAvatar(true);
      // Simulate upload
      setTimeout(() => {
        setUploadingAvatar(false);
        setSuccess('Avatar updated successfully');
      }, 2000);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    // API call to remove avatar
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSessions(sessions.filter((s) => s.id !== sessionId));
      setSuccess('Session revoked successfully');
    } catch (err) {
      setError('Failed to revoke session');
    }
  };

  const handleRevokeAllSessions = async () => {
    if (!confirm('This will sign out all other devices. Continue?')) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSessions(sessions.filter((s) => s.current));
      setSuccess('All other sessions revoked');
    } catch (err) {
      setError('Failed to revoke sessions');
    }
  };

  const handleRemoveSSHKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to remove this SSH key?')) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSSHKeys(sshKeys.filter((k) => k.id !== keyId));
      setSuccess('SSH key removed successfully');
    } catch (err) {
      setError('Failed to remove SSH key');
    }
  };

  const handleDeleteAccount = () => {
    if (!confirm('This action is permanent and cannot be undone. Continue?'))
      return;
    // Navigate to account deletion flow
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'billing', label: 'Billing' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton height="40px" width="200px" className="mb-6" />
        <Skeleton height="400px" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar navigation */}
        <div className="md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <hr className="border-github-border my-2" />

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors"
            >
              Sign out
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(null)}
              className="mb-4"
            >
              {success}
            </Alert>
          )}

          {error && (
            <Alert
              variant="error"
              onClose={() => setError(null)}
              className="mb-4"
            >
              {error}
            </Alert>
          )}

          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Profile</h2>

                {/* Avatar */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <img
                      src={
                        avatarPreview ||
                        user?.avatar ||
                        `https://ui-avatars.com/api/?name=${profile?.full_name}`
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full border border-github-border"
                    />
                    {uploadingAvatar && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          document.getElementById('avatar-upload')?.click()
                        }
                        icon={<Camera size={16} />}
                      >
                        Upload new photo
                      </Button>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveAvatar}
                        icon={<Trash2 size={16} />}
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400">
                      Square image recommended. Max size 5MB.
                    </p>
                  </div>
                </div>

                {/* Profile form */}
                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={profile?.full_name}
                    // onChange={(e) =>
                    //   setProfile({ ...profile, name: e.target.value })
                    // }
                    fullWidth
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={profile?.bio}
                      // onChange={(e) =>
                      //   setProfile({ ...profile, bio: e.target.value })
                      // }
                      rows={4}
                      className="w-full bg-gray-900 border border-github-border rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <Input
                    label="Company"
                    value={profile?.company}
                    // onChange={(e) =>
                    //   setProfile({ ...profile, company: e.target.value })
                    // }
                    leftIcon={<Building size={16} />}
                    fullWidth
                  />

                  <Input
                    label="Location"
                    value={profile?.location}
                    // onChange={(e) =>
                    //   setProfile({ ...profile, location: e.target.value })
                    // }
                    leftIcon={<MapPin size={16} />}
                    fullWidth
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={profile?.email}
                    // onChange={(e) =>
                    //   setProfile({ ...profile, email: e.target.value })
                    // }
                    leftIcon={<Mail size={16} />}
                    fullWidth
                  />

                  <Input
                    label="Website"
                    value={profile?.website}
                    // onChange={(e) =>
                    //   setProfile({ ...profile, blog: e.target.value })
                    // }
                    leftIcon={<LinkIcon size={16} />}
                    placeholder="https://example.com"
                    fullWidth
                  />

                  <Input
                    label="Twitter"
                    value={profile?.twitter}
                    // onChange={(e) =>
                    //   setProfile({ ...profile, twitter: e.target.value })
                    // }
                    leftIcon={<Twitter size={16} />}
                    placeholder="username"
                    fullWidth
                  />

                  {/* <Input
                    label="Pronouns"
                    value={profile?.pronouns}
                    // onChange={(e) =>
                    //   setProfile({ ...profile, pronouns: e.target.value })
                    // }
                    placeholder="e.g., he/him, she/her, they/them"
                    fullWidth
                  /> */}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  loading={saving}
                  icon={<Save size={16} />}
                >
                  Save changes
                </Button>
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Account Information
                </h2>

                <div className="bg-github-darker border border-github-border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Username</p>
                      <p className="font-medium">{user?.username}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <Input
                    label="Current password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    rightIcon={
                      showCurrentPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )
                    }
                    onRightIconClick={() =>
                      setShowCurrentPassword(!showCurrentPassword)
                    }
                    fullWidth
                  />

                  <Input
                    label="New password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    rightIcon={
                      showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />
                    }
                    onRightIconClick={() =>
                      setShowNewPassword(!showNewPassword)
                    }
                    fullWidth
                  />

                  <Input
                    label="Confirm new password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    rightIcon={
                      showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )
                    }
                    onRightIconClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    fullWidth
                  />

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" loading={saving}>
                      Update password
                    </Button>
                  </div>
                </form>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 text-red-500">
                  Danger Zone
                </h2>

                <div className="border border-red-500/30 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Delete account</h3>
                      <p className="text-sm text-gray-400">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      onClick={handleDeleteAccount}
                      icon={<Trash2 size={16} />}
                    >
                      Delete account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Email notifications
                </h2>

                <div className="space-y-3">
                  {Object.entries(notifications.email).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            email: {
                              ...notifications.email,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-github-border bg-gray-900"
                      />
                      <span className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Web notifications
                </h2>

                <div className="space-y-3">
                  {Object.entries(notifications.web).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            web: {
                              ...notifications.web,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-github-border bg-gray-900"
                      />
                      <span className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Other notifications
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.desktop}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          desktop: e.target.checked,
                        })
                      }
                      className="rounded border-github-border bg-gray-900"
                    />
                    <span className="text-sm">Desktop notifications</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.mobile}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          mobile: e.target.checked,
                        })
                      }
                      className="rounded border-github-border bg-gray-900"
                    />
                    <span className="text-sm">Mobile push notifications</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  loading={saving}
                  icon={<Save size={16} />}
                >
                  Save preferences
                </Button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Two-factor authentication
                </h2>

                <div className="bg-github-darker border border-github-border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Two-factor authentication
                      </h3>
                      <p className="text-sm text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button
                      variant={twoFactorEnabled ? 'secondary' : 'primary'}
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    >
                      {twoFactorEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Active sessions</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRevokeAllSessions}
                  >
                    Revoke all
                  </Button>
                </div>

                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-github-darker border border-github-border rounded-md p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {session.browser}
                            </span>
                            {session.current && (
                              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                                Current session
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            {session.os} · {session.ip} · {session.location}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Last active:{' '}
                            {new Date(session.lastActive).toLocaleString()}
                          </p>
                        </div>

                        {!session.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokeSession(session.id)}
                          >
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">SSH keys</h2>
                  <Button variant="primary" size="sm">
                    Add SSH key
                  </Button>
                </div>

                <div className="space-y-3">
                  {sshKeys.map((key) => (
                    <div
                      key={key.id}
                      className="bg-github-darker border border-github-border rounded-md p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{key.title}</h3>
                          <p className="text-sm text-gray-400">
                            {key.fingerprint}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Added: {new Date(key.addedAt).toLocaleDateString()}{' '}
                            · Last used:{' '}
                            {new Date(key.lastUsed).toLocaleDateString()}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSSHKey(key.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Theme</h2>

                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() =>
                      setAppearance({ ...appearance, theme: 'light' })
                    }
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      appearance.theme === 'light'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-github-border hover:bg-gray-800'
                    }`}
                  >
                    <Sun size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Light</span>
                  </button>

                  <button
                    onClick={() =>
                      setAppearance({ ...appearance, theme: 'dark' })
                    }
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      appearance.theme === 'dark'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-github-border hover:bg-gray-800'
                    }`}
                  >
                    <Moon size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Dark</span>
                  </button>

                  <button
                    onClick={() =>
                      setAppearance({ ...appearance, theme: 'system' })
                    }
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      appearance.theme === 'system'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-github-border hover:bg-gray-800'
                    }`}
                  >
                    <Monitor size={24} className="mx-auto mb-2" />
                    <span className="text-sm">System</span>
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Theme color</h2>

                <div className="flex gap-2">
                  {(['blue', 'purple', 'green', 'orange', 'red'] as const).map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setAppearance({ ...appearance, themeColor: color })
                        }
                        className={`w-8 h-8 rounded-full transition-all ${
                          appearance.themeColor === color
                            ? 'ring-2 ring-offset-2 ring-offset-github-dark'
                            : ''
                        }`}
                        style={{
                          backgroundColor:
                            color === 'blue'
                              ? '#3b82f6'
                              : color === 'purple'
                                ? '#a855f7'
                                : color === 'green'
                                  ? '#22c55e'
                                  : color === 'orange'
                                    ? '#f97316'
                                    : '#ef4444',
                          ringColor:
                            color === 'blue'
                              ? '#3b82f6'
                              : color === 'purple'
                                ? '#a855f7'
                                : color === 'green'
                                  ? '#22c55e'
                                  : color === 'orange'
                                    ? '#f97316'
                                    : '#ef4444',
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Code preferences</h2>

                <div className="space-y-4">
                  <Select
                    label="Code theme"
                    value={appearance.codeTheme}
                    onChange={(value) =>
                      setAppearance({ ...appearance, codeTheme: value as any })
                    }
                    options={[
                      { value: 'github-light', label: 'GitHub Light' },
                      { value: 'github-dark', label: 'GitHub Dark' },
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                    ]}
                    fullWidth
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Font size"
                      type="number"
                      value={appearance.fontSize}
                      onChange={(e) =>
                        setAppearance({
                          ...appearance,
                          fontSize: parseInt(e.target.value),
                        })
                      }
                      min={8}
                      max={24}
                      fullWidth
                    />

                    <Input
                      label="Tab size"
                      type="number"
                      value={appearance.tabSize}
                      onChange={(e) =>
                        setAppearance({
                          ...appearance,
                          tabSize: parseInt(e.target.value),
                        })
                      }
                      min={2}
                      max={8}
                      fullWidth
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={appearance.wordWrap}
                        onChange={(e) =>
                          setAppearance({
                            ...appearance,
                            wordWrap: e.target.checked,
                          })
                        }
                        className="rounded border-github-border bg-gray-900"
                      />
                      <span className="text-sm">Wrap lines</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={appearance.lineNumbers}
                        onChange={(e) =>
                          setAppearance({
                            ...appearance,
                            lineNumbers: e.target.checked,
                          })
                        }
                        className="rounded border-github-border bg-gray-900"
                      />
                      <span className="text-sm">Show line numbers</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  loading={saving}
                  icon={<Save size={16} />}
                >
                  Save preferences
                </Button>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-github-darker border border-github-border rounded-md p-6 text-center">
                <h2 className="text-lg font-semibold mb-2">
                  GitHub Clone Free
                </h2>
                <p className="text-gray-400 mb-4">
                  You're currently on the free plan
                </p>
                <Button variant="primary">View upgrade options</Button>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Payment methods</h3>
                <p className="text-gray-400 text-sm">
                  No payment methods on file
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Billing history</h3>
                <p className="text-gray-400 text-sm">No billing history</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
