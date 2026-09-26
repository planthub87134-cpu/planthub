// PlantHub — Auth Context

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isDemoMode } from '../lib/supabase';

const AuthContext = createContext(null);

// Demo users for when Supabase isn't configured
const DEMO_USERS = {
  customer: { id: 'demo-customer', email: 'user@example.com', name: 'John Doe', role: 'customer', phone: '555-1234', password: 'user123' },
  manager: { id: 'demo-manager', email: 'manager@planthub.com', name: 'Plant Manager', role: 'manager', phone: '555-5678', password: 'manager123' },
  admin: { id: 'demo-admin', email: 'admin@planthub.com', name: 'Admin User', role: 'admin', phone: '555-9012', password: 'admin123' },
  agent: { id: 'demo-agent', email: 'agent@planthub.com', name: 'Support Agent', role: 'agent', phone: '555-3333', password: 'agent123' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('planthub_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      setLoading(false);
      return;
    }

    // Initialize Supabase session
    supabase.auth.getSession().then(({ data: { session: sbSession } }) => {
      setSession(sbSession);
      if (sbSession?.user) {
        setUser({
          id: sbSession.user.id,
          email: sbSession.user.email,
          name: sbSession.user.user_metadata?.name || sbSession.user.email?.split('@')[0] || 'User',
          role: sbSession.user.user_metadata?.role || 'customer',
          phone: sbSession.user.user_metadata?.phone || '',
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sbSession) => {
      setSession(sbSession);
      if (sbSession?.user) {
        setUser({
          id: sbSession.user.id,
          email: sbSession.user.email,
          name: sbSession.user.user_metadata?.name || sbSession.user.email?.split('@')[0] || 'User',
          role: sbSession.user.user_metadata?.role || 'customer',
          phone: sbSession.user.user_metadata?.phone || '',
        });
      } else {
        // Only clear user if we are not falling back to a demo user
        const saved = localStorage.getItem('planthub_user');
        if (!saved || !Object.values(DEMO_USERS).find(u => u.id === JSON.parse(saved).id)) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (userData) => {
    if (isDemoMode) {
      const newUser = { id: 'local-user-' + Date.now(), role: userData.role || 'customer', ...userData };
      setUser(newUser);
      localStorage.setItem('planthub_user', JSON.stringify(newUser));
      const savedUsers = localStorage.getItem('planthub_registered_users');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      users.push(newUser);
      localStorage.setItem('planthub_registered_users', JSON.stringify(users));
      return { error: null };
    }

    const { email, password, name, phone, role } = userData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
          role: role || 'customer',
          phone: phone || ''
        }
      }
    });

    return { error };
  };

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null);
      localStorage.removeItem('planthub_user');
      return;
    }
    
    // Clear local storage just in case we were on a fallback account
    localStorage.removeItem('planthub_user');
    setUser(null);
    await supabase.auth.signOut();
  };

  const login = async (email, password) => {
    if (isDemoMode) {
      const demoUser = Object.values(DEMO_USERS).find(u => u.email === email && u.password === password);
      if (demoUser) {
        setUser(demoUser);
        localStorage.setItem('planthub_user', JSON.stringify(demoUser));
        return { user: demoUser, error: null };
      }
      const savedUsers = localStorage.getItem('planthub_registered_users');
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('planthub_user', JSON.stringify(foundUser));
          return { user: foundUser, error: null };
        }
      }
      return { user: null, error: { message: 'Invalid email or password' } };
    }

    // Try Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      // Fallback: Check if they are trying to login with a demo user that isn't in Supabase yet
      const demoUser = Object.values(DEMO_USERS).find(u => u.email === email && u.password === password);
      if (demoUser) {
        console.warn("Supabase login failed. Falling back to local demo user.");
        setUser(demoUser);
        localStorage.setItem('planthub_user', JSON.stringify(demoUser));
        return { user: demoUser, error: null };
      }
      return { user: null, error };
    }

    const sbUser = data.user;
    const formattedUser = {
      id: sbUser.id,
      email: sbUser.email,
      name: sbUser.user_metadata?.name || sbUser.email?.split('@')[0] || 'User',
      role: sbUser.user_metadata?.role || 'customer',
      phone: sbUser.user_metadata?.phone || '',
    };
    
    setUser(formattedUser);
    localStorage.setItem('planthub_user', JSON.stringify(formattedUser));
    return { user: formattedUser, error: null };
  };

  // Stub functions to prevent crashes in other components
  const signUp = async () => ({ error: null });
  const signIn = async () => ({ data: { user }, error: null });
  const signInWithGoogle = async () => ({ error: null });
  const signInWithPhone = async () => ({ error: null });
  const verifyOtp = async () => ({ error: null });
  const demoLogin = () => {};

  const value = {
    user,
    session,
    loading,
    isDemoMode,
    register,
    login,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithPhone,
    verifyOtp,
    signOut,
    demoLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
