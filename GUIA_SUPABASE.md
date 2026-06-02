# 📡 Guía de Conexión a Supabase - FLEX

## ✅ Lo que está configurado

### 1. **Cliente de Supabase** 
- Archivo: `src/lib/supabase.js`
- Conecta automáticamente con tus variables `.env.local`

### 2. **Store de Autenticación (Zustand)**
- Archivo: `src/store/useAuthStore.js`
- Métodos disponibles:
  - `iniciarSesion()` - Verifica sesión actual
  - `login(email, password)` - Inicia sesión
  - `registrar(email, password, nombre)` - Registra nuevo usuario
  - `logout()` - Cierra sesión
  - `actualizarPerfil(datos)` - Actualiza perfil del usuario

### 3. **Hooks para la BD**

#### `useProductos(categoria)`
- Trae productos de la BD
- Filtra por categoría si se especifica
- Uso: 
```js
const { productos, cargando, error } = useProductos('Comida')
```

#### `usePedidos()`
- Trae pedidos del usuario actual
- Método `crearPedido(items, mesaId)`
- Uso:
```js
const { pedidos, crearPedido } = usePedidos()
await crearPedido([{id:1, cantidad:2, precio:7}], 1)
```

---

## 🚀 Pasos para conectar completamente

### Paso 1: Aplicar las migraciones SQL en Supabase

1. Ve a tu dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor** > **New Query**
4. Copia TODO el contenido de: `supabase/migrations/20260602_completo.sql`
5. Pega y ejecuta (botón ▶)

**Esto crea:**
- Tablas: `perfiles`, `mesas`, `productos`, `pedidos`, `pedido_items`, `reservas`
- Funciones automáticas para perfiles
- Row Level Security (RLS) para seguridad
- Datos de prueba (mesas y productos)

### Paso 2: Verificar que Supabase está corriendo

En la raíz del proyecto:
```bash
npx supabase start
```

Debería decirte algo como:
```
Local URL: http://127.0.0.1:54321
anon key: eyJ...
service_role key: eyJ...
```

### Paso 3: Usar en tus páginas

#### Ejemplo: Página de login actualizada

```jsx
'use client'
import { useAuthStore } from '@/store/useAuthStore'

export default function MiLogin() {
  const login = useAuthStore(s => s.login)
  const usuario = useAuthStore(s => s.usuario)
  
  const manejar = async () => {
    try {
      await login('user@example.com', 'password')
      console.log('Logueado:', usuario)
    } catch (err) {
      console.error(err)
    }
  }
  
  return <button onClick={manejar}>Login</button>
}
```

#### Ejemplo: Traer productos de la BD

```jsx
'use client'
import { useProductos } from '@/hooks/useProductos'

export default function Menu() {
  const { productos, cargando } = useProductos('Comida')
  
  if (cargando) return <p>Cargando...</p>
  
  return (
    <ul>
      {productos.map(p => (
        <li key={p.id}>{p.nombre} - €{p.precio}</li>
      ))}
    </ul>
  )
}
```

#### Ejemplo: Crear un pedido

```jsx
'use client'
import { usePedidos } from '@/hooks/usePedidos'
import { useAuthStore } from '@/store/useAuthStore'

export default function Checkout() {
  const usuario = useAuthStore(s => s.usuario)
  const { crearPedido } = usePedidos()
  
  const pedir = async () => {
    if (!usuario) return alert('Login primero')
    
    const items = [
      { id: 1, cantidad: 2, precio: 7.00 },
      { id: 5, cantidad: 1, precio: 12.00 }
    ]
    
    try {
      const pedido = await crearPedido(items, 1) // Mesa 1
      console.log('Pedido creado:', pedido)
    } catch (err) {
      console.error(err)
    }
  }
  
  return <button onClick={pedir}>Confirmar Pedido</button>
}
```

---

## 📊 Estructura de Tablas

### `usuarios` (perfiles)
```
id          (uuid)        - ID del usuario
nombre      (text)        - Nombre
rol         (text)        - cliente/staff/admin/portero
avatar_url  (text)        - URL de imagen
creado_en   (timestamptz) - Fecha de creación
```

### `productos`
```
id           (serial)      - ID
nombre       (text)        - Nombre
categoria    (text)        - Bebida/Comida/Postre
precio       (numeric)     - Precio en €
imagen       (text)        - URL de imagen
disponible   (boolean)     - ¿Disponible?
```

### `pedidos`
```
id           (uuid)        - ID único
usuario_id   (uuid)        - Quién hizo el pedido
mesa_id      (int)         - En qué mesa
total        (numeric)     - Total a pagar
estado       (text)        - pendiente/confirmado/preparando/listo/entregado
```

### `pedido_items`
```
id               (uuid)    - ID único
pedido_id        (uuid)    - Referencia al pedido
producto_id      (int)     - Qué producto
cantidad         (int)     - Cuántos
precio_unitario  (numeric) - Precio en ese momento
```

---

## 🔐 Seguridad (RLS)

Cada usuario **solo ve sus datos**:
- Los clientes ven **solo sus pedidos**
- El staff ve **todos los pedidos**
- Admin ve **todo**

Esto se maneja automáticamente. No necesitas hacer nada.

---

## 🔄 Actualizar datos en tiempo real (próximamente)

Si quieres que los datos se actualicen automáticamente cuando cambien en la BD:

```js
// En un hook
useEffect(() => {
  const subscription = supabase
    .from('pedidos')
    .on('*', payload => {
      console.log('Cambio detectado:', payload)
    })
    .subscribe()
  
  return () => subscription.unsubscribe()
}, [])
```

---

## ❓ Troubleshooting

**Problema: "Missing Supabase environment variables"**
- Solución: Asegúrate de que `.env.local` está en `/apps/web/` con:
  ```
  NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:57321
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  ```

**Problema: "CORS error"**
- Solución: Usa el cliente de Supabase, no fetch directo

**Problema: Los pedidos no se guardan**
- Solución: Verifica que las migraciones se ejecutaron correctamente en Supabase

---

## 📝 Próximas tareas

1. ✅ Cliente Supabase configurado
2. ✅ Auth (login/registro) funcionando
3. ✅ Productos desde BD
4. ✅ Crear pedidos
5. ⏳ Actualizar estado de pedidos (staff)
6. ⏳ Reservas de mesas
7. ⏳ Pagos con Stripe
8. ⏳ Suscripciones VIP

---

## 🎯 Resumen rápido

```js
// 1. Iniciar sesión
import { useAuthStore } from '@/store/useAuthStore'
const login = useAuthStore(s => s.login)
await login('user@email.com', 'password')

// 2. Traer datos
import { useProductos } from '@/hooks/useProductos'
import { usePedidos } from '@/hooks/usePedidos'
const { productos } = useProductos()
const { pedidos, crearPedido } = usePedidos()

// 3. Crear pedido
await crearPedido([{id: 1, cantidad: 2, precio: 7}], mesaId)

// 4. Cerrar sesión
const logout = useAuthStore(s => s.logout)
await logout()
```

¡Listo! Tu app está conectada a Supabase. 🚀
