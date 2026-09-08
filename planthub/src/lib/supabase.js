// PlantHub — Supabase Client

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Demo mode flag — when Supabase isn't configured
export const isDemoMode = !supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === 'your-project-url-here' || 
  supabaseAnonKey === 'your-anon-key-here';

// Create client only if credentials exist
export const supabase = isDemoMode
  ? null
  : createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
