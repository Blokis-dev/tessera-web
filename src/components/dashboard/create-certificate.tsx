"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import * as htmlToImage from "html-to-image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CertificateTemplate } from "./certificate-template"
import { Download, Maximize2, Send, Loader2, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"

interface Institution {
  id: string
  name: string
}

interface FormData {
  recipientName: string
  courseTitle: string
  issueDate: string
  template: string
  institutionName: string
}

export function CreateCertificate() {
  const [formData, setFormData] = useState<FormData>({
    recipientName: "",
    courseTitle: "",
    issueDate: "",
    template: "",
    institutionName: "",
  })

  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("")
  const [certificateImage, setCertificateImage] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const fetchInstitutions = useCallback(async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      
      if (!baseUrl) {
        console.error('API base URL no está configurado')
        toast({
          title: "Error de configuración",
          description: "La URL base de la API no está configurada",
          variant: "destructive",
        })
        return
      }

      console.log('Fetching institutions from:', `${baseUrl}/companies/public/institutions`)
      
      const response = await fetch(`${baseUrl}/companies/public/institutions`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Institutions data:', data)
        
        if (Array.isArray(data)) {
          setInstitutions(data)
        } else {
          console.error('Response data is not an array:', data)
          setInstitutions([])
        }
      } else {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        
        toast({
          title: "Error al cargar instituciones",
          description: `Error ${response.status}: ${errorText || 'Error desconocido'}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching institutions:', error)
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor para cargar las instituciones",
        variant: "destructive",
      })
    }
  }, [toast])

  useEffect(() => {
    console.log('Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL)
    console.log('User data from myinfo:', user)
    console.log('User institution:', user?.institution)
    console.log('User institution ID:', user?.institution?.id)
    console.log('User institution name:', user?.institution?.name)
    fetchInstitutions()
  }, [fetchInstitutions, user])

  useEffect(() => {
    // Si el usuario tiene una institución asignada, seleccionarla automáticamente
    if (user?.institution?.id && institutions.length > 0) {
      console.log('Auto-selecting institution:', user.institution.id)
      setSelectedInstitutionId(user.institution.id)
      
      // También establecer el nombre de la institución en el formulario
      const userInstitution = institutions.find(inst => inst.id === user.institution?.id)
      if (userInstitution) {
        console.log('Found user institution in list:', userInstitution)
        setFormData(prev => ({ ...prev, institutionName: userInstitution.name }))
      } else {
        // Si no encuentra la institución en la lista, usar el nombre del usuario
        console.log('Using institution name from user data:', user.institution.name)
        setFormData(prev => ({ ...prev, institutionName: user.institution?.name || '' }))
      }
    }
  }, [user, institutions])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInstitutionChange = (institutionId: string) => {
    setSelectedInstitutionId(institutionId)
    const selectedInstitution = institutions.find(inst => inst.id === institutionId)
    if (selectedInstitution) {
      setFormData(prev => ({ ...prev, institutionName: selectedInstitution.name }))
    }
  }

  const handleGenerateCertificate = async () => {
    setIsGenerating(true)
    try {
      if (certificateRef.current) {
        const dataUrl = await htmlToImage.toPng(certificateRef.current, {
          quality: 1,
          pixelRatio: 2
        })
        
        setCertificateImage(dataUrl)
        setCertificateGenerated(true)
        
        // Descargar automáticamente
        const link = document.createElement("a")
        link.download = `certificado-${formData.recipientName.replace(/\s+/g, '-')}.png`
        link.href = dataUrl
        link.click()
        
        toast({
          title: "¡Certificado generado!",
          description: "El certificado se ha generado y descargado. Ahora puedes enviarlo al sistema.",
        })
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
      toast({
        title: "Error",
        description: "Ocurrió un error al generar el certificado.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendToBackend = async () => {
    if (!certificateImage) {
      toast({
        title: "Error",
        description: "Primero debes generar el certificado.",
        variant: "destructive",
      })
      return
    }

    const institutionId = selectedInstitutionId || user?.institution?.id
    if (!institutionId) {
      toast({
        title: "Error",
        description: "Debes seleccionar una institución.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      
      // Convertir dataURL a blob
      const response = await fetch(certificateImage)
      const blob = await response.blob()
      
      // Crear FormData
      const formDataToSend = new FormData()
      formDataToSend.append('course_name', formData.courseTitle)
      formDataToSend.append('recipient_name', formData.recipientName)
      formDataToSend.append('institute_id', institutionId)
      formDataToSend.append('issued_at', new Date(formData.issueDate).toISOString())
      formDataToSend.append('image', blob, `certificado-${formData.recipientName.replace(/\s+/g, '-')}.png`)
      
      console.log('Sending certificate with institution ID:', institutionId)
      
      const backendResponse = await fetch(`${baseUrl}/certificates/create-complete`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      })
      
      if (backendResponse.ok) {
        toast({
          title: "¡Certificado enviado!",
          description: "El certificado se ha registrado exitosamente en el sistema.",
        })
        
        // Limpiar formulario
        setFormData({
          recipientName: "",
          courseTitle: "",
          issueDate: "",
          template: "",
          institutionName: "",
        })
        setCertificateImage("")
        setCertificateGenerated(false)
        setSelectedInstitutionId("")
      } else {
        const errorData = await backendResponse.json()
        throw new Error(errorData.message || 'Error al enviar el certificado')
      }
    } catch (error) {
      console.error('Error sending certificate:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar el certificado al sistema.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const templateOptions = [
    { value: "academic", label: "Certificado Académico", color: "Azul" },
    { value: "completion", label: "Certificado de Finalización", color: "Verde" },
    { value: "achievement", label: "Certificado de Logro", color: "Dorado" },
    { value: "participation", label: "Certificado de Participación", color: "Púrpura" },
  ]

  return (
    <div className="space-y-6">
      {/* Header con gradiente */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Crear{" "}
          <span 
            className="bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(90deg, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}
          >
            Certificado
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Genera un nuevo certificado validado con Tessera
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulario principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
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
                  <Download className="h-5 w-5" style={{ color: "var(--primary)" }} />
                </div>
                Plantilla de Certificado
              </CardTitle>
              <CardDescription>Selecciona el estilo de certificado que deseas usar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="template-select">Plantilla Predefinida</Label>
                <Select value={formData.template} onValueChange={(value) => handleInputChange("template", value)}>
                  <SelectTrigger 
                    className="transition-all duration-200"
                    style={{
                      borderColor: "var(--border)"
                    }}
                  >
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{option.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">({option.color})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
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
                  <CheckCircle className="h-5 w-5" style={{ color: "var(--accent)" }} />
                </div>
                Información del Certificado
              </CardTitle>
              <CardDescription>Completa los datos necesarios para generar el certificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="student-name">Nombre Completo del Estudiante *</Label>
                  <Input
                    id="student-name"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    placeholder="Ej: María García López"
                    style={{
                      borderColor: "var(--border)"
                    }}
                    className="transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="issue-date">Fecha de Emisión *</Label>
                  <Input
                    id="issue-date"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    style={{
                      borderColor: "var(--border)"
                    }}
                    className="transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="certificate-title">Título del Certificado *</Label>
                <Input
                  id="certificate-title"
                  value={formData.courseTitle}
                  onChange={(e) => handleInputChange("courseTitle", e.target.value)}
                  placeholder="Ej: Certificado de Finalización en Programación Web"
                  style={{
                    borderColor: "var(--border)"
                  }}
                  className="transition-all duration-200"
                />
              </div>

              <div>
                <Label htmlFor="institution-select">Institución *</Label>
                <Select 
                  value={selectedInstitutionId} 
                  onValueChange={handleInstitutionChange}
                  disabled={institutions.length === 0}
                >
                  <SelectTrigger 
                    className="transition-all duration-200"
                    style={{
                      borderColor: "var(--border)"
                    }}
                  >
                    <SelectValue placeholder="Seleccionar institución" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {user?.institution && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Tu institución: {user.institution.name} (Estado: {user.institution.status})
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, var(--primary), var(--accent))"
              }}
            />
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Vista Previa
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={!formData.template}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Vista Previa del Certificado</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <CertificateTemplate
                        studentName={formData.recipientName}
                        certificateTitle={formData.courseTitle}
                        issueDate={formData.issueDate}
                        institutionName={formData.institutionName}
                        template={formData.template}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>Previsualiza cómo se verá tu certificado</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={certificateRef}>
                <CertificateTemplate
                  studentName={formData.recipientName}
                  certificateTitle={formData.courseTitle}
                  issueDate={formData.issueDate}
                  institutionName={formData.institutionName}
                  template={formData.template}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-background/95 border shadow-lg relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, var(--accent), var(--primary))"
              }}
            />
            <CardHeader>
              <CardTitle>Costo</CardTitle>
              <CardDescription>Tokens requeridos para este certificado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Certificado básico</span>
                  <span className="font-medium" style={{ color: "var(--primary)" }}>1 Token</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Tokens disponibles</span>
                  <span>42 Tokens</span>
                </div>
                <hr />
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span style={{ color: "var(--primary)" }}>1 Token</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button
              className="w-full transition-all duration-200"
              style={{
                background: "linear-gradient(90deg, var(--primary), var(--accent))",
                color: "white"
              }}
              onClick={handleGenerateCertificate}
              disabled={!formData.recipientName || !formData.courseTitle || !formData.issueDate || !selectedInstitutionId || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Generar Certificado
                </>
              )}
            </Button>
            
            {certificateGenerated && (
              <Button
                className="w-full transition-all duration-200"
                style={{
                  background: "linear-gradient(90deg, #10b981, #059669)",
                  color: "white"
                }}
                onClick={handleSendToBackend}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar al Sistema
                  </>
                )}
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full transition-all duration-200"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)"
              }}
            >
              Guardar como Borrador
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}