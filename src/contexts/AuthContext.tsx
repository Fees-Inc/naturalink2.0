import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient, setAuthToken } from '@/services/apiClient';

export type UserRole = 'consumer' | 'producer' | 'distributor' | 'admin';

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  role: UserRole;
  location?: string;
  phone?: string;
  avatar_url?: string;
  is_verified: boolean;
  kyc_status: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  signUp: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    role?: UserRole
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any; profile?: Profile | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const missingProviderError = new Error('AuthProvider is missing. Wrap your app with <AuthProvider>.');

const fallbackAuthContext: AuthContextType = {
  user: null,
  profile: null,
  loading: false,
  isAuthenticated: false,
  hasRole: () => false,
  signUp: async () => ({ error: missingProviderError }),
  signIn: async () => ({ error: missingProviderError, profile: null }),
  signOut: async () => {
    // no-op
  },
  updateProfile: async () => ({ error: missingProviderError }),
};

let didWarnMissingProvider = false;

const AuthContext = createContext<AuthContextType>(fallbackAuthContext);

/** Connexion démo sans backend (présentation) */
export const DEMO_AUTH_TOKEN = 'naturalink-demo-session';

const DEMO_PASSWORD = 'demo2026';

function buildDemoAdminProfile(email: string): Profile {
  return {
    id: 'profile-demo-admin',
    user_id: 'user-demo-admin',
    email,
    first_name: 'Admin',
    last_name: 'Démo',
    company_name: 'Naturalink',
    role: 'admin',
    location: 'Abidjan, Côte d\'Ivoire',
    phone: '+225 01 03 57 59 66',
    is_verified: true,
    kyc_status: 'verified',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = typeof window !== 'undefined' ? window.localStorage.getItem('naturalink_auth_token') : null;
      if (token === DEMO_AUTH_TOKEN) {
        const email = window.localStorage.getItem('naturalink_demo_email') || 'demo@naturalink.ci';
        setUser({ id: 'user-demo-admin', email });
        setProfile(buildDemoAdminProfile(email));
        setLoading(false);
        return;
      }

      try {
        const authData = await apiClient.get<{ user: AuthUser; profile: Profile }>('/auth/me');
        setUser(authData.user);
        setProfile(authData.profile);
      } catch {
        setAuthToken(null);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    role: UserRole = 'consumer',
  ) => {
    try {
      const data = await apiClient.post<{ access_token: string; user: AuthUser; profile: Profile }>('/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        role,
      });

      setAuthToken(data.access_token);
      setUser(data.user);
      setProfile(data.profile);
      return { error: null };
    } catch (error: any) {
      return { error: error?.response?.data?.message || error?.message || 'Unable to sign up' };
    }
  };

  const signIn = async (email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    const isDemoEmail =
      normalized === 'demo@naturalink.ci' ||
      normalized === 'admin@naturalink.ci' ||
      normalized === 'admin@gmail.com';

    if (isDemoEmail && password === DEMO_PASSWORD) {
      setAuthToken(DEMO_AUTH_TOKEN);
      window.localStorage.setItem('naturalink_demo_email', email.trim());
      const demoProfile = buildDemoAdminProfile(email.trim());
      setUser({ id: 'user-demo-admin', email: email.trim() });
      setProfile(demoProfile);
      return { error: null, profile: demoProfile };
    }

    try {
      const data = await apiClient.post<{ access_token: string; user: AuthUser; profile: Profile }>('/auth/login', {
        email,
        password,
      });

      setAuthToken(data.access_token);
      setUser(data.user);
      setProfile(data.profile);
      return { error: null, profile: data.profile };
    } catch (error: any) {
      return {
        error: error?.response?.data?.message || error?.message || 'Unable to sign in',
        profile: null,
      };
    }
  };

  const signOut = async () => {
    setAuthToken(null);
    window.localStorage.removeItem('naturalink_demo_email');
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const updated = await apiClient.patch<Profile>('/auth/profile', updates);
      setProfile(updated);
      return { error: null };
    } catch (error: any) {
      return { error: error?.response?.data?.message || error?.message || 'Unable to update profile' };
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return profile?.role === role;
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    hasRole,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === fallbackAuthContext && !didWarnMissingProvider) {
    didWarnMissingProvider = true;
    console.warn('useAuth was called outside <AuthProvider>. Falling back to guest auth state.');
  }

  return context;
}
