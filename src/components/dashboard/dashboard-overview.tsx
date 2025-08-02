"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "./stats-card"
import { Coins, FileText, CheckCircle, TrendingUp, Plus, Eye } from "lucide-react"

interface DashboardOverviewProps {
  onTabChange: (tab: string) => void
}

export function DashboardOverview({ onTabChange }: DashboardOverviewProps) {
  // Datos simulados - en una app real vendrían de una API
  const stats = {
    tokensAvailable: 42,
    tokensUsed: 8,
    certificatesIssued: 8,
    monthlyGrowth: 15,
  }

  const recentCertificates = [
    {
      id: 1,
      student: "María García López",
      title: "Certificado de Programación Web",
      date: "2024-01-15",
      status: "Emitido",
    },
    {
      id: 2,
      student: "Carlos Rodríguez",
      title: "Certificado de Marketing Digital",
      date: "2024-01-14",
      status: "Emitido",
    },
    { id: 3, student: "Ana Martínez", title: "Certificado de Diseño UX/UI", date: "2024-01-13", status: "Emitido" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido de vuelta, Universidad XYZ</p>
        </div>
        <Button
          onClick={() => onTabChange("create")}
          className="bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 hover:from-tessera-blue-600 hover:to-tessera-cyan-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Crear Certificado
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tokens Disponibles"
          value={stats.tokensAvailable}
          description="Tokens restantes para usar"
          icon={Coins}
        />
        <StatsCard
          title="Tokens Usados"
          value={stats.tokensUsed}
          description="Tokens consumidos este mes"
          icon={TrendingUp}
          trend={{ value: stats.monthlyGrowth, isPositive: true }}
        />
        <StatsCard
          title="Certificados Emitidos"
          value={stats.certificatesIssued}
          description="Total de certificados creados"
          icon={FileText}
        />
        <StatsCard
          title="Tasa de Éxito"
          value="100%"
          description="Certificados validados correctamente"
          icon={CheckCircle}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Certificados Recientes</CardTitle>
            <CardDescription>Últimos certificados emitidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCertificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{cert.student}</p>
                    <p className="text-xs text-muted-foreground">{cert.title}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                      {cert.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() => onTabChange("certificates")}
            >
              Ver Todos los Certificados
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uso de Tokens</CardTitle>
            <CardDescription>Distribución mensual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tokens Totales</span>
                <span className="font-medium">50</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 h-2 rounded-full"
                  style={{ width: `${(stats.tokensUsed / 50) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Usados: {stats.tokensUsed}</span>
                <span>Disponibles: {stats.tokensAvailable}</span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Comprar Más Tokens
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
