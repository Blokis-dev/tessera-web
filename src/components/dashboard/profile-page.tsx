"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Building, AlertCircle, Loader2 } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  first_time_login: boolean
  institution: {
    id: string
    name: string
    email_institucional: string
  }
  created_at: string
}

export function ProfilePage() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const response = await fetch(`${baseUrl}/users/profile`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setProfileData(data)
      } else {
        setError('Error al cargar el perfil')
      }
    } catch (err) {
      setError('Error de conexión')
      console.error('Profile fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 border border-red-200 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          {error || 'Error al cargar el perfil'}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground">Información de tu cuenta y institución</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información básica */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos de tu cuenta en Tessera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="full-name">Nombre Completo</Label>
                  <Input
                    id="full-name"
                    value={profileData.full_name}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="pl-10 bg-muted"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="role">Rol</Label>
                  <Input
                    id="role"
                    value={profileData.role === 'admin' ? 'Administrador' : 'Propietario'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Input
                    id="status"
                    value={profileData.status === 'verified' ? 'Verificado' : 'Pendiente'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="created-at">Fecha de Registro</Label>
                <Input
                  id="created-at"
                  value={new Date(profileData.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  disabled
                  className="bg-muted"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de la Institución</CardTitle>
              <CardDescription>Datos de tu organización</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="institution-name">Nombre de la Institución</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="institution-name"
                      value={profileData.institution.name}
                      disabled
                      className="pl-10 bg-muted"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="institution-email">Email Institucional</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="institution-email"
                      type="email"
                      value={profileData.institution.email_institucional}
                      disabled
                      className="pl-10 bg-muted"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>Imagen de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                    {getInitials(profileData.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-medium">{profileData.full_name}</p>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
              <CardDescription>Resumen de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Estado de la cuenta</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  profileData.status === 'verified' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {profileData.status === 'verified' ? 'Verificado' : 'Pendiente'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Primer login</span>
                <span className="text-sm font-medium">
                  {profileData.first_time_login ? 'Pendiente' : 'Completado'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Rol</span>
                <span className="text-sm font-medium">
                  {profileData.role === 'admin' ? 'Administrador' : 'Propietario'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
