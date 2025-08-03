"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter, Calendar, Building, Mail, Phone, Loader2, AlertCircle } from "lucide-react"

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
      
      const [institutionsResponse, usersResponse] = await Promise.all([
        fetch(`${baseUrl}/admin/institutions/pending`, { credentials: 'include' }),
        fetch(`${baseUrl}/admin/users/pending`, { credentials: 'include' })
      ])

      const institutions: PendingInstitution[] = institutionsResponse.ok ? await institutionsResponse.json() : []
      const users: PendingUser[] = usersResponse.ok ? await usersResponse.json() : []

      // Combinar instituciones y usuarios en una lista unificada
      const combined: CombinedSolicitud[] = [
        ...institutions.map(inst => ({
          id: `inst_${inst.id}`,
          type: 'institution' as const,
          userName: 'Pendiente de asignación',
          institutionName: inst.name,
          email: inst.email_institucional,
          status: inst.status,
          createdAt: inst.created_at,
          legalId: inst.legal_id,
          institution: inst
        })),
        ...users.map(user => ({
          id: `user_${user.id}`,
          type: 'user' as const,
          userName: user.full_name,
          institutionName: user.institution_name,
          email: user.email,
          status: user.status,
          createdAt: user.created_at,
          user: user
        }))
      ]

      // Ordenar por fecha de creación (más recientes primero)
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
    const matchesSearch =
      solicitud.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (solicitud.legalId && solicitud.legalId.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || solicitud.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const getTypeIcon = (type: string) => {
    return type === 'institution' ? <Building className="h-4 w-4" /> : <Mail className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Solicitudes Pendientes</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Solicitudes Pendientes</h1>
        <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 border border-red-200 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Solicitudes Pendientes</h1>
          <p className="text-muted-foreground">
            Gestiona las solicitudes de nuevas instituciones y usuarios
          </p>
        </div>
        <Button 
          onClick={() => fetchSolicitudes()} 
          variant="outline"
          className="gap-2"
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
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
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
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No se encontraron solicitudes que coincidan con los filtros.</p>
          </Card>
        ) : (
          filteredSolicitudes.map((solicitud) => (
            <Card key={solicitud.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      {getTypeIcon(solicitud.type)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{solicitud.institutionName}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {solicitud.type === 'institution' ? 'Institución' : 'Usuario'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span>{solicitud.email}</span>
                        </div>
                        {solicitud.userName !== 'Pendiente de asignación' && (
                          <div className="flex items-center gap-2">
                            <Building className="h-3 w-3" />
                            <span>Contacto: {solicitud.userName}</span>
                          </div>
                        )}
                        {solicitud.legalId && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>NIT: {solicitud.legalId}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
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
                      className="gap-2"
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{solicitudes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {solicitudes.filter(s => s.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aprobadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {solicitudes.filter(s => s.status === 'verified').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
