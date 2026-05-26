import Link from "next/link";

const salas = [
  {
    id: "sala-dorada",
    nombre: "Sala Dorada",
    subtitulo: "Lounge privado",
    descripcion:
      "Un espacio reservado con luz baja, sofas amplios y una atmosfera elegante para grupos pequenos.",
    capacidad: "18 personas",
    ambiente: "Jazz, soul y sesiones live",
    imagen:
      "https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "sala-negra",
    nombre: "Sala Negra",
    subtitulo: "Club intimo",
    descripcion:
      "Texturas oscuras, sonido envolvente y una energia nocturna pensada para celebraciones privadas.",
    capacidad: "24 personas",
    ambiente: "Deep, latin jazz y electronica suave",
    imagen:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "sala-ambar",
    nombre: "Sala Ambar",
    subtitulo: "Escenario reservado",
    descripcion:
      "Una sala mas abierta para encuentros con musica en vivo, cenas privadas y noches especiales.",
    capacidad: "36 personas",
    ambiente: "Piano bar, acoustic y live sessions",
    imagen:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function SalasPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,227,0.22),transparent_34%),linear-gradient(180deg,#050505_0%,#000_72%)]" />
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold text-[#8FB9FF]">FLEX Live Sessions</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.045em] text-white md:text-7xl">
            Salas privadas para una noche con presencia.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-[#A7B5C8] md:text-xl">
            Espacios elegantes, sonido cuidado y reservas privadas. Un diseño mas
            limpio y moderno, sin perder la esencia nocturna de FLEX.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/reservar"
              className="rounded-full bg-[#0071E3] px-7 py-3 font-semibold text-white transition hover:bg-[#147CE5]"
            >
              Reservar sala
            </Link>
            <a
              href="#salas"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver espacios
            </a>
          </div>
        </div>
      </section>

      <section id="salas" className="mx-auto max-w-[1320px] space-y-5 px-5 pb-20 md:px-8">
        {salas.map((sala, index) => (
          <article
            key={sala.id}
            id={sala.id}
            className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#111113] md:grid-cols-[1.05fr_0.95fr]"
          >
            <div className={`relative min-h-[360px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
              <img
                src={sala.imagen}
                alt={sala.nombre}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
            </div>

            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
              <p className="text-sm font-semibold text-[#8FB9FF]">{sala.subtitulo}</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {sala.nombre}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#B6C2D1]">
                {sala.descripcion}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                  <p className="text-sm text-[#8E9AAF]">Capacidad</p>
                  <p className="mt-2 text-xl font-semibold text-white">{sala.capacidad}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                  <p className="text-sm text-[#8E9AAF]">Ambiente</p>
                  <p className="mt-2 text-xl font-semibold text-white">{sala.ambiente}</p>
                </div>
              </div>

              <Link
                href="/reservar"
                className="mt-8 inline-flex w-fit rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-[#DCE9FF]"
              >
                Reservar {sala.nombre}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="px-5 pb-24 text-center md:px-8">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/[0.045] p-8 md:p-12">
          <p className="text-sm font-semibold text-[#8FB9FF]">FLEX</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            Elige la sala. Nosotros preparamos la noche.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[#A7B5C8]">
            Reserva para eventos privados, reuniones con invitados, celebraciones
            o sesiones musicales con aforo controlado.
          </p>
          <Link
            href="/reservar"
            className="mt-8 inline-flex rounded-full bg-[#0071E3] px-7 py-3 font-semibold text-white transition hover:bg-[#147CE5]"
          >
            Consultar disponibilidad
          </Link>
        </div>
      </section>
    </main>
  );
}
