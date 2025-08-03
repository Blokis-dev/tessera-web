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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Bienvenido al panel de control de Tessera</p>
      </div>

      {/* Stats Grid */}
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

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.institution}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="flex items-center">
                    {activity.type === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
                    {activity.type === "approved" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {activity.type === "rejected" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas del Mes</CardTitle>
            <CardDescription>Resumen de actividad mensual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Solicitudes Recibidas</span>
                <span className="font-medium">23</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Aprobadas: 18</span>
                <span>Rechazadas: 5</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tiempo Promedio de Respuesta</span>
                  <span className="font-medium">2.3 días</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">15% mejor que el mes anterior</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
