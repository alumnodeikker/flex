CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE pistas (
  id     serial PRIMARY KEY,
  numero int NOT NULL UNIQUE,
  tipo   text NOT NULL CHECK (tipo IN ('cubierta', 'exterior'))
);

CREATE TABLE usuarios (
  id     serial PRIMARY KEY,
  nombre text NOT NULL,
  email  text NOT NULL UNIQUE,
  nivel  text NOT NULL DEFAULT 'principiante'
         CHECK (nivel IN ('principiante', 'intermedio', 'avanzado'))
);

CREATE TABLE reservas (
  id        serial PRIMARY KEY,
  usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  pista_id   int NOT NULL REFERENCES pistas(id),
  inicio     timestamptz NOT NULL,
  fin        timestamptz NOT NULL,
  estado     text NOT NULL DEFAULT 'confirmada'
             CHECK (estado IN ('confirmada', 'cancelada')),

  CONSTRAINT sin_solapamiento_pista EXCLUDE USING gist (
    pista_id WITH =,
    tstzrange(inicio, fin) WITH &&
  ) WHERE (estado != 'cancelada')
);

CREATE TABLE notificaciones (
  id         serial PRIMARY KEY,
  usuario_id int REFERENCES usuarios(id) ON DELETE CASCADE,
  mensaje    text NOT NULL,
  creado_en  timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION notificar_reserva()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.estado = 'confirmada' THEN
    INSERT INTO notificaciones (usuario_id, mensaje)
    VALUES (NEW.usuario_id, 'Nueva reserva confirmada');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_notificar_reserva
  AFTER INSERT ON reservas
  FOR EACH ROW
  EXECUTE FUNCTION notificar_reserva();