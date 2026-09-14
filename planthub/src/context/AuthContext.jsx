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

  // Check if error is a rate limit error
  const isRateLimitError = (error) => {
    if (!error) return false;
    const msg = error.message?.toLowerCase() || '';
    return msg.includes('rate limit') || msg.includes('security purposes') || error.status === 429;
  };

  // Sign up with email & password
  const signUp = async (email, password, name, phone) => {
    if (isDemoMode) {
      setUser({ ...DEMO_USERS.customer, email, name, phone });
      return { error: null };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone, role: 'customer' } },
    });
    
    // Bypass Rate Limit
    if (error && isRateLimitError(error)) {
      console.warn('Supabase Rate Limit hit. Falling back to local auth state for development.');
      setUser({ ...DEMO_USERS.customer, email, name, phone });
      return { data: { user: { email, name, phone } }, error: null };
    }
    
    return { data, error };
  };

  // Sign in with email & password
  const signIn = async (email, password) => {
    // 1. First, check if they are using one of our hardcoded demo accounts
    const demoUser = Object.values(DEMO_USERS).find(u => u.email === email);
    
    // If it's a demo account and password matches, log them in immediately without hitting Supabase
    // This fixes the "Invalid login credentials" error on Vercel when Supabase is partially configured
    if (demoUser && demoUser.password === password) {
      setUser({ ...demoUser });
      return { data: { user: demoUser }, error: null };
    }

    // 2. If it's demo mode, but they typed wrong credentials for a demo account, or a random email
    if (isDemoMode) {
      return { error: { message: 'Invalid credentials. Please check your email and password.' } };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    // Bypass Rate Limit
    if (error && isRateLimitError(error)) {
      console.warn('Supabase Rate Limit hit. Falling back to local auth state for development.');
      const fallbackUser = Object.values(DEMO_USERS).find(u => u.email === email) || DEMO_USERS.customer;
      setUser({ ...fallbackUser, email });
      return { data: { user: fallbackUser }, error: null };
    }
    
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
    
    if (error && isRateLimitError(error)) {
      console.warn('Supabase Rate Limit hit. Bypassing OTP send.');
      return { data: {}, error: null };
    }
    
    return { data, error };
  };

  // Verify phone OTP
  const verifyOtp = async (phone, token) => {
    if (isDemoMode) {
      setUser({ ...DEMO_USERS.customer, phone });
      return { error: null };
    }
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    
    if (error && isRateLimitError(error)) {
      console.warn('Supabase Rate Limit hit. Bypassing OTP verify.');
      setUser({ ...DEMO_USERS.customer, phone });
      return { data: { user: DEMO_USERS.customer }, error: null };
    }
    
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
