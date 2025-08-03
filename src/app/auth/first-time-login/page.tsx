"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function FirstTimeLoginForm() {
    const [showPasswords, setShowPasswords] = useState({
        temporary: false,
        new: false,
        confirm: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        temporary_password: "",
        new_password: "",
        confirm_password: ""
    })
    
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const emailFromQuery = searchParams.get('email')
        if (emailFromQuery) {
            setFormData(prev => ({
                ...prev,
                email: emailFromQuery
            }))
        }
    }, [searchParams])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError("")
        if (success) setSuccess("")
    }

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const validatePasswords = () => {
        if (formData.new_password !== formData.confirm_password) {
            setError("Las contraseñas nuevas no coinciden")
            return false
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(formData.new_password)) {
            setError("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales")
            return false
        }
        
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        if (!validatePasswords()) {
            setIsLoading(false)
            return
        }

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
            
            const requestBody = {
                email: formData.email,
                temporary_password: formData.temporary_password,
                new_password: formData.new_password,
                confirm_password: formData.confirm_password
            }
            
            const response = await fetch(`${baseUrl}/auth/first-time-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(requestBody)
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess("Contraseña cambiada exitosamente. Redirigiendo al login...")
                
                setTimeout(() => {
                    router.push('/auth/login')
                }, 2000)
            } else {
                setError(data.message || 'Error al cambiar la contraseña')
            }
        } catch (err) {
            setError('Error de conexión. Por favor intenta de nuevo.')
            console.error('First time login error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-end mb-4">
                    <ThemeToggle />
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-fit mb-4">
                            <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                        </div>
                        <CardTitle className="text-2xl">Primer Inicio de Sesión</CardTitle>
                        <CardDescription>
                            Debes cambiar tu contraseña temporal por una nueva contraseña segura
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                        
                        {success && (
                            <div className="mb-4 p-3 text-sm text-green-800 bg-green-100 border border-green-200 rounded-md dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                                {success}
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
                                    className="focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="temporary_password">Contraseña Temporal</Label>
                                <div className="relative">
                                    <Input
                                        id="temporary_password"
                                        name="temporary_password"
                                        type={showPasswords.temporary ? "text" : "password"}
                                        placeholder="Contraseña temporal recibida"
                                        value={formData.temporary_password}
                                        onChange={handleInputChange}
                                        required
                                        className="focus:ring-teal-500 focus:border-teal-500 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => togglePasswordVisibility('temporary')}
                                    >
                                        {showPasswords.temporary ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Ingresa la contraseña temporal que recibiste por email
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="new_password">Nueva Contraseña</Label>
                                <div className="relative">
                                    <Input
                                        id="new_password"
                                        name="new_password"
                                        type={showPasswords.new ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.new_password}
                                        onChange={handleInputChange}
                                        required
                                        className="focus:ring-teal-500 focus:border-teal-500 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => togglePasswordVisibility('new')}
                                    >
                                        {showPasswords.new ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm_password">Confirmar Nueva Contraseña</Label>
                                <div className="relative">
                                    <Input
                                        id="confirm_password"
                                        name="confirm_password"
                                        type={showPasswords.confirm ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        required
                                        className="focus:ring-teal-500 focus:border-teal-500 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                    >
                                        {showPasswords.confirm ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                <p className="text-xs text-blue-800 dark:text-blue-300">
                                    <strong>Requisitos de contraseña:</strong>
                                    <br />• Mínimo 8 caracteres
                                    <br />• Al menos 1 letra mayúscula
                                    <br />• Al menos 1 letra minúscula
                                    <br />• Al menos 1 número
                                    <br />• Al menos 1 carácter especial (@$!%*?&)
                                </p>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full bg-teal-600 hover:bg-teal-700" 
                                disabled={isLoading || success !== ""}
                            >
                                {isLoading ? "Cambiando contraseña..." : "Cambiar Contraseña"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-gray-600 dark:text-gray-400">¿Ya cambiaste tu contraseña? </span>
                            <Link href="/auth/login" className="text-teal-600 hover:text-teal-700 font-medium">
                                Ir al login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
