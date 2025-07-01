
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  userRole: 'student' | 'staff' | null
  signIn: (email: string, password: string, role: 'student' | 'staff') => Promise<void>
  signUp: (email: string, password: string, role: 'student' | 'staff', name: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  isConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<'student' | 'staff' | null>(null)
  const [loading, setLoading] = useState(true)
  const configured = isSupabaseConfigured()

  useEffect(() => {
    if (!configured) {
      setLoading(false)
      return
    }

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
          setUserRole(data?.role || null)
        }
      } catch (error) {
        console.error('Auth error:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
          setUserRole(data?.role || null)
        } catch (error) {
          console.error('Profile fetch error:', error)
        }
      } else {
        setUserRole(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [configured])

  const signUp = async (email: string, password: string, role: 'student' | 'staff', name: string) => {
    if (!configured) {
      throw new Error('Supabase not configured. Please set environment variables.')
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    })

    if (error) throw error

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        name,
        role
      })
    }
  }

  const signIn = async (email: string, password: string, role: 'student' | 'staff') => {
    if (!configured) {
      throw new Error('Supabase not configured. Please set environment variables.')
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
  }

  const signOut = async () => {
    if (!configured) return
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    userRole,
    signIn,
    signUp,
    signOut,
    loading,
    isConfigured: configured
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
