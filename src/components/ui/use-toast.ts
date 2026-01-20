// Simplified toast hook for immediate fix
import { useState, useEffect } from "react"

export const useToast = () => {
  const [toasts, setToasts] = useState<any[]>([])

  const toast = ({ title, description, duration = 3000 }: any) => {
    const id = Math.random().toString(36).substring(7)
    const newToast = { id, title, description }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }

  return { toast, toasts }
}
