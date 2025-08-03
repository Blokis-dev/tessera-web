"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { CreateCertificate } from "@/components/dashboard/create-certificate"
import { ProfilePage } from "@/components/dashboard/profile-page"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview onTabChange={setActiveTab} />
      case "create":
        return <CreateCertificate />
      case "profile":
        return <ProfilePage />
      case "certificates":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Mis Certificados</h1>
            <p className="text-muted-foreground">Aquí se mostrarían todos los certificados emitidos</p>
          </div>
        )
      case "analytics":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Estadísticas detalladas y métricas de uso</p>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Configuración</h1>
            <p className="text-muted-foreground">Configuraciones generales de la cuenta</p>
          </div>
        )
      default:
        return <DashboardOverview onTabChange={setActiveTab} />
    }
  }

  return (
    <ProtectedRoute allowedRoles={['owner', 'admin']}>
      <div className="min-h-screen bg-background">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="lg:pl-64">
          <main className="p-6 lg:p-8">{renderContent()}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
