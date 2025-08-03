"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { SolicitudesList } from "@/components/admin/solicitudes-list"
import { SolicitudDetails } from "@/components/admin/solicitud-details"
import { ProtectedRoute } from "@/components/protected-route"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedSolicitudId, setSelectedSolicitudId] = useState<string | null>(null)

  const handleViewDetails = (id: string) => {
    setSelectedSolicitudId(id)
    setActiveTab("solicitud-details")
  }

  const handleBackToSolicitudes = () => {
    setSelectedSolicitudId(null)
    setActiveTab("solicitudes")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />
      case "solicitudes":
        return <SolicitudesList onViewDetails={handleViewDetails} />
      case "solicitud-details":
        return selectedSolicitudId ? (
          <SolicitudDetails solicitudId={selectedSolicitudId} onBack={handleBackToSolicitudes} />
        ) : (
          <SolicitudesList onViewDetails={handleViewDetails} />
        )
      case "instituciones":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Instituciones Registradas</h1>
            <p className="text-muted-foreground">Lista de todas las instituciones aprobadas</p>
          </div>
        )
      case "usuarios":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">Administrar usuarios del sistema</p>
          </div>
        )
      case "reportes":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Reportes y Analytics</h1>
            <p className="text-muted-foreground">Estadísticas detalladas del sistema</p>
          </div>
        )
      case "configuracion":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
            <p className="text-muted-foreground">Configuraciones generales de Tessera</p>
          </div>
        )
      default:
        return <AdminDashboard />
    }
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-background">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="lg:pl-64">
          <main className="p-6 lg:p-8">{renderContent()}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
