// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// We use the Non-Null Assertion (!) because we checked our .env file
// and we want TypeScript to know these strings definitely exist.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Standard client configuration
export const supabase = createClient(supabaseUrl, supabaseKey);
