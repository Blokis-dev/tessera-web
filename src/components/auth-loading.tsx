"use client"

import { Shield } from "lucide-react"

export function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mx-auto p-4 bg-teal-100 dark:bg-teal-900 rounded-full w-fit mb-6 animate-pulse">
          <Shield className="h-12 w-12 text-teal-600 dark:text-teal-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Verificando autenticación...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Por favor espera un momento
        </p>
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
