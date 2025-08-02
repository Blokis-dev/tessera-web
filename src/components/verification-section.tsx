"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, QrCode, CheckCircle, ArrowRight } from "lucide-react"

export function VerificationSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-tessera-blue-50 to-tessera-cyan-50 dark:from-tessera-blue-950/20 dark:to-tessera-cyan-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-background">
                <Shield className="mr-2 h-4 w-4 text-tessera-blue-500" />
                Verificación Instantánea
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-tessera-blue-600 to-tessera-cyan-600 bg-clip-text text-transparent">
                  Verificar
                </span>{" "}
                Certificado
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Valida la autenticidad de cualquier certificado emitido con Tessera en segundos. Simplemente ingresa el
                token o escanea el código QR.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 hover:from-tessera-blue-600 hover:to-tessera-cyan-600 text-white"
                onClick={() => (window.location.href = "/verificar")}
              >
                Verificar Certificado
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Verificación instantánea</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Sin registro requerido</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="relative z-10 bg-background/80 backdrop-blur-sm border shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500 flex items-center justify-center mb-4">
                      <QrCode className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Verificación Rápida</h3>
                    <p className="text-sm text-muted-foreground">
                      Escanea el código QR o ingresa el token del certificado
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Certificado Válido</p>
                            <p className="text-xs text-muted-foreground">Verificado exitosamente</p>
                          </div>
                        </div>
                        <Shield className="h-5 w-5 text-tessera-blue-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="text-center p-3 border rounded">
                        <p className="font-bold text-tessera-blue-600">{"<1s"}</p>
                        <p className="text-muted-foreground">Tiempo de verificación</p>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <p className="font-bold text-tessera-cyan-600">99.9%</p>
                        <p className="text-muted-foreground">Precisión</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-tessera-blue-500/20 to-tessera-cyan-500/20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br from-tessera-cyan-500/20 to-tessera-blue-500/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
