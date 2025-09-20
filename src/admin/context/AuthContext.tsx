import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Check if user is already logged in (localStorage)
    const savedAuth = localStorage.getItem('naturalink-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple authentication check
    if (email === 'admin@gmail.com' && password === 'admin') {
      const authData = {
        user: { email },
        timestamp: Date.now()
      };
      
      localStorage.setItem('naturalink-auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('naturalink-auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};