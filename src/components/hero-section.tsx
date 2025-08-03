"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, CheckCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const [btnGradient, setBtnGradient] = useState("linear-gradient(90deg, var(--primary), var(--accent))")

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-background dark:via-background dark:to-muted/20">
      {/* Animated floating circles background - restringidos verticalmente */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circles - ajustados para mantenerse dentro del rango vertical */}
        <div
          className="absolute top-10 -left-20 w-96 h-96 rounded-full opacity-35 dark:opacity-25"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 50%)",
            animation: "floatConstrained 20s ease-in-out infinite"
          }}
        ></div>
        <div
          className="absolute top-1/4 -right-32 w-80 h-80 rounded-full opacity-40 dark:opacity-30"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 55%)",
            animation: "floatConstrained 25s ease-in-out infinite reverse"
          }}
        ></div>
        <div
          className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full opacity-30 dark:opacity-20"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 45%)",
            animation: "floatConstrained 30s ease-in-out infinite"
          }}
        ></div>

        {/* Medium circles - posicionados dentro del contenedor */}
        <div
          className="absolute top-20 left-1/4 w-48 h-48 rounded-full opacity-38 dark:opacity-28"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 50%)",
            animation: "floatConstrained 18s ease-in-out infinite reverse"
          }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-56 h-56 rounded-full opacity-35 dark:opacity-25"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 55%)",
            animation: "floatConstrained 22s ease-in-out infinite"
          }}
        ></div>

        {/* Small circles - todos dentro del rango vertical */}
        <div
          className="absolute top-1/3 left-1/2 w-32 h-32 rounded-full opacity-45 dark:opacity-35"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 45%)",
            animation: "floatConstrained 15s ease-in-out infinite reverse"
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-16 w-24 h-24 rounded-full opacity-50 dark:opacity-40"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 35%)",
            animation: "floatConstrained 12s ease-in-out infinite"
          }}
        ></div>
        <div
          className="absolute top-2/3 right-16 w-40 h-40 rounded-full opacity-42 dark:opacity-32"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 50%)",
            animation: "floatConstrained 28s ease-in-out infinite reverse"
          }}
        ></div>

        {/* Mini circles - posicionados seguros */}
        <div
          className="absolute top-1/2 left-3/4 w-16 h-16 rounded-full opacity-55 dark:opacity-45"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 25%)",
            animation: "floatConstrained 10s ease-in-out infinite"
          }}
        ></div>
        <div
          className="absolute bottom-1/2 right-1/3 w-20 h-20 rounded-full opacity-48 dark:opacity-38"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 35%)",
            animation: "floatConstrained 14s ease-in-out infinite reverse"
          }}
        ></div>

        {/* Extra circles - seguros verticalmente */}
        <div
          className="absolute top-1/6 right-1/2 w-28 h-28 rounded-full opacity-52 dark:opacity-42"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 40%)",
            animation: "floatConstrained 16s ease-in-out infinite"
          }}
        ></div>
        <div
          className="absolute bottom-1/6 left-1/2 w-36 h-36 rounded-full opacity-35 dark:opacity-25"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 50%)",
            animation: "floatConstrained 24s ease-in-out infinite reverse"
          }}
        ></div>
      </div>

      {/* Adaptive overlay */}
      <div className="absolute inset-0 bg-slate-900/8 dark:bg-background/20 backdrop-blur-[0.3px]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
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
                Validación de Certificados Confiable
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Valida certificados con{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    background: "linear-gradient(90deg, var(--primary), var(--accent))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text"
                  }}
                >
                  Tessera
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                La plataforma líder para instituciones educativas, empresas y universidades que necesitan emitir y
                validar certificados de forma segura y confiable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                style={{
                  background: btnGradient,
                  color: "var(--primary-foreground)"
                }}
                onMouseEnter={() => setBtnGradient("linear-gradient(90deg, oklch(0.85 0.18 140), oklch(0.75 0.15 160))")}
                onMouseLeave={() => setBtnGradient("linear-gradient(90deg, var(--primary), var(--accent))")}
              >
                <Link href="/auth/register">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                  background: "var(--background)/80"
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                50 tokens gratis
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Sin tarjeta de crédito
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Configuración en minutos
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative z-10 rounded-2xl p-8 backdrop-blur-sm border"
              style={{
                background: "linear-gradient(135deg, var(--primary)/10, var(--accent)/10)"
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-background/90 backdrop-blur-sm rounded-lg border shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, var(--primary), var(--accent))"
                      }}
                    >
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Certificado Validado</p>
                      <p className="text-sm text-muted-foreground">Universidad XYZ</p>
                    </div>
                  </div>
                  <div className="text-green-500">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/90 backdrop-blur-sm rounded-lg border">
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      99.9%
                    </p>
                    <p className="text-sm text-muted-foreground">Precisión</p>
                  </div>
                  <div className="p-4 bg-background/90 backdrop-blur-sm rounded-lg border">
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {"<1s"}
                    </p>
                    <p className="text-sm text-muted-foreground">Validación</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced decorative elements */}
            <div
              className="absolute -top-4 -right-4 h-24 w-24 rounded-full blur-xl opacity-60 dark:opacity-80"
              style={{
                background: "linear-gradient(135deg, var(--primary)/40, var(--accent)/40)",
                animation: "floatConstrained 8s ease-in-out infinite"
              }}
            ></div>
            <div
              className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full blur-xl opacity-50 dark:opacity-70"
              style={{
                background: "linear-gradient(135deg, var(--accent)/40, var(--primary)/40)",
                animation: "floatConstrained 12s ease-in-out infinite reverse"
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
            transform: translateY(-15px) translateX(15px) scale(1.05);
          }
          50% {
            transform: translateY(-8px) translateX(-20px) scale(0.95);
          }
          75% {
            transform: translateY(-20px) translateX(8px) scale(1.02);
          }
        }
      `}</style>
    </section>
  )
}
