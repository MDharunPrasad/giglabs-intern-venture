
import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  user: { id: string; email: string; name: string } | null
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
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null)
  const [userRole, setUserRole] = useState<'student' | 'staff' | null>(null)
  const [loading, setLoading] = useState(false)

  const signUp = async (email: string, password: string, role: 'student' | 'staff', name: string) => {
    // Simulate signup - in frontend only mode
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name
    }
    setUser(newUser)
    setUserRole(role)
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('userRole', role)
  }

  const signIn = async (email: string, password: string, role: 'student' | 'staff') => {
    // Simulate signin - in frontend only mode
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0]
    }
    setUser(mockUser)
    setUserRole(role)
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(mockUser))
    localStorage.setItem('userRole', role)
  }

  const signOut = async () => {
    setUser(null)
    setUserRole(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
  }

  // Load from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedRole = localStorage.getItem('userRole')
    
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser))
      setUserRole(savedRole as 'student' | 'staff')
    }
  }, [])

  const value = {
    user,
    userRole,
    signIn,
    signUp,
    signOut,
    loading,
    isConfigured: true // Frontend always configured
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
