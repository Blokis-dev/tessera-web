import { Shield, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-tessera-blue-600 to-tessera-cyan-600 bg-clip-text text-transparent">
                Tessera
              </span>
            </div>
            <p className="text-muted-foreground">
              La plataforma líder para la validación segura de certificados institucionales.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Producto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Integraciones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Prensa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:hola@tessera.com" className="hover:text-foreground transition-colors">
                  hola@tessera.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 Tessera. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
