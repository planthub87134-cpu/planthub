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
  // Initialize from localStorage to persist across refreshes
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('planthub_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);

  // New register function that saves the user and also logs them in
  const register = (userData) => {
    const newUser = { id: 'local-user-' + Date.now(), role: 'customer', ...userData };
    setUser(newUser);
    localStorage.setItem('planthub_user', JSON.stringify(newUser));
    
    // Add to registered users list
    const savedUsers = localStorage.getItem('planthub_registered_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    users.push(newUser);
    localStorage.setItem('planthub_registered_users', JSON.stringify(users));
    
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('planthub_user');
  };

  const login = async (email, password) => {
    // 1. Check Admin
    if (email === 'admin@planthub.com' && password === 'admin123') {
      const adminUser = { id: 'admin-user', role: 'admin', email, name: 'Admin User', phone: '555-9012' };
      setUser(adminUser);
      localStorage.setItem('planthub_user', JSON.stringify(adminUser));
      return { error: null };
    }
    
    // 2. Check registered local users
    const savedUsers = localStorage.getItem('planthub_registered_users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const foundUser = users.find(u => u.email === email && u.password === password);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('planthub_user', JSON.stringify(foundUser));
        return { error: null };
      }
    }

    return { error: { message: 'Invalid email or password' } };
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
