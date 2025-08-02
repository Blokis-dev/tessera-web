"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Aquí implementarías la lógica de login
        setTimeout(() => setIsLoading(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-end mb-4">
                    <ThemeToggle />
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto p-3 bg-teal-100 dark:bg-teal-900 rounded-full w-fit mb-4">
                            <Shield className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                        </div>
                        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                        <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    required
                                    className="focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="focus:ring-teal-500 focus:border-teal-500 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-gray-600 dark:text-gray-400">¿No tienes una cuenta? </span>
                            <Link href="/auth/register" className="text-teal-600 hover:text-teal-700 font-medium">
                                Regístrate aquí
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}
