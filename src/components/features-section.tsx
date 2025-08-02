import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, Globe, Lock, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Validación Segura",
    description: "Tecnología blockchain para garantizar la autenticidad e inmutabilidad de cada certificado emitido.",
  },
  {
    icon: Zap,
    title: "Procesamiento Rápido",
    description: "Validación instantánea de certificados en menos de 1 segundo con nuestra infraestructura optimizada.",
  },
  {
    icon: Users,
    title: "Multi-Institucional",
    description: "Perfecto para universidades, institutos, empresas y cualquier organización que emita certificados.",
  },
  {
    icon: Globe,
    title: "Acceso Global",
    description: "Plataforma accesible desde cualquier lugar del mundo con soporte para múltiples idiomas.",
  },
  {
    icon: Lock,
    title: "Máxima Seguridad",
    description: "Encriptación de extremo a extremo y cumplimiento con estándares internacionales de seguridad.",
  },
  {
    icon: BarChart3,
    title: "Analytics Avanzados",
    description: "Dashboard completo con métricas detalladas sobre la emisión y validación de certificados.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            ¿Por qué elegir{" "}
            <span className="bg-gradient-to-r from-tessera-blue-600 to-tessera-cyan-600 bg-clip-text text-transparent">
              Tessera?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos la solución más completa y confiable para la validación de certificados, diseñada específicamente
            para instituciones que valoran la seguridad y la eficiencia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
