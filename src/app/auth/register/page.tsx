"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, ArrowLeft, Upload, AlertCircle } from "lucide-react"
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
    const [error, setError] = useState("")
    const [personalData, setPersonalData] = useState<PersonalData>({
        fullName: "",
        email: "",
        role: "owner", // Por defecto será propietario de institución
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
        setError("") // Limpiar errores previos
        if (personalData.fullName && personalData.email) {
            setStep(2)
        }
    }

    const handleInstitutionSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("") // Limpiar errores previos

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
            
            const requestData = {
                name: institutionData.institutionName,
                legal_id: institutionData.legalId,
                email_institucional: institutionData.institutionalEmail,
                owner_email: personalData.email,
                owner_full_name: personalData.fullName,
                website: institutionData.website || undefined,
                description: institutionData.description || undefined
            }

            const response = await fetch(`${baseUrl}/companies/create-with-owner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(requestData)
            })

            const responseData = await response.json()

            if (response.ok) {
                setStep(3) // Cambiar al paso de confirmación
            } else {
                console.error("Error en el registro:", responseData)
                setError(responseData.message || 'Error al crear la cuenta')
            }
        } catch (error) {
            console.error("Error de conexión:", error)
            setError('Error de conexión. Por favor intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setInstitutionData((prev) => ({ ...prev, logo: file }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated floating circles background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large circles */}
                <div
                    className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-15 dark:opacity-10"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 60%)",
                        animation: "float 24s ease-in-out infinite"
                    }}
                ></div>
                <div
                    className="absolute top-1/4 -right-32 w-80 h-80 rounded-full opacity-18 dark:opacity-13"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 65%)",
                        animation: "float 29s ease-in-out infinite reverse"
                    }}
                ></div>
                <div
                    className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full opacity-12 dark:opacity-8"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 55%)",
                        animation: "float 34s ease-in-out infinite"
                    }}
                ></div>

                {/* Medium circles */}
                <div
                    className="absolute top-16 left-1/6 w-48 h-48 rounded-full opacity-20 dark:opacity-14"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 60%)",
                        animation: "float 21s ease-in-out infinite reverse"
                    }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/6 w-56 h-56 rounded-full opacity-16 dark:opacity-11"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 65%)",
                        animation: "float 27s ease-in-out infinite"
                    }}
                ></div>

                {/* Small circles */}
                <div
                    className="absolute top-1/3 left-3/4 w-32 h-32 rounded-full opacity-25 dark:opacity-18"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 50%)",
                        animation: "float 17s ease-in-out infinite reverse"
                    }}
                ></div>
                <div
                    className="absolute bottom-1/3 left-1/8 w-24 h-24 rounded-full opacity-28 dark:opacity-20"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 40%)",
                        animation: "float 14s ease-in-out infinite"
                    }}
                ></div>
                <div
                    className="absolute top-3/4 right-1/4 w-40 h-40 rounded-full opacity-22 dark:opacity-16"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 55%)",
                        animation: "float 25s ease-in-out infinite reverse"
                    }}
                ></div>

                {/* Mini circles for extra detail */}
                <div
                    className="absolute top-1/8 right-1/3 w-16 h-16 rounded-full opacity-32 dark:opacity-24"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 35%)",
                        animation: "float 11s ease-in-out infinite"
                    }}
                ></div>
                <div
                    className="absolute bottom-1/8 left-2/3 w-20 h-20 rounded-full opacity-26 dark:opacity-19"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 45%)",
                        animation: "float 15s ease-in-out infinite reverse"
                    }}
                ></div>

                {/* Additional circles for more density */}
                <div
                    className="absolute top-1/2 left-1/12 w-28 h-28 rounded-full opacity-18 dark:opacity-12"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 50%)",
                        animation: "float 19s ease-in-out infinite"
                    }}
                ></div>
                <div
                    className="absolute bottom-1/2 right-1/8 w-36 h-36 rounded-full opacity-14 dark:opacity-10"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 60%)",
                        animation: "float 23s ease-in-out infinite reverse"
                    }}
                ></div>
            </div>

            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-background/20 backdrop-blur-[0.5px]"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="flex justify-end mb-4">
                    <ThemeToggle />
                </div>

                <Card className="backdrop-blur-sm bg-background/95 border shadow-2xl">
                    <CardHeader className="text-center">
                        <div
                            className="mx-auto p-3 rounded-full w-fit mb-4"
                            style={{
                                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                                border: "2px solid white"
                            }}
                        >
                            <Shield className="h-8 w-8" style={{ color: "white" }} />
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
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: step >= 1 ? "var(--primary)" : "var(--muted)"
                                    }}
                                />
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: step >= 2 ? "var(--primary)" : "var(--muted)"
                                    }}
                                />
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: step >= 3 ? "var(--primary)" : "var(--muted)"
                                    }}
                                />
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
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-[var(--primary)] focus:border-[var(--primary)]"
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
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Rol</Label>
                                    <div className="p-2 bg-muted rounded-md border">
                                        <p className="text-sm text-muted-foreground">
                                            Propietario de Institución
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Se te asignará automáticamente como propietario de la institución que registres
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    style={{
                                        background: "linear-gradient(90deg, var(--primary), var(--accent))",
                                        color: "var(--primary-foreground)"
                                    }}
                                >
                                    Siguiente
                                </Button>
                            </form>
                        ) : step === 2 ? (
                            <form onSubmit={handleInstitutionSubmit} className="space-y-4">
                                {error && (
                                    <div
                                        className="mb-4 p-3 text-sm rounded-md border flex items-center gap-2"
                                        style={{
                                            backgroundColor: "oklch(0.95 0.08 27.325)",
                                            color: "oklch(0.45 0.20 27.325)",
                                            borderColor: "oklch(0.85 0.15 27.325)"
                                        }}
                                    >
                                        <AlertCircle className="h-4 w-4" />
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="institutionName">Nombre de la Institución</Label>
                                    <Input
                                        id="institutionName"
                                        placeholder="Universidad XYZ"
                                        value={institutionData.institutionName}
                                        onChange={(e) => setInstitutionData((prev) => ({ ...prev, institutionName: e.target.value }))}
                                        required
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-[var(--primary)] focus:border-[var(--primary)]"
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
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-[var(--primary)] focus:border-[var(--primary)]"
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
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-[var(--primary)] focus:border-[var(--primary)]"
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
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción (Opcional)</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Breve descripción de la institución..."
                                        value={institutionData.description}
                                        onChange={(e) => setInstitutionData((prev) => ({ ...prev, description: e.target.value }))}
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-[var(--primary)] focus:border-[var(--primary)] min-h-[80px]"
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
                                            style={{
                                                borderColor: "var(--primary)"
                                            }}
                                            className="focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                                        />
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    {institutionData.logo && (
                                        <p className="text-sm text-muted-foreground">
                                            Archivo seleccionado: {institutionData.logo.name}
                                        </p>
                                    )}
                                </div>

                                <div className="flex space-x-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                        className="flex-1"
                                        style={{
                                            borderColor: "var(--primary)",
                                            color: "var(--primary)"
                                        }}
                                    >
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Atrás
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        style={{
                                            background: "linear-gradient(90deg, var(--primary), var(--accent))",
                                            color: "var(--primary-foreground)"
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Registrando..." : "Registrarse"}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center space-y-6 py-8">
                                <div
                                    className="mx-auto p-4 rounded-full w-fit"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary), var(--accent))",
                                        border: "2px solid white"
                                    }}
                                >
                                    <Shield className="h-12 w-12" style={{ color: "white" }} />
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold" style={{ color: "var(--primary)" }}>
                                        ¡Gracias por registrarse!
                                    </h2>
                                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                        Su solicitud está siendo revisada, se le mandará sus credenciales cuando sea aprovada, esté atento a su correo electrónico.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        asChild
                                        style={{
                                            background: "linear-gradient(90deg, var(--primary), var(--accent))",
                                            color: "var(--primary-foreground)"
                                        }}
                                    >
                                        <Link href="/auth/login">Ir al Login</Link>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step < 3 && (
                            <div className="mt-6 text-center text-sm">
                                <span className="text-muted-foreground">¿Ya tienes una cuenta? </span>
                                <Link
                                    href="/auth/login"
                                    className="font-medium"
                                    style={{
                                        color: "var(--primary)"
                                    }}
                                >
                                    Inicia sesión aquí
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* CSS Animation Keyframes */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px) scale(1);
                    }
                    25% {
                        transform: translateY(-18px) translateX(12px) scale(1.04);
                    }
                    50% {
                        transform: translateY(-8px) translateX(-16px) scale(0.96);
                    }
                    75% {
                        transform: translateY(-22px) translateX(6px) scale(1.01);
                    }
                }
            `}</style>
        </div>
    )
}
