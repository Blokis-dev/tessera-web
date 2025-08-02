"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Download, Eye } from "lucide-react"

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
              <CardDescription>Sube tu plantilla personalizada o selecciona una predefinida</CardDescription>
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
                      <SelectItem value="academic">Certificado Académico</SelectItem>
                      <SelectItem value="completion">Certificado de Finalización</SelectItem>
                      <SelectItem value="achievement">Certificado de Logro</SelectItem>
                      <SelectItem value="participation">Certificado de Participación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">o</span>
                </div>

                <div>
                  <Label htmlFor="template-upload">Subir Plantilla Personalizada</Label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-muted-foreground/50 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="flex text-sm text-muted-foreground">
                        <label
                          htmlFor="template-upload"
                          className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                        >
                          <span>Subir archivo</span>
                          <input
                            id="template-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleTemplateUpload}
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-muted-foreground">PDF, PNG, JPG hasta 10MB</p>
                      {templateFile && <p className="text-sm text-green-600 mt-2">✓ {templateFile.name}</p>}
                    </div>
                  </div>
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
              <CardTitle>Vista Previa</CardTitle>
              <CardDescription>Previsualiza cómo se verá tu certificado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center space-y-2">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formData.template || templateFile ? "Vista previa disponible" : "Selecciona una plantilla"}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                disabled={!formData.template && !templateFile}
              >
                <Eye className="mr-2 h-4 w-4" />
                Vista Previa Completa
              </Button>
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
