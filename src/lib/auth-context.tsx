"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Actualizar la interfaz User para que coincida con tu estructura de datos
interface User {
  id: string
  email: string
  role: string
  full_name: string
  status: string
  first_time_login: boolean
  created_at: string
  updated_at: string
  institution?: {
    id: string
    name: string
    legal_id: string
    email: string
    website?: string
    description?: string
    logo_url?: string
    status: string
  }
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (userData: User) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuth = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const response = await fetch(`${baseUrl}/api/auth/myinfo`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const userData = await response.json()
        console.log('User data from myinfo:', userData)
        setUser(userData)
      } else {
        console.log('Auth check failed, status:', response.status)
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      await fetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      router.push('/auth/login')
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  // Protección de rutas
  useEffect(() => {
    if (loading) return

    const publicRoutes = ['/auth/login', '/auth/register', '/auth/first-time-login', '/']
    const adminRoutes = ['/admin']
    const ownerRoutes = ['/dashboard']
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
    const isOwnerRoute = ownerRoutes.some(route => pathname.startsWith(route))

    // Si no hay usuario y está en ruta protegida, redirigir al login
    if (!user && !isPublicRoute) {
      router.push('/auth/login')
      return
    }

    // Si hay usuario y está en ruta pública (excepto logout), redirigir según rol
    if (user && isPublicRoute && pathname !== '/') {
      if (user.role === 'admin') {
        router.push('/admin')
      } else if (user.role === 'owner') {
        router.push('/dashboard')
      }
      return
    }

    // Verificar permisos específicos de rutas
    if (user) {
      // Admin puede acceder a todo
      if (user.role === 'admin') {
        return
      }

      // Owner solo puede acceder a dashboard
      if (user.role === 'owner') {
        if (isAdminRoute) {
          router.push('/dashboard')
          return
        }
      }
    }
  }, [user, loading, pathname, router])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
