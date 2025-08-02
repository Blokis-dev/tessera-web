"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Shield, ArrowLeft, Upload } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface PersonalData {
    fullName: string
    email: string
    role: string
}

interface InstitutionData {
    institutionName: string
    legalId: string
    institutionalEmail: string
    website: string
    description: string
    logo: File | null
}

export default function RegisterForm() {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [personalData, setPersonalData] = useState<PersonalData>({
        fullName: "",
        email: "",
        role: "",
    })
    const [institutionData, setInstitutionData] = useState<InstitutionData>({
        institutionName: "",
        legalId: "",
        institutionalEmail: "",
        website: "",
        description: "",
        logo: null,
    })

    const handlePersonalSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (personalData.fullName && personalData.email && personalData.role) {
            setStep(2)
        }
    }

    const handleInstitutionSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Aquí implementarías la lógica de registro
        console.log("Datos personales:", personalData)
        console.log("Datos institucionales:", institutionData)

        // Simular llamada a la API
        setTimeout(() => {
            setIsLoading(false)
            setStep(3) // Cambiar al paso de confirmación
        }, 2000)
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setInstitutionData((prev) => ({ ...prev, logo: file }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-end mb-4">
                    <ThemeToggle />
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full w-fit mb-4">
                            <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <CardTitle className="text-2xl">
                            {step === 1
                                ? "Registro - Datos Personales"
                                : step === 2
                                    ? "Registro - Datos Institucionales"
                                    : "Registro Completado"}
                        </CardTitle>
                        <CardDescription>
                            {step === 1
                                ? "Completa tus datos personales para continuar"
                                : step === 2
                                    ? "Información de tu institución"
                                    : "Tu solicitud ha sido enviada exitosamente"}
                        </CardDescription>

                        {/* Progress indicator */}
                        <div className="flex justify-center mt-4">
                            <div className="flex space-x-2">
                                <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-emerald-500" : "bg-gray-300"}`} />
                                <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-emerald-500" : "bg-gray-300"}`} />
                                <div className={`w-3 h-3 rounded-full ${step >= 3 ? "bg-emerald-500" : "bg-gray-300"}`} />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {step === 1 ? (
                            <form onSubmit={handlePersonalSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Nombre Completo</Label>
                                    <Input
                                        id="fullName"
                                        placeholder="Nombres y Apellidos"
                                        value={personalData.fullName}
                                        onChange={(e) => setPersonalData((prev) => ({ ...prev, fullName: e.target.value }))}
                                        required
                                        className="focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={personalData.email}
                                        onChange={(e) => setPersonalData((prev) => ({ ...prev, email: e.target.value }))}
                                        required
                                        className="focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Rol</Label>
                                    <Select
                                        value={personalData.role}
                                        onValueChange={(value) => setPersonalData((prev) => ({ ...prev, role: value }))}
                                    >
                                        <SelectTrigger className="focus:ring-emerald-500 focus:border-emerald-500">
                                            <SelectValue placeholder="Selecciona tu rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="estudiante">Estudiante</SelectItem>
                                            <SelectItem value="institucion">Institución</SelectItem>
                                            <SelectItem value="admin">Administrador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    Siguiente
                                </Button>
                            </form>
                        ) : step === 2 ? (
                            <form onSubmit={handleInstitutionSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="institutionName">Nombre de la Institución</Label>
                                    <Input
                                        id="institutionName"
                                        placeholder="Universidad XYZ"
                                        value={institutionData.institutionName}
                                        onChange={(e) => setInstitutionData((prev) => ({ ...prev, institutionName: e.target.value }))}
                                        required
                                        className="focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="legalId">NIT (ID Legal)</Label>
                                    <Input
                                        id="legalId"
                                        placeholder="123456789-0"
                                        value={institutionData.legalId}
                                        onChange={(e) => setInstitutionData((prev) => ({ ...prev, legalId: e.target.value }))}
                                        required
                                        className="focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="institutionalEmail">Email Institucional</Label>
                                    <Input
                                        id="institutionalEmail"
                                        type="email"
                                        placeholder="contacto@institucion.edu"
                                        value={institutionData.institutionalEmail}
                                        onChange={(e) => setInstitutionData((prev) => ({ ...prev, institutionalEmail: e.target.value }))}
                                        required
                                        className="focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="website">Sitio Web</Label>
                                    <Input
                                        id="website"
                                        type="url"
                                        placeholder="https://www.institucion.edu"
                                        value={institutionData.website}
                                        onChange={(e) => setInstitutionData((prev) => ({ ...prev, website: e.target.value }))}
                                        className="focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción (Opcional)</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Breve descripción de la institución..."
                                        value={institutionData.description}
                                        onChange={(e) => setInstitutionData((prev) => ({ ...prev, description: e.target.value }))}
                                        className="focus:ring-teal-500 focus:border-teal-500 min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="logo">Logo de la Institución</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="focus:ring-teal-500 focus:border-teal-500"
                                        />
                                        <Upload className="h-4 w-4 text-gray-400" />
                                    </div>
                                    {institutionData.logo && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Archivo seleccionado: {institutionData.logo.name}
                                        </p>
                                    )}
                                </div>

                                <div className="flex space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Atrás
                                    </Button>
                                    <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                                        {isLoading ? "Registrando..." : "Registrarse"}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            // Paso 3: Pantalla de confirmación
                            <div className="text-center space-y-6 py-8">
                                <div className="mx-auto p-4 bg-emerald-100 dark:bg-emerald-900 rounded-full w-fit">
                                    <Shield className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">¡Gracias por registrarse!</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                        Su solicitud está siendo revisada, se le mandará sus credenciales cuando sea aprovada, esté atento a su correo electrónico.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Button asChild className="bg-teal-600 hover:bg-teal-700">
                                        <Link href="/auth/login">Ir al Login</Link>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step < 3 && (
                            <div className="mt-6 text-center text-sm">
                                <span className="text-gray-600 dark:text-gray-400">¿Ya tienes una cuenta? </span>
                                <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                                    Inicia sesión aquí
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}
