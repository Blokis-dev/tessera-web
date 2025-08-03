"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CertificateTemplate } from "./certificate-template"
import { Upload, Download, Maximize2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function CreateCertificate() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    certificateTitle: "",
    description: "",
    issueDate: "",
    expirationDate: "",
    template: "",
    additionalNotes: "",
    institutionName: "Universidad XYZ",
  })

  const [templateFile, setTemplateFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTemplateFile(file)
    }
  }

  const handleGenerateCertificate = async () => {
    setIsGenerating(true)
    // Simular generación de certificado
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    alert("¡Certificado generado exitosamente! Se ha descontado 1 token.")
  }

  const templateOptions = [
    { value: "academic", label: "Certificado Académico", color: "Azul" },
    { value: "completion", label: "Certificado de Finalización", color: "Verde" },
    { value: "achievement", label: "Certificado de Logro", color: "Dorado" },
    { value: "participation", label: "Certificado de Participación", color: "Púrpura" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Crear Certificado</h1>
        <p className="text-muted-foreground">Genera un nuevo certificado validado con Tessera</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulario principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plantilla de Certificado</CardTitle>
              <CardDescription>Selecciona el estilo de certificado que deseas usar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="template-select">Plantilla Predefinida</Label>
                  <Select value={formData.template} onValueChange={(value) => handleInputChange("template", value)}>
                    <SelectTrigger>
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

                
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Datos del Estudiante</CardTitle>
              <CardDescription>Completa la información del estudiante para el certificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="student-name">Nombre Completo del Estudiante *</Label>
                  <Input
                    id="student-name"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange("studentName", e.target.value)}
                    placeholder="Ej: María García López"
                  />
                </div>
                <div>
                  <Label htmlFor="student-id">ID del Estudiante</Label>
                  <Input
                    id="student-id"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    placeholder="Ej: EST-2024-001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del Certificado</CardTitle>
              <CardDescription>Información específica del certificado a emitir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="certificate-title">Título del Certificado *</Label>
                <Input
                  id="certificate-title"
                  value={formData.certificateTitle}
                  onChange={(e) => handleInputChange("certificateTitle", e.target.value)}
                  placeholder="Ej: Certificado de Finalización en Programación Web"
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descripción detallada del certificado y logros del estudiante"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="issue-date">Fecha de Emisión *</Label>
                  <Input
                    id="issue-date"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange("issueDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="expiration-date">Fecha de Expiración (Opcional)</Label>
                  <Input
                    id="expiration-date"
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="institution-name">Nombre de la Institución</Label>
                <Input
                  id="institution-name"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange("institutionName", e.target.value)}
                  placeholder="Nombre de tu institución"
                />
              </div>

              <div>
                <Label htmlFor="additional-notes">Notas Adicionales</Label>
                <Textarea
                  id="additional-notes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Cualquier información adicional relevante"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Vista Previa
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={!formData.template && !templateFile}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Vista Previa del Certificado</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <CertificateTemplate
                        studentName={formData.studentName}
                        certificateTitle={formData.certificateTitle}
                        description={formData.description}
                        issueDate={formData.issueDate}
                        institutionName={formData.institutionName}
                        template={formData.template}
                        additionalNotes={formData.additionalNotes}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>Previsualiza cómo se verá tu certificado</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificateTemplate
                studentName={formData.studentName}
                certificateTitle={formData.certificateTitle}
                description={formData.description}
                issueDate={formData.issueDate}
                institutionName={formData.institutionName}
                template={formData.template}
                additionalNotes={formData.additionalNotes}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Costo</CardTitle>
              <CardDescription>Tokens requeridos para este certificado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Certificado básico</span>
                  <span className="font-medium">1 Token</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Tokens disponibles</span>
                  <span>42 Tokens</span>
                </div>
                <hr />
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span>1 Token</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button
              className="w-full bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 hover:from-tessera-blue-600 hover:to-tessera-cyan-600"
              onClick={handleGenerateCertificate}
              disabled={!formData.studentName || !formData.certificateTitle || !formData.issueDate || isGenerating}
            >
              {isGenerating ? (
                <>Generando...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Generar Certificado
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Guardar como Borrador
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
