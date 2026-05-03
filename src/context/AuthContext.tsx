import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { AuthUser, UserRole } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'usns_auth_token';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    Cookies.remove(TOKEN_KEY);
    setUser(null);
    window.location.href = '/login/user';
  }, []);

  // Mock login for now
  const login = async (credentials: { username: string; password?: string; role: UserRole }) => {
    // Check for admin/admin
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const mockUser: AuthUser = {
        id: '1',
        username: 'admin',
        email: 'admin@zuj.edu.jo',
        role: credentials.role,
        isFirstLogin: false,
        facultyName: credentials.role === UserRole.DEAN ? 'Faculty of Engineering' : undefined,
        departmentName: credentials.role === UserRole.HOD ? 'Software Engineering' : undefined,
      };

      Cookies.set(TOKEN_KEY, 'mock-jwt-token', { expires: 1/48 }); // 30 mins
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials. Use admin/admin for this simulation.');
    }
  };

  const isRole = (role: UserRole) => user?.role === role;
  const hasAnyRole = (roles: UserRole[]) => user ? roles.includes(user.role) : false;

  // Inactivity Timer
  useEffect(() => {
    if (!user) return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('Session expired due to inactivity');
        logout();
      }, SESSION_TIMEOUT);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user, logout]);

  // Initial Auth Check
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get(TOKEN_KEY);
      if (token) {
        // Simulate API call to get user profile
        setTimeout(() => {
          // Default mock user for testing
          setUser({
            id: '1',
            username: 'admin',
            email: 'admin@zuj.edu.jo',
            role: UserRole.PRESIDENT,
            isFirstLogin: false,
          });
          setIsLoading(false);
        }, 500);
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      isRole,
      hasAnyRole
    }}>
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
