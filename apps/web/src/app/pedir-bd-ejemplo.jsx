'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useProductos } from '@/hooks/useProductos'
import { usePedidos } from '@/hooks/usePedidos'

const CATEGORIAS = ['Todo', 'Bebida', 'Comida']

export default function PaginaPedirConBD() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todo')
  const [carrito, setCarrito] = useState([])
  const [enviando, setEnviando] = useState(false)

  // Hooks de BD
  const usuario = useAuthStore((state) => state.usuario)
  const { productos, cargando } = useProductos(categoriaSeleccionada)
  const { crearPedido } = usePedidos()

  // Filtrar productos por categoría
  const productosFiltrados = categoriaSeleccionada === 'Todo' 
    ? productos 
    : productos.filter((p) => p.categoria === categoriaSeleccionada)

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.id === producto.id)
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const quitarDelCarrito = (productoId) => {
    setCarrito((prev) => {
      const item = prev.find((i) => i.id === productoId)
      if (item.cantidad === 1) {
        return prev.filter((i) => i.id !== productoId)
      }
      return prev.map((i) =>
        i.id === productoId ? { ...i, cantidad: i.cantidad - 1 } : i
      )
    })
  }

  const enviarPedido = async () => {
    if (!usuario) {
      alert('Debes iniciar sesión')
      return
    }
    if (carrito.length === 0) {
      alert('Carrito vacío')
      return
    }

    try {
      setEnviando(true)
      await crearPedido(carrito)
      setCarrito([])
      alert('Pedido creado exitosamente')
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setEnviando(false)
    }
  }

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

  if (cargando) return <div className="p-4">Cargando productos...</div>

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pedir una mesa</h1>

      {/* Categorías */}
      <div className="flex gap-2 mb-6">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-4 py-2 rounded ${
              categoriaSeleccionada === cat
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="bg-gray-800 rounded-lg overflow-hidden">
            {producto.imagen && (
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg">{producto.nombre}</h3>
              <p className="text-yellow-500 text-xl font-bold mb-2">€{producto.precio.toFixed(2)}</p>
              <button
                onClick={() => agregarAlCarrito(producto)}
                className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-600"
              >
                Añadir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carrito */}
      {carrito.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Carrito ({carrito.length})</h2>
          {carrito.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b">
              <div>
                <p className="font-bold">{item.nombre}</p>
                <p className="text-gray-400">€{item.precio.toFixed(2)} x {item.cantidad}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => quitarDelCarrito(item.id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="px-2 py-1 bg-gray-700 rounded">{item.cantidad}</span>
                <button
                  onClick={() => agregarAlCarrito(item)}
                  className="bg-green-600 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold mb-4 text-yellow-500">
            Total: €{total.toFixed(2)}
          </div>
          <button
            onClick={enviarPedido}
            disabled={enviando}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            {enviando ? 'Enviando...' : 'Confirmar Pedido'}
          </button>
        </div>
      )}
    </div>
  )
}
