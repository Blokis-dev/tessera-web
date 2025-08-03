"use client"

import { Card } from "@/components/ui/card"
import { QrCode, Shield, Award, Star } from "lucide-react"

interface CertificateTemplateProps {
  studentName: string
  certificateTitle: string
  issueDate: string
  institutionName?: string
  template: string
}

export function CertificateTemplate({
  studentName,
  certificateTitle,
  issueDate,
  institutionName = "Universidad XYZ",
  template,
}: CertificateTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTemplateStyles = () => {
    switch (template) {
      case "academic":
        return {
          bgGradient: "from-tessera-blue-50 via-white to-tessera-cyan-50",
          borderColor: "border-tessera-blue-200",
          accentColor: "text-tessera-blue-700",
          decorativeColor: "text-tessera-blue-500",
        }
      case "completion":
        return {
          bgGradient: "from-green-50 via-white to-emerald-50",
          borderColor: "border-green-200",
          accentColor: "text-green-700",
          decorativeColor: "text-green-500",
        }
      case "achievement":
        return {
          bgGradient: "from-amber-50 via-white to-yellow-50",
          borderColor: "border-amber-200",
          accentColor: "text-amber-700",
          decorativeColor: "text-amber-500",
        }
      case "participation":
        return {
          bgGradient: "from-purple-50 via-white to-violet-50",
          borderColor: "border-purple-200",
          accentColor: "text-purple-700",
          decorativeColor: "text-purple-500",
        }
      default:
        return {
          bgGradient: "from-tessera-blue-50 via-white to-tessera-cyan-50",
          borderColor: "border-tessera-blue-200",
          accentColor: "text-tessera-blue-700",
          decorativeColor: "text-tessera-blue-500",
        }
    }
  }

  const styles = getTemplateStyles()

  if (!studentName && !certificateTitle) {
    return (
      <Card className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
        <div className="text-center space-y-2">
          <Award className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Completa los campos para ver la vista previa del certificado</p>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`aspect-[4/3] p-8 relative overflow-hidden bg-gradient-to-br ${styles.bgGradient} ${styles.borderColor} border-2`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500"></div>
      <div className="absolute top-4 left-4 opacity-10">
        <Shield className="h-16 w-16 text-tessera-blue-500" />
      </div>
      <div className="absolute top-4 right-4 opacity-10">
        <Star className="h-12 w-12 text-tessera-cyan-500" />
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500 flex items-center justify-center mr-3">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-tessera-blue-600 to-tessera-cyan-600 bg-clip-text text-transparent">
              TESSERA
            </h1>
            <p className="text-xs text-muted-foreground">Certificado Verificado</p>
          </div>
        </div>
        <h2 className={`text-xl font-bold ${styles.accentColor} mb-1`}>{institutionName}</h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 mx-auto"></div>
      </div>

      {/* Main content */}
      <div className="text-center space-y-4 flex-1">
        <div>
          <h3 className={`text-lg font-semibold ${styles.accentColor} mb-2`}>
            {certificateTitle || "Título del Certificado"}
          </h3>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Se certifica que</p>
          <p className={`text-xl font-bold ${styles.accentColor}`}>{studentName || "Nombre del Estudiante"}</p>
          <p className="text-sm text-muted-foreground">ha completado satisfactoriamente</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end mt-6">
        <div className="text-left">
          <div className="w-20 h-0.5 bg-muted mb-1"></div>
          <p className="text-xs text-muted-foreground">Firma Autorizada</p>
          <p className="text-xs font-medium">Director Académico</p>
        </div>

        <div className="text-center">
          {issueDate && (
            <div>
              <p className="text-xs text-muted-foreground">Fecha de Emisión</p>
              <p className="text-xs font-medium">{formatDate(issueDate)}</p>
            </div>
          )}
        </div>

        {/* QR Code */}
        <div className="text-right">
          <div className="w-16 h-16 bg-white rounded border-2 border-muted flex items-center justify-center">
            <QrCode className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Código QR</p>
        </div>
      </div>

      {/* Verification ID */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-muted-foreground">ID: TSR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
      </div>
    </Card>
  )
}
