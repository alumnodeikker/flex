'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export default function LayoutRaiz({ children }) {
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion)

  useEffect(() => {
    iniciarSesion()
  }, [iniciarSesion])

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
