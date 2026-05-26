const eventos = [
  {
    titulo: "Jazz & Whisky Night",
    fecha: "Viernes 22 - 9:00 PM",
    descripcion: "Una noche intima con jazz en vivo y seleccion premium de whisky.",
  },
  {
    titulo: "Golden Sunset Session",
    fecha: "Sabado 23 - 7:00 PM",
    descripcion: "Cocktails exclusivos y DJ lounge en un ambiente sofisticado.",
  },
  {
    titulo: "Underground Experience",
    fecha: "Domingo 24 - 10:00 PM",
    descripcion: "Experiencia inmersiva inspirada en lounges secretos europeos.",
  },
];

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-20 text-center">
          <span className="text-sm uppercase tracking-[0.35em] text-[#D4A373]">
            Eventos exclusivos
          </span>
          <h1 className="mt-6 font-serif text-5xl font-light text-white md:text-7xl">
            Experiencias
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-zinc-400">
            Vive noches memorables con musica, mixologia y experiencias premium.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {eventos.map((evento) => (
            <article
              key={evento.titulo}
              className="relative overflow-hidden rounded-lg border border-[#D4A373]/20 bg-zinc-900 p-8 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent" />
              <div className="relative z-10">
                <span className="rounded-full border border-[#D4A373]/30 px-4 py-2 text-xs uppercase tracking-widest text-[#D4A373]">
                  {evento.fecha}
                </span>
                <h2 className="mt-8 font-serif text-3xl font-light text-white">
                  {evento.titulo}
                </h2>
                <p className="mt-5 min-h-20 leading-relaxed text-zinc-400">
                  {evento.descripcion}
                </p>
                <a
                  href="/reservar"
                  className="mt-10 inline-block rounded-full border border-[#D4A373] px-6 py-3 text-sm text-[#D4A373] transition hover:bg-[#D4A373] hover:text-black"
                >
                  Reservar evento
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
