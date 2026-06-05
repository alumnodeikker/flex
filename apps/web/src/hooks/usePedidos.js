import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/useAuthStore'

export function usePedidos() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const usuario = useAuthStore((state) => state.usuario)

  useEffect(() => {
    if (!usuario) {
      setCargando(false)
      return
    }

    async function traerPedidos() {
      try {
        const { data, error: err } = await supabase
          .from('pedidos')
          .select(`
            *,
            items:pedido_items (
              id,
              producto_id,
              cantidad,
              precio_unitario,
              productos (nombre, imagen_url)
            )
          `)
          .eq('usuario_id', usuario.id)
          .order('creado_en', { ascending: false })

        if (err) throw err
        setPedidos(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    traerPedidos()
  }, [usuario])

  // Crear pedido
  const crearPedido = async (items, mesaId = null) => {
    try {
      if (!usuario) throw new Error('Usuario no autenticado')

      const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

      const { data: pedido, error: err } = await supabase
        .from('pedidos')
        .insert({
          usuario_id: usuario.id,
          mesa_id: mesaId,
          total,
          estado: 'pendiente',
        })
        .select()
        .single()

      if (err) throw err

      // Insertar items del pedido
      const itemsConPedidoId = items.map((item) => ({
        pedido_id: pedido.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
      }))

      const { error: errItems } = await supabase
        .from('pedido_items')
        .insert(itemsConPedidoId)

      if (errItems) throw errItems

      setPedidos((prev) => [pedido, ...prev])
      return pedido
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { pedidos, cargando, error, crearPedido }
}
