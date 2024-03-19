import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hqpvwtzjeikaoeifnslf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcHZ3dHpqZWlrYW9laWZuc2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NjcyNjIsImV4cCI6MjAyNjM0MzI2Mn0.jeoEyEfcbafsuGB9fG-ZgBMhVOd6ZdnZ-ldNYaKJTEc'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)