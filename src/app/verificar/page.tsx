"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QRReader } from "@/components/qr-reader"
import { VerificationModal } from "@/components/verification-modal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QrCode, Shield, Search, ArrowLeft } from "lucide-react"



export default function VerificarPage() {
  const [token, setToken] = useState("")
  const [qrReaderOpen, setQrReaderOpen] = useState(false)
  const [verificationModalOpen, setVerificationModalOpen] = useState(false)
  const [verificationToken, setVerificationToken] = useState("")

  const handleVerify = () => {
    if (token.trim()) {
      setVerificationToken(token.trim())
      setVerificationModalOpen(true)
    }
  }

  const handleQRScan = (scannedToken: string) => {
    setToken(scannedToken)
    setVerificationToken(scannedToken)
    setVerificationModalOpen(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            style={{
              borderColor: "var(--primary)",
              color: "var(--primary)"
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div 
            className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--accent))"
            }}
          >
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
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
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Valida la autenticidad de cualquier certificado emitido con Tessera. Ingresa el token de verificación o
            escanea el código QR del certificado.
          </p>
        </div>

        {/* Main verification card */}
        <div className="max-w-2xl mx-auto">
          <Card 
            className="shadow-xl border-0"
            style={{
              background: "linear-gradient(135deg, var(--background), var(--muted)/20)"
            }}
          >
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Verificación de Certificado</CardTitle>
              <CardDescription>
                Introduce el token de verificación o usa el lector QR para validar el certificado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token input */}
              <div className="space-y-2">
                <Label htmlFor="token" className="text-base font-medium">
                  Token de Verificación
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="token"
                      placeholder="Ej: TSR-ABC123XYZ"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10 h-12 text-base"
                      style={{
                        borderColor: "var(--primary)"
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 bg-transparent"
                    onClick={() => setQrReaderOpen(true)}
                    style={{
                      borderColor: "var(--primary)",
                      color: "var(--primary)"
                    }}
                  >
                    <QrCode className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  El token se encuentra en el certificado o código QR proporcionado por la institución
                </p>
              </div>

              {/* Verify button */}
              <Button
                onClick={handleVerify}
                disabled={!token.trim()}
                className="w-full h-12 text-base"
                style={{
                  background: "linear-gradient(90deg, var(--primary), var(--accent))",
                  color: "var(--primary-foreground)"
                }}
              >
                <Shield className="mr-2 h-5 w-5" />
                Verificar Certificado
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">O</span>
                </div>
              </div>

              {/* QR Scanner button */}
              <Button
                variant="outline"
                onClick={() => setQrReaderOpen(true)}
                className="w-full h-12 text-base bg-transparent"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)"
                }}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Escanear Código QR
              </Button>
            </CardContent>
          </Card>

          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <Shield 
                  className="mx-auto h-8 w-8 mb-2" 
                  style={{ color: "var(--primary)" }}
                />
                <h3 className="font-semibold mb-1">100% Seguro</h3>
                <p className="text-sm text-muted-foreground">Verificación basada en blockchain</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <QrCode 
                  className="mx-auto h-8 w-8 mb-2" 
                  style={{ color: "var(--accent)" }}
                />
                <h3 className="font-semibold mb-1">Fácil de Usar</h3>
                <p className="text-sm text-muted-foreground">Escanea QR o ingresa el token</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <Search 
                  className="mx-auto h-8 w-8 mb-2" 
                  style={{ color: "var(--primary)" }}
                />
                <h3 className="font-semibold mb-1">Instantáneo</h3>
                <p className="text-sm text-muted-foreground">Resultados en menos de 1 segundo</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <QRReader isOpen={qrReaderOpen} onClose={() => setQrReaderOpen(false)} onScan={handleQRScan} />

      <VerificationModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        token={verificationToken}
      />
    </div>
  )
}
