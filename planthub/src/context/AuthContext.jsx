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
  // Always logged in as an admin for full access without login pages
  const [user, setUser] = useState(DEMO_USERS.admin);
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);

  // Stub functions to prevent crashes in other components
  const signUp = async () => ({ error: null });
  const signIn = async () => ({ data: { user }, error: null });
  const signInWithGoogle = async () => ({ error: null });
  const signInWithPhone = async () => ({ error: null });
  const verifyOtp = async () => ({ error: null });
  const signOut = async () => {};
  const demoLogin = () => {};



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
