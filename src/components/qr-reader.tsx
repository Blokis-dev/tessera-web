"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Upload, X } from "lucide-react"

interface QRReaderProps {
  isOpen: boolean
  onClose: () => void
  onScan: (result: string) => void
}

export function QRReader({ isOpen, onClose, onScan }: QRReaderProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = async () => {
    try {
      setError(null)
      setIsScanning(true)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch {
      setError("No se pudo acceder a la cámara. Verifica los permisos.")
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simular lectura de QR desde imagen
      // En una implementación real, usarías una librería como jsQR
      setTimeout(() => {
        const mockToken = "TSR-" + Math.random().toString(36).substr(2, 9).toUpperCase()
        onScan(mockToken)
        onClose()
      }, 1000)
    }
  }

  const simulateQRScan = () => {
    // Simular escaneo exitoso
    const mockToken = "TSR-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    onScan(mockToken)
    stopCamera()
    onClose()
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Escanear Código QR
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!isScanning ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Elige cómo quieres escanear el código QR</p>
              </div>

              <div className="grid gap-3">
                <Button onClick={startCamera} className="w-full bg-transparent" variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Usar Cámara
                </Button>

                <Button onClick={() => fileInputRef.current?.click()} className="w-full" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Imagen
                </Button>

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                <div className="absolute inset-0 border-2 border-tessera-blue-500 rounded-lg">
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-tessera-blue-500"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-tessera-blue-500"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-tessera-blue-500"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-tessera-blue-500"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Apunta la cámara hacia el código QR del certificado
                </p>
                <div className="flex gap-2">
                  <Button onClick={simulateQRScan} className="flex-1">
                    Simular Escaneo
                  </Button>
                  <Button onClick={stopCamera} variant="outline">
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
