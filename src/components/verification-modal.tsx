"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Shield, Calendar, User, Building, Download, Share } from "lucide-react"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  token: string
}

interface CertificateData {
  id: string
  studentName: string
  institutionName: string
  certificateTitle: string
  issueDate: string
  expirationDate?: string
  status: "valid" | "invalid" | "expired"
  description: string
  institutionLogo: string
  verificationId: string
}

export function VerificationModal({ isOpen, onClose, token }: VerificationModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && token) {
      // Simular llamada a API
      setIsLoading(true)
      setError(null)

      setTimeout(() => {
        // Simular respuesta de la API
        if (token.startsWith("TSR-") || token.length > 5) {
          setCertificateData({
            id: "cert-001",
            studentName: "María García López",
            institutionName: "Universidad Tecnológica del Norte",
            certificateTitle: "Certificado de Finalización en Programación Web",
            issueDate: "2024-01-15",
            expirationDate: "2027-01-15",
            status: "valid",
            description:
              "Este certificado acredita que el estudiante ha completado satisfactoriamente el programa de Programación Web con una duración de 120 horas académicas.",
            institutionLogo: "/placeholder.svg?height=80&width=80&text=UTN",
            verificationId: "VER-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          })
        } else {
          setError("Token inválido o certificado no encontrado")
        }
        setIsLoading(false)
      }, 2000)
    }
  }, [isOpen, token])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <CheckCircle className="mr-1 h-3 w-3" />
            Válido
          </Badge>
        )
      case "expired":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Expirado</Badge>
      case "invalid":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Inválido</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-tessera-blue-200 dark:border-tessera-blue-800"></div>
              <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-tessera-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold mt-4">Verificando Certificado</h3>
            <p className="text-sm text-muted-foreground mt-2">Validando la autenticidad del certificado...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
              <X className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Certificado No Válido</h3>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        ) : certificateData ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Certificado Verificado</h2>
                  <p className="text-sm text-muted-foreground">ID: {certificateData.verificationId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(certificateData.status)}
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="bg-gradient-to-br from-tessera-blue-50 to-tessera-cyan-50 dark:from-tessera-blue-950/20 dark:to-tessera-cyan-950/20 rounded-lg p-6 border">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <img
                    src={certificateData.institutionLogo || "/placeholder.svg"}
                    alt="Logo institución"
                    className="h-16 w-16 rounded-full border-2 border-background"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-tessera-blue-700 dark:text-tessera-blue-300">
                    {certificateData.certificateTitle}
                  </h3>
                  <p className="text-lg mt-2">
                    Se certifica que <span className="font-semibold">{certificateData.studentName}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{certificateData.description}</p>
                </div>

                <div className="flex justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Emitido por</p>
                    <p className="font-semibold">{certificateData.institutionName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estudiante</p>
                    <p className="font-medium">{certificateData.studentName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Institución</p>
                    <p className="font-medium">{certificateData.institutionName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Emisión</p>
                    <p className="font-medium">
                      {new Date(certificateData.issueDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {certificateData.expirationDate && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha de Expiración</p>
                      <p className="font-medium">
                        {new Date(certificateData.expirationDate).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Info */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-tessera-blue-500" />
                <span className="text-sm font-medium">Información de Verificación</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Token: {token}</p>
                <p>Verificado el: {new Date().toLocaleString("es-ES")}</p>
                <p>Este certificado ha sido validado usando la tecnología blockchain de Tessera</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share className="mr-2 h-4 w-4" />
                Compartir
              </Button>
              <Button onClick={onClose} className="flex-1">
                Cerrar
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
