"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const router = useRouter()
    const { login } = useAuth()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Importante: incluir cookies
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })

            const data = await response.json()

            if (response.ok) {
                // Login exitoso - las cookies se establecen automáticamente
                const user = data.user
                
                // Actualizar el contexto de autenticación
                login(user)
                
                // La redirección se manejará automáticamente por el AuthProvider
            } else if (response.status === 403 && data.error === 'REDIRECT_TO_FIRST_TIME_LOGIN') {
                // Usuario necesita cambiar contraseña en primer login
                router.push(`/auth/first-time-login?email=${encodeURIComponent(formData.email)}`)
            } else {
                // Error de credenciales u otro error
                setError(data.message || 'Error al iniciar sesión')
            }
        } catch (err) {
            setError('Error de conexión. Por favor intenta de nuevo.')
            console.error('Login error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, var(--primary)/10, var(--accent)/10)"
            }}
        >
            {/* Animated floating circles background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large circles */}
                <div
                    className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-15 dark:opacity-10"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 60%)",
                        animation: "float 25s ease-in-out infinite"
                    }}
                ></div>
                <div
                    className="absolute top-1/4 -right-32 w-80 h-80 rounded-full opacity-20 dark:opacity-15"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 65%)",
                        animation: "float 30s ease-in-out infinite reverse"
                    }}
                ></div>
                <div
                    className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full opacity-12 dark:opacity-8"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 55%)",
                        animation: "float 35s ease-in-out infinite"
                    }}
                ></div>

                {/* Medium circles */}
                <div
                    className="absolute top-16 left-1/6 w-48 h-48 rounded-full opacity-18 dark:opacity-12"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 60%)",
                        animation: "float 22s ease-in-out infinite reverse"
                    }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/6 w-56 h-56 rounded-full opacity-15 dark:opacity-10"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 65%)",
                        animation: "float 28s ease-in-out infinite"
                    }}
                ></div>

                {/* Small circles */}
                <div
                    className="absolute top-1/3 left-3/4 w-32 h-32 rounded-full opacity-25 dark:opacity-18"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 50%)",
                        animation: "float 18s ease-in-out infinite reverse"
                    }}
                ></div>
                <div
                    className="absolute bottom-1/3 left-1/8 w-24 h-24 rounded-full opacity-30 dark:opacity-22"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 40%)",
                        animation: "float 15s ease-in-out infinite"
                    }}
                ></div>
                <div
                    className="absolute top-3/4 right-1/4 w-40 h-40 rounded-full opacity-20 dark:opacity-15"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 55%)",
                        animation: "float 26s ease-in-out infinite reverse"
                    }}
                ></div>

                {/* Mini circles for extra detail */}
                <div
                    className="absolute top-1/8 right-1/3 w-16 h-16 rounded-full opacity-35 dark:opacity-25"
                    style={{
                        background: "radial-gradient(circle, var(--primary), transparent 35%)",
                        animation: "float 12s ease-in-out infinite"
                    }}
                ></div>
                <div
                    className="absolute bottom-1/8 left-2/3 w-20 h-20 rounded-full opacity-28 dark:opacity-20"
                    style={{
                        background: "radial-gradient(circle, var(--accent), transparent 45%)",
                        animation: "float 16s ease-in-out infinite reverse"
                    }}
                ></div>
            </div>

            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-background/25 backdrop-blur-[0.5px]"></div>

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
                        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                        <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div
                                className="mb-4 p-3 text-sm rounded-md border"
                                style={{
                                    backgroundColor: "oklch(0.95 0.08 27.325)",
                                    color: "oklch(0.45 0.20 27.325)",
                                    borderColor: "oklch(0.85 0.15 27.325)"
                                }}
                            >
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        borderColor: "var(--primary)"
                                    }}
                                    className="focus:ring-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            borderColor: "var(--primary)"
                                        }}
                                        className="focus:ring-2 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                style={{
                                    background: "linear-gradient(90deg, var(--primary), var(--accent))",
                                    color: "var(--primary-foreground)"
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">¿No tienes una cuenta? </span>
                            <Link
                                href="/auth/register"
                                className="font-medium"
                                style={{
                                    color: "var(--primary)"
                                }}
                            >
                                Regístrate aquí
                            </Link>
                        </div>
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
                        transform: translateY(-20px) translateX(15px) scale(1.05);
                    }
                    50% {
                        transform: translateY(-10px) translateX(-18px) scale(0.95);
                    }
                    75% {
                        transform: translateY(-25px) translateX(8px) scale(1.02);
                    }
                }
            `}</style>
        </div>
    )
}
