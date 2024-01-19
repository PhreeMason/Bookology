import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

const supabaseUrl = "https://cvpuiwootgrkpdpgefhy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cHVpd29vdGdya3BkcGdlZmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2OTE3ODYsImV4cCI6MjAyMDI2Nzc4Nn0.SQlREldRmpc656fTtlsoLWTubr-2jzMxkh6GiPT__m4"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})