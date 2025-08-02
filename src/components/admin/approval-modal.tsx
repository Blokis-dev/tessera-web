"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

interface ApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  action: "aprobar" | "rechazar" | null
  institutionName: string
  onConfirm: (comments: string) => void
}

export function ApprovalModal({ isOpen, onClose, action, institutionName, onConfirm }: ApprovalModalProps) {
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular API call
    onConfirm(comments)
    setComments("")
    setIsSubmitting(false)
    onClose()
  }

  const isApproval = action === "aprobar"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isApproval ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            {isApproval ? "Aprobar" : "Rechazar"} Solicitud
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas {isApproval ? "aprobar" : "rechazar"} la solicitud de{" "}
            <span className="font-medium">{institutionName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="comments">Comentarios (Opcional)</Label>
            <Textarea
              id="comments"
              placeholder={`Agrega comentarios sobre la ${isApproval ? "aprobación" : "rechazo"} de esta solicitud...`}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={
              isApproval ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
            }
          >
            {isSubmitting ? "Procesando..." : isApproval ? "Aprobar" : "Rechazar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
