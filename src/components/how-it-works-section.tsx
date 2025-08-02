import { Card, CardContent } from "@/components/ui/card"
import { Upload, Shield, CheckCircle, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "1. Sube tu Certificado",
    description: "Carga el certificado que deseas validar en nuestra plataforma segura.",
  },
  {
    icon: Shield,
    title: "2. Procesamiento Seguro",
    description: "Nuestro sistema analiza y verifica la autenticidad usando tecnología blockchain.",
  },
  {
    icon: CheckCircle,
    title: "3. Validación Instantánea",
    description: "Recibe la confirmación de validez en menos de 1 segundo.",
  },
  {
    icon: Download,
    title: "4. Descarga Certificado",
    description: "Obtén tu certificado validado con sello digital de autenticidad.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Cómo funciona{" "}
            <span className="bg-gradient-to-r from-tessera-blue-600 to-tessera-cyan-600 bg-clip-text text-transparent">
              Tessera
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un proceso simple y seguro en 4 pasos para validar cualquier certificado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center p-6 h-full border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
