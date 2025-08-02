import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tessera - Validación Segura de Certificados",
  description:
    "La plataforma líder para instituciones educativas, empresas y universidades que necesitan emitir y validar certificados de forma segura y confiable.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="tessera-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
