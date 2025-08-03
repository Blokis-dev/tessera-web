"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter, Calendar, Building, Mail, Phone, Loader2, AlertCircle, User } from "lucide-react"

interface SolicitudesListProps {
  onViewDetails: (id: string) => void
}

interface PendingInstitution {
  id: string
  name: string
  legal_id: string
  email_institucional: string
  website?: string
  status: string
  created_at: string
}

interface PendingUser {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  institution_name: string
  created_at: string
}

interface CombinedSolicitud {
  id: string
  type: 'institution' | 'user'
  userName: string
  institutionName: string
  email: string
  status: string
  createdAt: string
  legalId?: string
  institution?: PendingInstitution
  user?: PendingUser
}

export function SolicitudesList({ onViewDetails }: SolicitudesListProps) {
  const [solicitudes, setSolicitudes] = useState<CombinedSolicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchSolicitudes()
  }, [])

  const fetchSolicitudes = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      
      if (!baseUrl) {
        throw new Error('API base URL no configurado')
      }
      
      const [institutionsResponse, usersResponse] = await Promise.all([
        fetch(`${baseUrl}/admin/institutions/pending`, { credentials: 'include' }),
        fetch(`${baseUrl}/admin/users/pending`, { credentials: 'include' })
      ])

      let institutions: PendingInstitution[] = []
      let users: PendingUser[] = []
      
      if (institutionsResponse.ok) {
        try {
          institutions = await institutionsResponse.json()
          if (!Array.isArray(institutions)) {
            institutions = []
          }
        } catch (err) {
          console.error('Error parsing institutions response:', err)
          institutions = []
        }
      }
      
      if (usersResponse.ok) {
        try {
          users = await usersResponse.json()
          if (!Array.isArray(users)) {
            users = []
          }
        } catch (err) {
          console.error('Error parsing users response:', err)
          users = []
        }
      }

      const combined: CombinedSolicitud[] = [
        ...users.map(user => {
          if (!user.id) {
            console.warn('User without ID found:', user)
          }
          return {
            id: `user_${user.id || 'unknown'}`,
            type: 'user' as const,
            userName: user.full_name || 'Sin nombre',
            institutionName: user.institution_name || 'Sin institución',
            email: user.email || 'Sin email',
            status: user.status || 'pending',
            createdAt: user.created_at || new Date().toISOString(),
            user: user
          }
        })
      ]
      
      combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      
      setSolicitudes(combined)
    } catch (err) {
      setError('Error al cargar las solicitudes')
      console.error('Error fetching solicitudes:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      (solicitud.userName || '').toLowerCase().includes(searchLower) ||
      (solicitud.institutionName || '').toLowerCase().includes(searchLower) ||
      (solicitud.email || '').toLowerCase().includes(searchLower) ||
      (solicitud.legalId || '').toLowerCase().includes(searchLower)

    const matchesStatus = statusFilter === "all" || solicitud.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const getTypeIcon = (type: string) => {
    return <User className="h-4 w-4" style={{ color: "var(--primary)" }} />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Solicitudes{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{
                background: "linear-gradient(90deg, var(--primary), var(--accent))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text"
              }}
            >
              Pendientes
            </span>
          </h1>
        </div>
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
            <p className="text-muted-foreground">Cargando solicitudes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Solicitudes Pendientes</h1>
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-red-800 dark:text-red-400">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Error al cargar las solicitudes</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Solicitudes{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{
                background: "linear-gradient(90deg, var(--primary), var(--accent))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text"
              }}
            >
              Pendientes
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestiona las solicitudes de nuevos usuarios e instituciones
          </p>
        </div>
        <Button 
          onClick={() => fetchSolicitudes()} 
          variant="outline"
          className="gap-2 transition-all duration-200"
          style={{
            borderColor: "var(--primary)",
            color: "var(--primary)"
          }}
        >
          <Search className="h-4 w-4" />
          Actualizar
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, institución, email o NIT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all duration-200"
            style={{
              borderColor: "var(--border)"
            }}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger 
            className="w-full sm:w-48 transition-all duration-200"
            style={{
              borderColor: "var(--border)"
            }}
          >
            <Filter className="mr-2 h-4 w-4" style={{ color: "var(--primary)" }} />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="verified">Aprobadas</SelectItem>
            <SelectItem value="rejected">Rechazadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de solicitudes */}
      <div className="grid gap-4">
        {filteredSolicitudes.length === 0 ? (
          <Card className="backdrop-blur-sm bg-background/95 border shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="p-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--primary)/10, var(--accent)/10)"
                  }}
                >
                  <Search className="h-8 w-8" style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="font-medium">No se encontraron solicitudes</p>
                  <p className="text-muted-foreground text-sm">
                    No hay solicitudes que coincidan con los filtros aplicados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredSolicitudes.map((solicitud) => (
            <Card 
              key={solicitud.id} 
              className="hover:shadow-lg transition-all duration-200 backdrop-blur-sm bg-background/95 border"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, var(--primary)/10, var(--accent)/10)"
                      }}
                    >
                      {getTypeIcon(solicitud.type)}
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{solicitud.institutionName}</h3>
                        <Badge 
                          variant="secondary" 
                          className="text-xs"
                          style={{
                            background: "linear-gradient(135deg, var(--accent)/20, var(--primary)/20)",
                            color: "var(--primary)",
                            border: "1px solid var(--primary)/20"
                          }}
                        >
                          Usuario + Institución
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" style={{ color: "var(--accent)" }} />
                          <span>{solicitud.email}</span>
                        </div>
                        {solicitud.userName !== 'Pendiente de asignación' && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" style={{ color: "var(--primary)" }} />
                            <span>Contacto: {solicitud.userName}</span>
                          </div>
                        )}
                        {solicitud.legalId && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" style={{ color: "var(--accent)" }} />
                            <span>NIT: {solicitud.legalId}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" style={{ color: "var(--primary)" }} />
                          <span>
                            Creado: {new Date(solicitud.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(solicitud.status)}
                    <Button
                      size="sm"
                      onClick={() => onViewDetails(solicitud.id)}
                      className="gap-2 transition-all duration-200"
                      style={{
                        background: "linear-gradient(90deg, var(--primary), var(--accent))",
                        color: "white",
                        border: "none"
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, var(--primary), var(--accent))"
            }}
          />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div 
                className="p-1 rounded"
                style={{
                  background: "linear-gradient(135deg, var(--primary)/10, var(--accent)/10)"
                }}
              >
                <Search className="h-3 w-3" style={{ color: "var(--primary)" }} />
              </div>
              Total Solicitudes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {solicitudes.length}
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, #f59e0b, #d97706)"
            }}
          />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1 rounded bg-yellow-100 dark:bg-yellow-900/30">
                <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
              </div>
              Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {solicitudes.filter(s => s.status === 'pending').length}
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, #10b981, #059669)"
            }}
          />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1 rounded bg-green-100 dark:bg-green-900/30">
                <Eye className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              Aprobadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {solicitudes.filter(s => s.status === 'verified').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
