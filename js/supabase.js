// js/supabase.js
const SUPABASE_URL = window.__SUPABASE_CONFIG?.url || '';
const SUPABASE_ANON_KEY = window.__SUPABASE_CONFIG?.anonKey || '';

// Expects Supabase script to be loaded via CDN:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

if (!supabase) {
    console.error('Supabase client not initialized. Check your configuration and ensure the CDN script is included.');
}

export { supabase };
