-- ── Productos Viejos (Corregidos con Mayúsculas y Puerto 57321) ──
insert into public.productos (nombre, descripcion, precio, categoria, disponible, imagen_url) values
  ('Agua mineral 50cl',    'Agua sin gas botella pequeña',          1.50, 'Bebida', true, 'http://127.0.0'),
  ('Refresco cola',        'Lata 33cl fría',                        2.00, 'Bebida', true, 'http://127.0.0'),
  ('Cerveza artesana',     'IPA local de barril, 33cl',             3.50, 'Bebida', true, 'http://127.0.0'),
  ('Gin-tonic premium',   'Ginebra Hendrick''s con tónica fever',  9.00, 'Bebida', true, 'http://127.0.0'),
  ('Mojito',               'Ron blanco, menta, lima y azúcar',      8.50, 'Bebida', true, 'http://127.0.0'),
  ('Zumo de naranja',      'Exprimido al momento',                   3.00, 'Bebida', true, 'http://127.0.0'),
  ('Nachos con guacamole', 'Tortillas crujientes con guac casero',  7.50, 'Comida', true, 'http://127.0.0'),
  ('Patatas bravas',       'Con salsa picante y alioli',            5.00, 'Comida', true, 'http://127.0.0'),
  ('Tabla de quesos',      'Selección de quesos con mermelada',    12.00, 'Comida', true, 'http://127.0.0'),
  ('Alitas BBQ',           '8 unidades con salsa barbacoa',         9.00, 'Comida', true, 'http://127.0.0'),
  ('Burger Flex',          'Ternera, cheddar, bacon y pepinillos', 13.00, 'Comida', false, 'http://127.0.0');


-- Insertar productos
insert into public.productos (nombre, descripcion, categoria, precio, imagen_url, disponible) values
  ('Cerveza Artesana', 'Cerveza local', 'Bebida', 4.50, 'http://127.0.0.1:57321/storage/v1/object/public/productos/cerveza-artesana.jpg', true),
  ('Gin Tonic Premium', 'Gin premium con tónica', 'Bebida', 9.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/gintonic-premium.jpg', true),
  ('Agua mineral', 'Agua mineral', 'Bebida', 2.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/agua-mineral.jpg', true),
  ('Mojito', 'Bebida refrescante', 'Bebida', 8.50, 'http://127.0.0.1:57321/storage/v1/object/public/productos/mojito.jpg', true),
  ('Nachos con guacamole', 'Nachos crujientes', 'Comida', 7.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/nachos-guacamole.jpg', true),
  ('Tabla de quesos', 'Selección de quesos', 'Comida', 12.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/tablas-quesos.jpg', true),
  ('Alitas BBQ', 'Alitas a la BBQ', 'Comida', 9.50, 'http://127.0.0.1:57321/storage/v1/object/public/productos/alitas-bbq.jpg', true),
  ('Hamburguesa Flex', 'Hamburguesa especial', 'Comida', 11.00, 'http://127.0.0.1:57321/storage/v1/object/public/productos/burger-flex.jpg', true)
on conflict do nothing;

