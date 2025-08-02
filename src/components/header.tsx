"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, Shield } from "lucide-react"

import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-tessera-blue-500 to-tessera-cyan-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-tessera-blue-600 to-tessera-cyan-600 bg-clip-text text-transparent">
                Tessera
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Características
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              Cómo Funciona
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Precios
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">Iniciar Sesións</Button>
            </Link>
            <Button className="bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 hover:from-tessera-blue-600 hover:to-tessera-cyan-600">
              Comenzar Gratis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a
                href="#features"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
              >
                Características
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
              >
                Cómo Funciona
              </a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors">
                Precios
              </a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors">
                Contacto
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-4">

                <Link href="/auth/login">
                  <Button variant="outline" className="w-full bg-transparent">Iniciar Sesións</Button>
                </Link>
                <Button className="w-full bg-gradient-to-r from-tessera-blue-500 to-tessera-cyan-500 hover:from-tessera-blue-600 hover:to-tessera-cyan-600">
                  Comenzar Gratis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
