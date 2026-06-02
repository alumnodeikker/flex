import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

// Añadimos (set, get) para poder acceder al estado interno de la tienda
export const useAuthStore = create((set, get) => ({
  usuario: null,
  cargando: true,
  error: null,

  // Inicializar sesión
  iniciarSesion: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      
      if (session?.user) {
        const { data: perfil } = await supabase
          .from('perfiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        set({ usuario: { ...session.user, perfil }, cargando: false })
      } else {
        set({ usuario: null, cargando: false })
      }
    } catch (error) {
      set({ error: error.message, cargando: false })
    }
  },

  // Registrarse
  registrar: async (email, password, nombre) => {
    try {
      set({ cargando: true, error: null })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: nombre },
        },
      })
      if (error) throw error
      
      // NOTA: Si Supabase tiene el "Email Confirmation" activo, 
      // data.user existirá pero data.session será null hasta que confirmen el correo.
      set({ usuario: data.user, cargando: false })
      return data
    } catch (error) {
      set({ error: error.message, cargando: false })
      throw error
    }
  },

  // Login
  login: async (email, password) => {
    try {
      set({ cargando: true, error: null })
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      
      const { data: perfil } = await supabase
        .from('perfiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      set({ usuario: { ...data.user, perfil }, cargando: false })
      return data
    } catch (error) {
      set({ error: error.message, cargando: false })
      throw error
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ cargando: true })
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ usuario: null, cargando: false })
    } catch (error) {
      set({ error: error.message, cargando: false })
    }
  },

  // Actualizar perfil (CORREGIDO USANDO get())
  actualizarPerfil: async (actualizaciones) => {
    try {
      const usuarioActual = get().usuario // <-- Forma correcta de leer el usuario en Zustand
      if (!usuarioActual) throw new Error('No hay usuario autenticado')
      
      const { data, error } = await supabase
        .from('perfiles')
        .update(actualizaciones)
        .eq('id', usuarioActual.id)
        .select()
        .single()
      
      if (error) throw error
      
      set((state) => ({
        usuario: { ...state.usuario, perfil: data },
      }))
      return data
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },
}))
