
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nuwdjlippuptgppbwtjv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d2RqbGlwcHVwdGdwcGJ3dGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODczNDMsImV4cCI6MjA2Njk2MzM0M30.lT82kYpkoYSw7hUPlsvB19kAm3gXpJkmysOp2obPg-0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true // Now properly configured
}
