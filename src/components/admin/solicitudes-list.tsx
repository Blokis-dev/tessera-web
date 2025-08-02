"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter, Calendar, Building, Mail, Phone } from "lucide-react"

interface SolicitudesListProps {
  onViewDetails: (id: string) => void
}

// Datos simulados - en una app real vendrían de una API
const solicitudes = [
  {
    id: "1",
    userName: "Dr. María González",
    institutionName: "Universidad Tecnológica del Norte",
    email: "contacto@utn.edu.co",
    phone: "+57 1 234-5678",
    status: "pendiente",
    createdAt: "2024-01-15",
    legalId: "NIT-900123456-1",
  },
  {
    id: "2",
    userName: "Ing. Carlos Rodríguez",
    institutionName: "Instituto de Capacitación Empresarial",
    email: "admin@ice.com.co",
    phone: "+57 2 345-6789",
    status: "pendiente",
    createdAt: "2024-01-14",
    legalId: "NIT-800234567-2",
  },
  {
    id: "3",
    userName: "Dra. Ana Martínez",
    institutionName: "Corporación Educativa del Sur",
    email: "rectoria@ces.edu.co",
    phone: "+57 4 456-7890",
    status: "aprobada",
    createdAt: "2024-01-13",
    legalId: "NIT-700345678-3",
  },
  {
    id: "4",
    userName: "Lic. Roberto Silva",
    institutionName: "Centro de Formación Técnica",
    email: "direccion@cft.edu.co",
    phone: "+57 5 567-8901",
    status: "rechazada",
    createdAt: "2024-01-12",
    legalId: "NIT-600456789-4",
  },
  {
    id: "5",
    userName: "Prof. Laura Jiménez",
    institutionName: "Academia de Artes y Oficios",
    email: "info@aao.edu.co",
    phone: "+57 3 678-9012",
    status: "pendiente",
    createdAt: "2024-01-11",
    legalId: "NIT-500567890-5",
  },
]

export function SolicitudesList({ onViewDetails }: SolicitudesListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const matchesSearch =
      solicitud.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || solicitud.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Pendiente
          </Badge>
        )
      case "aprobada":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Aprobada
          </Badge>
        )
      case "rechazada":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Rechazada
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const pendingCount = solicitudes.filter((s) => s.status === "pendiente").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Solicitudes de Instituciones</h1>
          <p className="text-muted-foreground">
            Gestiona las solicitudes de registro de nuevas instituciones ({pendingCount} pendientes)
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, institución o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="aprobada">Aprobada</SelectItem>
                <SelectItem value="rechazada">Rechazada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Solicitudes List */}
      <div className="grid gap-4">
        {filteredSolicitudes.map((solicitud) => (
          <Card key={solicitud.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{solicitud.institutionName}</h3>
                      <p className="text-sm text-muted-foreground">Solicitado por: {solicitud.userName}</p>
                    </div>
                    {getStatusBadge(solicitud.status)}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{solicitud.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{solicitud.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(solicitud.createdAt).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">ID Legal: {solicitud.legalId}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => onViewDetails(solicitud.id)} className="bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSolicitudes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron solicitudes</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "No hay solicitudes registradas en el sistema"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
