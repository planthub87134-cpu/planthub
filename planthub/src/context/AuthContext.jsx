// PlantHub — Auth Context

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isDemoMode } from '../lib/supabase';

const AuthContext = createContext(null);

// Demo users for when Supabase isn't configured
const DEMO_USERS = {
  customer: { id: 'demo-customer', email: 'john@example.com', name: 'John Doe', role: 'customer', phone: '555-1234' },
  manager: { id: 'demo-manager', email: 'manager@planthub.com', name: 'Plant Manager', role: 'manager', phone: '555-5678' },
  admin: { id: 'demo-admin', email: 'admin@planthub.com', name: 'Admin User', role: 'admin', phone: '555-9012' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          role: session.user.user_metadata?.role || 'customer',
          phone: session.user.phone || '',
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          role: session.user.user_metadata?.role || 'customer',
          phone: session.user.phone || '',
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign up with email & password
  const signUp = async (email, password, name) => {
    if (isDemoMode) {
      setUser({ ...DEMO_USERS.customer, email, name });
      return { error: null };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: 'customer' } },
    });
    return { data, error };
  };

  // Sign in with email & password
  const signIn = async (email, password) => {
    if (isDemoMode) {
      const demoUser = Object.values(DEMO_USERS).find(u => u.email === email) || DEMO_USERS.customer;
      setUser({ ...demoUser, email });
      return { error: null };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    if (isDemoMode) {
      setUser(DEMO_USERS.customer);
      return { error: null };
    }
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    return { data, error };
  };

  // Send phone OTP
  const signInWithPhone = async (phone) => {
    if (isDemoMode) {
      return { error: null };
    }
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    return { data, error };
  };

  // Verify phone OTP
  const verifyOtp = async (phone, token) => {
    if (isDemoMode) {
      setUser({ ...DEMO_USERS.customer, phone });
      return { error: null };
    }
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    if (isDemoMode) {
      setUser(null);
      setSession(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  // Demo login (for quick access buttons)
  const demoLogin = (role) => {
    setUser(DEMO_USERS[role]);
  };

  const value = {
    user,
    session,
    loading,
    isDemoMode,
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
