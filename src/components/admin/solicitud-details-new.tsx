"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ApprovalModal } from "./approval-modal"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Building,
  Mail,
  Globe,
  Calendar,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react"

interface SolicitudDetailsProps {
  solicitudId: string
  onBack: () => void
}

interface InstitutionDetails {
  id: string
  name: string
  legal_id: string
  email_institucional: string
  website?: string
  description?: string
  status: string
  created_at: string
}

interface UserDetails {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  institution_name: string
  created_at: string
}

interface SolicitudDetails {
  type: 'institution' | 'user'
  institution?: InstitutionDetails
  user?: UserDetails
}

export function SolicitudDetails({ solicitudId, onBack }: SolicitudDetailsProps) {
  const [solicitud, setSolicitud] = useState<SolicitudDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject">("approve")

  const fetchSolicitudDetails = useCallback(async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      
      // Determinar el tipo y ID real de la solicitud
      const [type, realId] = solicitudId.split('_')
      
      let data: SolicitudDetails
      
      if (type === 'inst') {
        // Obtener detalles de institución
        const response = await fetch(`${baseUrl}/companies/${realId}`, {
          credentials: 'include'
        })
        
        if (response.ok) {
          const institution = await response.json()
          data = { type: 'institution', institution }
        } else {
          throw new Error('Error al cargar detalles de la institución')
        }
      } else if (type === 'user') {
        // Para usuarios necesitamos obtener el email primero, así que usaremos la lista de usuarios pendientes
        const response = await fetch(`${baseUrl}/admin/users/pending`, {
          credentials: 'include'
        })
        
        if (response.ok) {
          const users = await response.json()
          const user = users.find((u: UserDetails) => u.id === realId)
          
          if (user) {
            data = { type: 'user', user }
          } else {
            throw new Error('Usuario no encontrado')
          }
        } else {
          throw new Error('Error al cargar detalles del usuario')
        }
      } else {
        throw new Error('Tipo de solicitud no válido')
      }
      
      setSolicitud(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      console.error('Error fetching solicitud details:', err)
    } finally {
      setLoading(false)
    }
  }, [solicitudId])

  useEffect(() => {
    fetchSolicitudDetails()
  }, [fetchSolicitudDetails])

  const handleApproval = async (status: "verified" | "rejected", notes: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const [type, realId] = solicitudId.split('_')
      
      let endpoint = ''
      let body = {}
      
      if (type === 'inst' && solicitud?.institution) {
        endpoint = `${baseUrl}/admin/institutions/approve`
        body = {
          institutionId: realId,
          status,
          adminNotes: notes
        }
      } else if (type === 'user' && solicitud?.user) {
        endpoint = `${baseUrl}/admin/users/approve`
        body = {
          userId: realId,
          status,
          adminNotes: notes
        }
      }
      
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })
      
      if (response.ok) {
        // Actualizar el estado local
        if (solicitud) {
          if (solicitud.institution) {
            setSolicitud({
              ...solicitud,
              institution: { ...solicitud.institution, status }
            })
          } else if (solicitud.user) {
            setSolicitud({
              ...solicitud,
              user: { ...solicitud.user, status }
            })
          }
        }
        
        setIsApprovalModalOpen(false)
        
        // Opcional: regresar a la lista después de un tiempo
        setTimeout(() => {
          onBack()
        }, 2000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al procesar la solicitud')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la solicitud')
      console.error('Error processing approval:', err)
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>
      case "verified":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aprobada</Badge>
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rechazada</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a Solicitudes
        </Button>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (error || !solicitud) {
    return (
      <div className="space-y-6">
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a Solicitudes
        </Button>
        <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 border border-red-200 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          {error || 'Error al cargar los detalles'}
        </div>
      </div>
    )
  }

  const currentStatus = solicitud.institution?.status || solicitud.user?.status || 'pending'
  const isEditable = currentStatus === 'pending'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a Solicitudes
        </Button>
        <div className="flex items-center gap-2">
          {getStatusBadge(currentStatus)}
          {isEditable && (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setActionType("reject")
                  setIsApprovalModalOpen(true)
                }}
                variant="outline"
                className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4" />
                Rechazar
              </Button>
              <Button
                onClick={() => {
                  setActionType("approve")
                  setIsApprovalModalOpen(true)
                }}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Aprobar
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          {solicitud.type === 'institution' && solicitud.institution && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Información de la Institución
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                      <p className="font-medium">{solicitud.institution.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">NIT / ID Legal</label>
                      <p className="font-medium">{solicitud.institution.legal_id}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email Institucional</label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p>{solicitud.institution.email_institucional}</p>
                      </div>
                    </div>
                    {solicitud.institution.website && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Sitio Web</label>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={solicitud.institution.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {solicitud.institution.website}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {solicitud.institution.description && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Descripción</label>
                      <p className="mt-1 text-sm leading-relaxed">{solicitud.institution.description}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p>
                        {new Date(solicitud.institution.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {solicitud.type === 'user' && solicitud.user && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información del Usuario
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                      <p className="font-medium">{solicitud.user.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p>{solicitud.user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Rol</label>
                      <p className="font-medium">{solicitud.user.role === 'owner' ? 'Propietario' : solicitud.user.role}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Institución</label>
                      <p className="font-medium">{solicitud.user.institution_name}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p>
                        {new Date(solicitud.user.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {solicitud.type === 'institution' && solicitud.institution 
                      ? getInitials(solicitud.institution.name)
                      : solicitud.user 
                      ? getInitials(solicitud.user.full_name)
                      : 'N/A'
                    }
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-medium">
                    {solicitud.type === 'institution' && solicitud.institution 
                      ? solicitud.institution.name
                      : solicitud.user?.full_name
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {solicitud.type === 'institution' ? 'Institución' : 'Usuario'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de la Solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Tipo</span>
                <span className="text-sm font-medium">
                  {solicitud.type === 'institution' ? 'Institución' : 'Usuario'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Estado</span>
                {getStatusBadge(currentStatus)}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Fecha</span>
                <span className="text-sm font-medium">
                  {new Date(
                    solicitud.institution?.created_at || solicitud.user?.created_at || ''
                  ).toLocaleDateString('es-ES', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de aprobación */}
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onConfirm={handleApproval}
        actionType={actionType}
        institutionName={
          solicitud.type === 'institution' && solicitud.institution 
            ? solicitud.institution.name
            : solicitud.user?.institution_name || 'N/A'
        }
        userName={
          solicitud.type === 'user' && solicitud.user 
            ? solicitud.user.full_name
            : 'N/A'
        }
      />
    </div>
  )
}
