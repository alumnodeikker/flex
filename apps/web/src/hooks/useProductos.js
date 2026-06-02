import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useProductos(categoria = null) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function traerProductos() {
      try {
        let query = supabase.from('productos').select('*')
        
        if (categoria && categoria !== 'Todo') {
          query = query.eq('categoria', categoria)
        }
        
        const { data, error: err } = await query
        if (err) throw err
        setProductos(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    traerProductos()
  }, [categoria])

  return { productos, cargando, error }
}
