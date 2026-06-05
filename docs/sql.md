-- Habilitar extensiones
create extension if not exists "uuid-ossp";
create extension if not exists btree_gist;

-- ==================== TABLAS PRINCIPALES ====================

-- Tabla de perfiles (usuario extendido)
create table if not exists public.perfiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  nombre     text,
  rol        text not null default 'cliente'
             check (rol in ('cliente', 'staff', 'admin', 'portero')),
  avatar_url text,
  telefono   text,
  creado_en  timestamptz not null default now(),
  actualizado_en timestamptz default now()
);

-- Tabla de mesas
create table if not exists public.mesas (
  id serial primary key,
  numero integer not null unique,
  capacidad integer not null,
  ubicacion text,
  estado text not null default 'disponible' check (estado in ('disponible', 'ocupada', 'reservada')),
  creado_en timestamptz not null default now()
);

-- Tabla de productos
create table if not exists public.productos (
  id serial primary key,
  nombre text not null,
  descripcion text,
  categoria text not null check (categoria in ('Bebida', 'Comida', 'Postre')),
  precio numeric(10, 2) not null,
  imagen text,
  disponible boolean default true,
  creado_en timestamptz not null default now()
);

-- Tabla de pedidos
create table if not exists public.pedidos (
  id uuid primary key default uuid_generate_v4(),
  usuario_id uuid not null references public.perfiles(id) on delete cascade,
  mesa_id integer references public.mesas(id),
  total numeric(10, 2) not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmado', 'preparando', 'listo', 'entregado', 'cancelado')),
  notas text,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz default now()
);

-- Tabla de items del pedido
create table if not exists public.pedido_items (
  id uuid primary key default uuid_generate_v4(),
  pedido_id uuid not null references public.pedidos(id) on delete cascade,
  producto_id integer not null references public.productos(id),
  cantidad integer not null check (cantidad > 0),
  precio_unitario numeric(10, 2) not null,
  creado_en timestamptz not null default now()
);

-- Tabla de reservas
create table if not exists public.reservas (
  id uuid primary key default uuid_generate_v4(),
  usuario_id uuid not null references public.perfiles(id) on delete cascade,
  mesa_id integer not null references public.mesas(id),
  fecha_inicio timestamptz not null,
  fecha_fin timestamptz not null,
  numero_personas integer not null,
  estado text not null default 'confirmada' check (estado in ('confirmada', 'cancelada', 'completada')),
  notas text,
  creado_en timestamptz not null default now(),
  exclude using gist (mesa_id with =, tsrange(fecha_inicio, fecha_fin) with &&)
);

-- ==================== FUNCIONES ====================

-- Función para crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
  returns trigger
  language plpgsql
  security definer
  as $$
  begin
  insert into public.perfiles (id, nombre)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created  
  after insert                         
  on auth.users                        
  for each row                         
  execute procedure public.handle_new_user();

-- Función para actualizar timestamp
create or replace function public.actualizar_timestamp()
  returns trigger
  language plpgsql
  as $$
  begin
    new.actualizado_en = now();
    return new;
  end;
$$;

create trigger actualizar_timestamp_perfiles before update on public.perfiles
  for each row execute procedure public.actualizar_timestamp();

create trigger actualizar_timestamp_pedidos before update on public.pedidos
  for each row execute procedure public.actualizar_timestamp();

-- ==================== ROW LEVEL SECURITY (RLS) ====================

-- Habilitar RLS
alter table public.perfiles enable row level security;
alter table public.mesas enable row level security;
alter table public.productos enable row level security;
alter table public.pedidos enable row level security;
alter table public.pedido_items enable row level security;
alter table public.reservas enable row level security;

-- Perfiles: Cada usuario ve su perfil, admin ve todos
create policy "Usuarios ven su perfil" on public.perfiles
  for select using (auth.uid() = id or get_claim('role') = 'admin');

create policy "Usuarios actualizan su perfil" on public.perfiles
  for update using (auth.uid() = id);

-- Productos: Todos pueden ver
create policy "Productos públicos" on public.productos
  for select using (true);

-- Mesas: Staff y admin pueden ver/editar
create policy "Mesas visibles para staff" on public.mesas
  for select using (get_claim('role') in ('admin', 'staff', 'portero'));

-- Pedidos: Usuario ve sus pedidos, staff ve todos
create policy "Usuarios ven sus pedidos" on public.pedidos
  for select using (
    auth.uid() = usuario_id or 
    get_claim('role') in ('admin', 'staff')
  );

create policy "Usuarios crean sus pedidos" on public.pedidos
  for insert with check (auth.uid() = usuario_id);

create policy "Admin actualiza pedidos" on public.pedidos
  for update using (get_claim('role') in ('admin', 'staff'));

-- Pedido items: Vinculado a pedidos
create policy "Ver items de pedidos autorizados" on public.pedido_items
  for select using (
    exists (
      select 1 from public.pedidos
      where id = pedido_id and (
        auth.uid() = usuario_id or 
        get_claim('role') in ('admin', 'staff')
      )
    )
  );

-- Reservas: Usuario ve sus reservas
create policy "Usuarios ven sus reservas" on public.reservas
  for select using (
    auth.uid() = usuario_id or 
    get_claim('role') in ('admin', 'staff')
  );

create policy "Usuarios crean reservas" on public.reservas
  for insert with check (auth.uid() = usuario_id);

-- ==================== DATOS DE PRUEBA ====================

-- Insertar mesas
insert into public.mesas (numero, capacidad, ubicacion, estado) values
  (1, 2, 'Ventana', 'disponible'),
  (2, 4, 'Centro', 'disponible'),
  (3, 4, 'Esquina', 'disponible'),
  (4, 6, 'Terraza', 'disponible'),
  (5, 8, 'Sala principal', 'disponible')
on conflict do nothing;

-- Insertar productos
insert into public.productos (nombre, descripcion, categoria, precio, imagen, disponible) values
  ('Cerveza Artesana', 'Cerveza local', 'Bebida', 4.50, 'http://127.0.0.1:57321/storage/v1/object/public/productos/cerveza-artesana.jpg', true),
  ('Gin Tonic Premium', 'Gin premium con tónica', 'Bebida', 9.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/gintonic-premium.jpg', true),
  ('Agua mineral', 'Agua mineral', 'Bebida', 2.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/agua-mineral.jpg', true),
  ('Mojito', 'Bebida refrescante', 'Bebida', 8.50, 'http://127.0.0.1:57321/storage/v1/object/public/productos/mojito.jpg', true),
  ('Nachos con guacamole', 'Nachos crujientes', 'Comida', 7.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/nachos-guacamole.jpg', true),
  ('Tabla de quesos', 'Selección de quesos', 'Comida', 12.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/tablas-quesos.jpg', true),
  ('Alitas BBQ', 'Alitas a la BBQ', 'Comida', 9.50, 'http://127.0.0.1:57321/storage/v1/object/public/productos/alitas-bbq.jpg', true),
  ('Hamburguesa Flex', 'Hamburguesa especial', 'Comida', 11.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/burger-flex.jpg', true)
on conflict do nothing;


