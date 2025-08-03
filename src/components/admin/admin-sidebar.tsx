"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Users, Building, Settings, LogOut, Shield, Menu, X, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "solicitudes", name: "Solicitudes", icon: Users, badge: 5 },
  { id: "instituciones", name: "Instituciones", icon: Building },
  { id: "usuarios", name: "Usuarios", icon: Users },
  { id: "reportes", name: "Reportes", icon: BarChart3 },
  { id: "configuracion", name: "Configuración", icon: Settings },
]

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout, user } = useAuth()

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="backdrop-blur-sm bg-background/95 border shadow-lg"
          style={{
            borderColor: "var(--primary)",
            color: "var(--primary)"
          }}
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 backdrop-blur-sm bg-background/95 border-r shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        style={{
          borderColor: "var(--border)"
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center space-x-2">
              <div 
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--accent))"
                }}
              >
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span 
                  className="text-xl font-bold bg-clip-text text-transparent"
                  style={{
                    background: "linear-gradient(90deg, var(--primary), var(--accent))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text"
                  }}
                >
                  Tessera
                </span>
                <p className="text-xs text-muted-foreground">Panel Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start relative transition-all duration-200",
                  activeTab === item.id 
                    ? "text-white shadow-lg" 
                    : "hover:bg-muted/50"
                )}
                style={activeTab === item.id ? {
                  background: "linear-gradient(90deg, var(--primary), var(--accent))"
                } : {}}
                onClick={() => {
                  onTabChange(item.id)
                  setIsMobileMenuOpen(false)
                }}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
                {item.badge && (
                  <span 
                    className="ml-auto text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #dc2626)"
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </nav>

          {/* User info section */}
          {user && (
            <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
              <div 
                className="flex items-center p-3 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, var(--primary)/5, var(--accent)/5)"
                }}
              >
                <div 
                  className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                  style={{
                    background: "linear-gradient(135deg, var(--primary), var(--accent))"
                  }}
                >
                  <span className="text-xs font-medium text-white">
                    {user.full_name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.full_name || 'Admin'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom section */}
          <div className="p-4 border-t space-y-3" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tema</span>
              <ThemeToggle />
            </div>
            
            <Button
              variant="ghost"
              className="w-full justify-start transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-950/50"
              style={{
                color: "#ef4444"
              }}
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
