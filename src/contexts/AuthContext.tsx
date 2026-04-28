import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@onyx_session';
const API_URL = 'https://onyx-admin-seven.vercel.app';

interface MockUser {
  id: string;
  username: string;
  email: string;
}

interface MockSession {
  user: MockUser;
  token?: string;
}

interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  loading: boolean;
  isVerified: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null; message?: string }>;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  setVerified: (value: boolean) => void;
}

const BUILTIN_ACCOUNTS: Record<string, { password: string; user: MockUser }> = {
  test: {
    password: 'test',
    user: { id: 'test-user', username: 'test', email: 'test@onyx.app' },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY).then((raw) => {
      if (raw) {
        try {
          const saved: MockSession = JSON.parse(raw);
          setSession(saved);
          setUser(saved.user);
          setIsVerified(true);
        } catch {}
      }
      setLoading(false);
    });
  }, []);

  const signUp = async (email: string, password: string): Promise<{ error: Error | null; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: new Error(data.error || '회원가입 중 오류가 발생했습니다.') };
      }
      return { error: null, message: data.message };
    } catch {
      return { error: new Error('서버에 연결할 수 없습니다.') };
    }
  };

  const signIn = async (username: string, password: string): Promise<{ error: Error | null }> => {
    // Builtin test account — always works without server
    const builtin = BUILTIN_ACCOUNTS[username];
    if (builtin && builtin.password === password) {
      const newSession: MockSession = { user: builtin.user };
      setSession(newSession);
      setUser(builtin.user);
      setIsVerified(true);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
      return { error: null };
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await res.json();

      if (res.status === 403) {
        return { error: new Error(data.error || '아직 관리자 승인 대기 중입니다.') };
      }
      if (!res.ok) {
        return { error: new Error(data.error || '아이디 또는 비밀번호가 올바르지 않습니다.') };
      }

      const mockUser: MockUser = {
        id: data.user.id,
        username: data.user.name,
        email: data.user.email,
      };
      const newSession: MockSession = { user: mockUser, token: data.token };
      setSession(newSession);
      setUser(mockUser);
      setIsVerified(true);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
      return { error: null };
    } catch {
      return { error: new Error('서버에 연결할 수 없습니다.') };
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setSession(null);
    setUser(null);
    setIsVerified(false);
  };

  const setVerified = (value: boolean) => setIsVerified(value);

  return (
    <AuthContext.Provider value={{ user, session, loading, isVerified, signUp, signIn, signOut, setVerified }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
