"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ApprovalModal } from "./approval-modal"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Calendar,
  User,
  FileText,
  MapPin,
} from "lucide-react"

interface SolicitudDetailsProps {
  solicitudId: string
  onBack: () => void
}

// Datos simulados - en una app real vendrían de una API
const getSolicitudDetails = (id: string) => {
  const solicitudes = {
    "1": {
      // Datos del usuario
      user: {
        id: "user-1",
        email: "maria.gonzalez@utn.edu.co",
        fullName: "Dr. María González",
        role: "institucion",
        createdAt: "2024-01-15T10:30:00Z",
      },
      // Datos de la institución
      institution: {
        id: "inst-1",
        name: "Universidad Tecnológica del Norte",
        legalId: "NIT-900123456-1",
        emailInstitucional: "contacto@utn.edu.co",
        website: "https://www.utn.edu.co",
        description:
          "Universidad líder en tecnología e innovación educativa, comprometida con la formación integral de profesionales competentes y éticos.",
        logoUrl: "/placeholder.svg?height=100&width=100&text=UTN",
        status: "pendiente",
        submittedBy: "user-1",
        approvedBy: null,
        createdAt: "2024-01-15T10:30:00Z",
        // Datos adicionales
        phone: "+57 1 234-5678",
        address: "Carrera 15 #123-45, Bogotá, Colombia",
        contactPerson: "Dr. María González",
        contactPosition: "Rectora",
      },
    },
    // Más datos simulados...
  }

  return solicitudes[id as keyof typeof solicitudes] || null
}

export function SolicitudDetails({ solicitudId, onBack }: SolicitudDetailsProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<"aprobar" | "rechazar" | null>(null)

  const solicitud = getSolicitudDetails(solicitudId)

  if (!solicitud) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Solicitud no encontrada</h3>
            <p className="text-muted-foreground">La solicitud que buscas no existe o ha sido eliminada.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleApprovalAction = (action: "aprobar" | "rechazar") => {
    setModalAction(action)
    setModalOpen(true)
  }

  const handleConfirmAction = (comments: string) => {
    console.log(`${modalAction} solicitud con comentarios:`, comments)
    // Aquí se haría la llamada a la API
    alert(`Solicitud ${modalAction === "aprobar" ? "aprobada" : "rechazada"} exitosamente`)
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Detalles de Solicitud</h1>
            <p className="text-muted-foreground">{solicitud.institution.name}</p>
          </div>
        </div>

        {solicitud.institution.status === "pendiente" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleApprovalAction("rechazar")}
              className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Rechazar
            </Button>
            <Button
              onClick={() => handleApprovalAction("aprobar")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Aprobar
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Información de la Institución
                </CardTitle>
                {getStatusBadge(solicitud.institution.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nombre de la Institución</label>
                  <p className="font-medium">{solicitud.institution.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID Legal</label>
                  <p className="font-medium">{solicitud.institution.legalId}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Descripción</label>
                <p className="mt-1 text-sm leading-relaxed">{solicitud.institution.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Sitio Web</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={solicitud.institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {solicitud.institution.website}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(solicitud.institution.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Institucional</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${solicitud.institution.emailInstitucional}`}
                      className="text-primary hover:underline"
                    >
                      {solicitud.institution.emailInstitucional}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${solicitud.institution.phone}`} className="text-primary hover:underline">
                      {solicitud.institution.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Dirección</label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{solicitud.institution.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Solicitante
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                  <p className="font-medium">{solicitud.user.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Personal</label>
                  <a href={`mailto:${solicitud.user.email}`} className="text-primary hover:underline">
                    {solicitud.user.email}
                  </a>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cargo</label>
                  <p className="font-medium">{solicitud.institution.contactPosition}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rol en el Sistema</label>
                  <Badge variant="outline">{solicitud.user.role}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo de la Institución</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={solicitud.institution.logoUrl || "/placeholder.svg"} alt="Logo" />
                  <AvatarFallback className="text-lg">
                    <Building className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground text-center">Logo oficial de la institución</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado de la Solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado actual</span>
                {getStatusBadge(solicitud.institution.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fecha de solicitud</span>
                <span className="text-sm font-medium">
                  {new Date(solicitud.institution.createdAt).toLocaleDateString("es-ES")}
                </span>
              </div>
              {solicitud.institution.approvedBy && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Aprobado por</span>
                  <span className="text-sm font-medium">Admin</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                Ver Documentos
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                Enviar Email
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="mr-2 h-4 w-4" />
                Ver Historial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de aprobación/rechazo */}
      <ApprovalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        action={modalAction}
        institutionName={solicitud.institution.name}
        onConfirm={handleConfirmAction}
      />
    </div>
  )
}
