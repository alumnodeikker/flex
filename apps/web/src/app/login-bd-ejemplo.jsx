'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export default function PaginaLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [esRegistro, setEsRegistro] = useState(false)
  const [cargando, setCargando] = useState(false)

  const login = useAuthStore((state) => state.login)
  const registrar = useAuthStore((state) => state.registrar)

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setCargando(true)
    try {
      if (esRegistro) {
        await registrar(email, password, nombre)
        alert('Registro exitoso!')
      } else {
        await login(email, password)
        alert('Login exitoso!')
      }
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form onSubmit={manejarEnvio} className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6">
          {esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
        </h1>

        {esRegistro && (
          <div className="mb-4">
            <label className="block text-white mb-2">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {cargando ? 'Cargando...' : esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
        </button>

        <button
          type="button"
          onClick={() => {
            setEsRegistro(!esRegistro)
            setNombre('')
            setEmail('')
            setPassword('')
          }}
          className="w-full mt-4 text-gray-400 hover:text-white"
        >
          {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </form>
    </div>
  )
}
