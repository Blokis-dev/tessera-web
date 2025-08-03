"use client"

import { useAuth } from "@/lib/auth-context"
import { AuthLoading } from "@/components/auth-loading"
import { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'owner'
  allowedRoles?: ('admin' | 'owner')[]
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  allowedRoles = ['admin', 'owner'] 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return <AuthLoading />
  }

  if (!user) {
    return <AuthLoading />
  }

  // Verificar rol específico requerido
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
            Acceso Denegado
          </h2>
          <p className="text-red-600 dark:text-red-400">
            No tienes permisos para acceder a esta página
          </p>
        </div>
      </div>
    )
  }

  // Verificar roles permitidos
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
            Acceso Denegado
          </h2>
          <p className="text-red-600 dark:text-red-400">
            No tienes permisos para acceder a esta página
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
