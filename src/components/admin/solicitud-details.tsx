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
  Calendar,
  User,
  FileText,
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
      
      // Ahora solo manejamos usuarios ya que las instituciones se crean atomicamente
      const [type, realId] = solicitudId.split('_')
      
      if (type !== 'user') {
        throw new Error('Solo se pueden ver detalles de usuarios pendientes')
      }
      
      // Obtener la lista de usuarios pendientes y encontrar el específico
      const response = await fetch(`${baseUrl}/admin/users/pending`, {
        credentials: 'include'
      })
      
      if (response.ok) {
        const users = await response.json()
        const user = users.find((u: UserDetails) => u.id === realId)
        
        if (user) {
          const data: SolicitudDetails = { type: 'user', user }
          setSolicitud(data)
        } else {
          throw new Error('Usuario no encontrado')
        }
      } else {
        throw new Error('Error al cargar detalles del usuario')
      }
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
      
      if (type !== 'user' || !solicitud?.user) {
        throw new Error('Solo se pueden aprobar usuarios')
      }
      
      const endpoint = `${baseUrl}/admin/users/approve`
      const body = {
        userId: realId,
        status,
        adminNotes: notes
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
        setSolicitud({
          ...solicitud,
          user: { ...solicitud.user, status }
        })
        
        setIsApprovalModalOpen(false)
        
        // Regresar a la lista después de un tiempo
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
    if (!name || typeof name !== 'string') return 'N/A'
    
    return name
      .split(' ')
      .map(word => word[0])
      .filter(Boolean)
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'N/A'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge 
            variant="outline" 
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
          >
            Pendiente
          </Badge>
        )
      case "verified":
        return (
          <Badge 
            variant="outline" 
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            Aprobada
          </Badge>
        )
      case "rejected":
        return (
          <Badge 
            variant="outline" 
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            Rechazada
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="gap-2 transition-all duration-200"
          style={{
            color: "var(--primary)"
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Solicitudes
        </Button>
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div 
              className="p-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, var(--primary)/10, var(--accent)/10)"
              }}
            >
              <Loader2 
                className="h-8 w-8 animate-spin" 
                style={{ color: "var(--primary)" }}
              />
            </div>
            <p className="text-muted-foreground">Cargando detalles...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !solicitud) {
    return (
      <div className="space-y-6">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="gap-2 transition-all duration-200"
          style={{
            color: "var(--primary)"
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Solicitudes
        </Button>
        <Card className="border-red-200 dark:border-red-800 backdrop-blur-sm bg-background/95">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-red-800 dark:text-red-400">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Error al cargar los detalles</p>
                <p className="text-sm opacity-80">{error || 'Error desconocido'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentStatus = solicitud.user?.status || 'pending'
  const isEditable = currentStatus === 'pending'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="gap-2 transition-all duration-200"
            style={{
              color: "var(--primary)"
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Solicitudes
          </Button>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Detalles de{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(90deg, var(--primary), var(--accent))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text"
                }}
              >
                Solicitud
              </span>
            </h1>
            <p className="text-muted-foreground">
              {solicitud.user?.full_name} - {solicitud.user?.institution_name}
            </p>
          </div>
        </div>
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
                className="gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/50 transition-all duration-200"
              >
                <XCircle className="h-4 w-4" />
                Rechazar
              </Button>
              <Button
                onClick={() => {
                  setActionType("approve")
                  setIsApprovalModalOpen(true)
                }}
                className="gap-2 transition-all duration-200"
                style={{
                  background: "linear-gradient(90deg, #10b981, #059669)",
                  color: "white"
                }}
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
          {solicitud.type === 'user' && solicitud.user && (
            <>
              <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: "linear-gradient(90deg, var(--primary), var(--accent))"
                  }}
                />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, var(--primary)/10, var(--accent)/10)"
                      }}
                    >
                      <User className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    </div>
                    Información del Usuario
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                      <p className="font-medium mt-1">{solicitud.user.full_name}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4" style={{ color: "var(--accent)" }} />
                        <p className="font-medium">{solicitud.user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <label className="text-sm font-medium text-muted-foreground">Rol</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary"
                          style={{
                            background: "linear-gradient(135deg, var(--primary)/20, var(--accent)/20)",
                            color: "var(--primary)",
                            border: "1px solid var(--primary)/20"
                          }}
                        >
                          {solicitud.user.role === 'owner' ? 'Propietario' : solicitud.user.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <label className="text-sm font-medium text-muted-foreground">Institución</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Building className="h-4 w-4" style={{ color: "var(--primary)" }} />
                        <p className="font-medium">{solicitud.user.institution_name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border">
                    <label className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" style={{ color: "var(--accent)" }} />
                      <p className="font-medium">
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

              {/* Card adicional con información complementaria */}
              <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: "linear-gradient(90deg, var(--accent), var(--primary))"
                  }}
                />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, var(--accent)/10, var(--primary)/10)"
                      }}
                    >
                      <FileText className="h-5 w-5" style={{ color: "var(--accent)" }} />
                    </div>
                    Información Adicional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border" style={{ background: "var(--muted)/30" }}>
                      <label className="text-sm font-medium text-muted-foreground">ID de Usuario</label>
                      <p className="font-mono text-sm mt-1" style={{ color: "var(--primary)" }}>
                        {solicitud.user.id}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ background: "var(--muted)/30" }}>
                      <label className="text-sm font-medium text-muted-foreground">Estado Actual</label>
                      <div className="mt-1">
                        {getStatusBadge(currentStatus)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, var(--primary), var(--accent))"
              }}
            />
            <CardHeader>
              <CardTitle>Avatar del Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback 
                    className="text-lg text-white"
                    style={{
                      background: "linear-gradient(135deg, var(--primary), var(--accent))"
                    }}
                  >
                    {solicitud.user ? getInitials(solicitud.user.full_name) : 'N/A'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-medium">
                    {solicitud.user?.full_name || 'N/A'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Usuario - {solicitud.user?.institution_name || 'Sin institución'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, var(--accent), var(--primary))"
              }}
            />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div 
                  className="p-1 rounded"
                  style={{
                    background: "linear-gradient(135deg, var(--accent)/10, var(--primary)/10)"
                  }}
                >
                  <FileText className="h-4 w-4" style={{ color: "var(--accent)" }} />
                </div>
                Resumen de la Solicitud
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-3 px-3 rounded-lg bg-muted/30 border">
                <span className="text-sm text-muted-foreground">Tipo</span>
                <Badge 
                  variant="secondary"
                  style={{
                    background: "linear-gradient(135deg, var(--primary)/20, var(--accent)/20)",
                    color: "var(--primary)",
                    border: "1px solid var(--primary)/20"
                  }}
                >
                  Usuario + Institución
                </Badge>
              </div>
              <div className="flex justify-between items-center py-3 px-3 rounded-lg bg-muted/30 border">
                <span className="text-sm text-muted-foreground">Estado</span>
                {getStatusBadge(currentStatus)}
              </div>
              <div className="flex justify-between items-center py-3 px-3 rounded-lg bg-muted/30 border">
                <span className="text-sm text-muted-foreground">Fecha</span>
                <span className="text-sm font-medium" style={{ color: "var(--primary)" }}>
                  {new Date(solicitud.user?.created_at || '').toLocaleDateString('es-ES', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Card de acciones rápidas */}
          {isEditable && (
            <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: "linear-gradient(90deg, #f59e0b, #d97706)"
                }}
              />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1 rounded bg-yellow-100 dark:bg-yellow-900/30">
                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  Acciones Requeridas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Esta solicitud requiere tu aprobación o rechazo para continuar con el proceso.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setActionType("approve")
                      setIsApprovalModalOpen(true)
                    }}
                    className="w-full gap-2 transition-all duration-200"
                    style={{
                      background: "linear-gradient(90deg, #10b981, #059669)",
                      color: "white"
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Aprobar Solicitud
                  </Button>
                  <Button
                    onClick={() => {
                      setActionType("reject")
                      setIsApprovalModalOpen(true)
                    }}
                    variant="outline"
                    className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/50 transition-all duration-200"
                  >
                    <XCircle className="h-4 w-4" />
                    Rechazar Solicitud
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de aprobación */}
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onConfirm={handleApproval}
        actionType={actionType}
        institutionName={solicitud.user?.institution_name || 'N/A'}
        userName={solicitud.user?.full_name || 'N/A'}
      />
    </div>
  )
}
