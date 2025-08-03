"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, QrCode, CheckCircle, ArrowRight } from "lucide-react"

export function VerificationSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-background dark:via-background dark:to-muted/20">
      {/* Animated floating circles background - restringidos verticalmente */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circles - ajustados para mantenerse dentro del rango vertical */}
        <div
          className="absolute top-10 -left-20 w-96 h-96 rounded-full opacity-20 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 60%)",
            animation: "floatConstrained 22s ease-in-out infinite"
          }}
        ></div>
        <div
          className="absolute top-1/4 -right-32 w-80 h-80 rounded-full opacity-25 dark:opacity-20"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 65%)",
            animation: "floatConstrained 28s ease-in-out infinite reverse"
          }}
        ></div>
        <div
          className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full opacity-18 dark:opacity-12"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 55%)",
            animation: "floatConstrained 32s ease-in-out infinite"
          }}
        ></div>

        {/* Medium circles - posicionados dentro del contenedor */}
        <div
          className="absolute top-20 left-1/4 w-48 h-48 rounded-full opacity-22 dark:opacity-18"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 60%)",
            animation: "floatConstrained 20s ease-in-out infinite reverse"
          }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-56 h-56 rounded-full opacity-20 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 65%)",
            animation: "floatConstrained 25s ease-in-out infinite"
          }}
        ></div>

        {/* Small circles - todos dentro del rango vertical */}
        <div
          className="absolute top-1/3 left-1/2 w-32 h-32 rounded-full opacity-28 dark:opacity-22"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 50%)",
            animation: "floatConstrained 18s ease-in-out infinite reverse"
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-16 w-24 h-24 rounded-full opacity-35 dark:opacity-25"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 40%)",
            animation: "floatConstrained 15s ease-in-out infinite"
          }}
        ></div>

        {/* Additional circles for density */}
        <div
          className="absolute top-2/3 right-16 w-40 h-40 rounded-full opacity-25 dark:opacity-18"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 55%)",
            animation: "floatConstrained 26s ease-in-out infinite reverse"
          }}
        ></div>
        <div
          className="absolute top-1/6 right-1/2 w-28 h-28 rounded-full opacity-30 dark:opacity-22"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 45%)",
            animation: "floatConstrained 19s ease-in-out infinite"
          }}
        ></div>
      </div>

      {/* Adaptive overlay */}
      <div className="absolute inset-0 bg-slate-900/5 dark:bg-background/15 backdrop-blur-[0.3px]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div 
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm"
                style={{ 
                  borderColor: "var(--primary)", 
                  color: "var(--primary)",
                  background: "var(--background)/80"
                }}
              >
                <Shield className="mr-2 h-4 w-4" style={{ color: "var(--primary)" }} />
                Verificación Instantánea
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    background: "linear-gradient(90deg, var(--primary), var(--accent))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text"
                  }}
                >
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
                style={{
                  background: "linear-gradient(90deg, var(--primary), var(--accent))",
                  color: "var(--primary-foreground)"
                }}
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
            <Card className="relative z-10 bg-background/90 backdrop-blur-sm border shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div 
                      className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background: "linear-gradient(135deg, var(--primary), var(--accent))"
                      }}
                    >
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
                        <Shield className="h-5 w-5" style={{ color: "var(--primary)" }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="text-center p-3 border rounded">
                        <p 
                          className="font-bold"
                          style={{ color: "var(--primary)" }}
                        >
                          {"<1s"}
                        </p>
                        <p className="text-muted-foreground">Tiempo de verificación</p>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <p 
                          className="font-bold"
                          style={{ color: "var(--accent)" }}
                        >
                          99.9%
                        </p>
                        <p className="text-muted-foreground">Precisión</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced decorative elements */}
            <div
              className="absolute -top-4 -right-4 h-24 w-24 rounded-full blur-xl opacity-40 dark:opacity-60"
              style={{
                background: "linear-gradient(135deg, var(--primary)/30, var(--accent)/30)",
                animation: "floatConstrained 10s ease-in-out infinite"
              }}
            ></div>
            <div
              className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full blur-xl opacity-35 dark:opacity-50"
              style={{
                background: "linear-gradient(135deg, var(--accent)/30, var(--primary)/30)",
                animation: "floatConstrained 14s ease-in-out infinite reverse"
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Animación CSS restringida verticalmente */}
      <style jsx>{`
        @keyframes floatConstrained {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-15px) translateX(12px) scale(1.05);
          }
          50% {
            transform: translateY(-8px) translateX(-15px) scale(0.95);
          }
          75% {
            transform: translateY(-20px) translateX(6px) scale(1.02);
          }
        }
      `}</style>
    </section>
  )
}
