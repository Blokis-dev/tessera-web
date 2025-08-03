"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Users, Building, CheckCircle, Clock, TrendingUp, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStats {
  totalInstitutions: number
  pendingInstitutions: number
  pendingUsers: number
  totalUsers: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInstitutions: 0,
    pendingInstitutions: 0,
    pendingUsers: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      
      try {
        const [companiesResponse, usersResponse, pendingInstitutionsResponse, pendingUsersResponse] = await Promise.all([
          fetch(`${baseUrl}/companies`, { credentials: 'include' }),
          fetch(`${baseUrl}/users`, { credentials: 'include' }),
          fetch(`${baseUrl}/admin/institutions/pending`, { credentials: 'include' }),
          fetch(`${baseUrl}/admin/users/pending`, { credentials: 'include' })
        ])

        const companies = companiesResponse.ok ? await companiesResponse.json() : []
        const users = usersResponse.ok ? await usersResponse.json() : []
        const pendingInstitutions = pendingInstitutionsResponse.ok ? await pendingInstitutionsResponse.json() : []
        const pendingUsers = pendingUsersResponse.ok ? await pendingUsersResponse.json() : []

        setStats({
          totalInstitutions: companies.length,
          pendingInstitutions: pendingInstitutions.length,
          pendingUsers: pendingUsers.length,
          totalUsers: users.length,
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const recentActivity = [
    {
      id: 1,
      action: "Nueva solicitud",
      institution: "Universidad Tecnológica del Norte",
      time: "Hace 2 horas",
      type: "pending",
    },
    {
      id: 2,
      action: "Solicitud aprobada",
      institution: "Instituto de Capacitación Empresarial",
      time: "Hace 4 horas",
      type: "approved",
    },
    {
      id: 3,
      action: "Solicitud rechazada",
      institution: "Centro de Formación ABC",
      time: "Hace 6 horas",
      type: "rejected",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with gradient text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Panel de{" "}
          <span 
            className="bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(90deg, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}
          >
            Administración
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Bienvenido al panel de control de Tessera
        </p>
      </div>

      {/* Stats Grid with enhanced styling */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Instituciones Activas"
          value={stats.totalInstitutions}
          description="Total de instituciones registradas"
          icon={Building}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Instituciones Pendientes"
          value={stats.pendingInstitutions}
          description="Requieren revisión"
          icon={Clock}
        />
        <StatsCard
          title="Usuarios Pendientes"
          value={stats.pendingUsers}
          description="Usuarios por aprobar"
          icon={CheckCircle}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Total Usuarios"
          value={stats.totalUsers}
          description="Usuarios registrados"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Recent Activity Cards with enhanced styling */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden backdrop-blur-sm bg-background/95 border shadow-lg">
          {/* Subtle gradient overlay */}
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
                <Clock className="h-5 w-5" style={{ color: "var(--primary)" }} />
              </div>
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.institution}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="flex items-center">
                    {activity.type === "pending" && (
                      <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                        <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    )}
                    {activity.type === "approved" && (
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    )}
                    {activity.type === "rejected" && (
                      <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden backdrop-blur-sm bg-background/95 border shadow-lg">
          {/* Subtle gradient overlay */}
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
                <TrendingUp className="h-5 w-5" style={{ color: "var(--accent)" }} />
              </div>
              Estadísticas del Mes
            </CardTitle>
            <CardDescription>Resumen de actividad mensual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Solicitudes Recibidas</span>
                <span 
                  className="font-medium text-lg"
                  style={{ color: "var(--primary)" }}
                >
                  23
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: "75%",
                    background: "linear-gradient(90deg, var(--primary), var(--accent))"
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Aprobadas: 18
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Rechazadas: 5
                </span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tiempo Promedio de Respuesta</span>
                  <span 
                    className="font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    2.3 días
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div 
                    className="p-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, var(--primary)/20, var(--accent)/20)"
                    }}
                  >
                    <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    15% mejor que el mes anterior
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional action section */}
      <Card className="relative overflow-hidden backdrop-blur-sm bg-background/95 border shadow-lg">
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
              <AlertTriangle className="h-5 w-5" style={{ color: "var(--primary)" }} />
            </div>
            Acciones Pendientes
          </CardTitle>
          <CardDescription>
            Tareas que requieren tu atención inmediata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <Building className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Instituciones por revisar</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.pendingInstitutions} solicitudes pendientes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Usuarios por aprobar</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.pendingUsers} usuarios en cola
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--primary)/20, var(--accent)/20)"
                  }}
                >
                  <CheckCircle className="h-4 w-4" style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="font-medium text-sm">Sistema actualizado</p>
                  <p className="text-xs text-muted-foreground">
                    Todas las funciones operativas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
