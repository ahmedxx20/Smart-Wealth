import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Hardcoded — project moved off Lovable Cloud onto user's own Supabase project.
const SUPABASE_URL = 'https://qoxtfiqzuwsmwmcykhju.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_fPs8nRoBd3c0XZe7gOQD_g_p_UbOIxP';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
