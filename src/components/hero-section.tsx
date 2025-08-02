import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <Shield className="mr-2 h-4 w-4 text-tessera-blue-500" />
                Validación de Certificados Confiable
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Valida certificados con{" "}
                <span className="bg-gradient-to-r from-tessera-blue-600 to-tessera-cyan-600 bg-clip-text text-transparent">
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
                className="bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 hover:from-tessera-blue-600 hover:to-tessera-cyan-600 text-white"
              >
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
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
            <div className="relative z-10 rounded-2xl bg-gradient-to-br from-tessera-blue-500/10 to-tessera-cyan-500/10 p-8 backdrop-blur-sm border">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500 flex items-center justify-center">
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
                  <div className="p-4 bg-background rounded-lg border">
                    <p className="text-2xl font-bold text-tessera-blue-600">99.9%</p>
                    <p className="text-sm text-muted-foreground">Precisión</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <p className="text-2xl font-bold text-tessera-cyan-600">{"<1s"}</p>
                    <p className="text-sm text-muted-foreground">Validación</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-tessera-blue-500/20 to-tessera-cyan-500/20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br from-tessera-cyan-500/20 to-tessera-blue-500/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
