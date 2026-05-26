import Link from "next/link";

const quickActions = [
  { title: "Pedir cancion", detail: "Elige que suena esta noche", icon: "♪" },
  { title: "Mi turno", detail: "Consulta tu posicion", icon: "◎" },
  { title: "Mis entradas", detail: "Accede a tus QR", icon: "▦" },
  { title: "Salas VIP", detail: "Reserva un espacio privado", icon: "♛" },
];

const events = [
  {
    date: "25 MAY",
    title: "Jazz Nights",
    place: "Pista principal",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop",
  },
  {
    date: "31 MAY",
    title: "Soul & Brass",
    place: "Sala dorada",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    date: "07 JUN",
    title: "Late Piano Bar",
    place: "Lounge privado",
    image:
      "https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=1200&auto=format&fit=crop",
  },
];

const songs = ["Fly Me To The Moon", "At Last", "Autumn Leaves", "La Vie En Rose"];

export default function Home() {
  return (
    <main className="mx-auto grid max-w-[1500px] gap-8 px-5 py-8 md:grid-cols-[240px_1fr] md:px-8 lg:grid-cols-[240px_1fr_360px]">
      <aside className="hidden min-h-[calc(100vh-130px)] border-r border-white/10 pr-6 md:block">
        <div className="sticky top-28 space-y-8">
          <div>
            <p className="font-serif text-5xl font-light tracking-[0.16em] text-white">FLEX</p>
            <p className="mt-2 text-xs uppercase tracking-[0.32em] text-[#D6A84F]">
              Live Sessions
            </p>
          </div>

          <nav className="space-y-2 text-sm text-[#D8D1C5]">
            {["Inicio", "Pedir cancion", "Mi turno", "Eventos", "Mis entradas", "Salas VIP"].map(
              (item, index) => (
                <a
                  key={item}
                  href={index === 0 ? "/" : "#experiencia"}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 transition ${
                    index === 0
                      ? "border-[#D6A84F]/25 bg-[#D6A84F]/14 text-[#F4C96B]"
                      : "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  {item}
                  {index === 0 ? <span className="text-[#D6A84F]">●</span> : null}
                </a>
              ),
            )}
          </nav>

          <div className="rounded-lg border border-[#D6A84F]/25 bg-[#D6A84F]/8 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D6A84F]">VIP Experience</p>
            <p className="mt-3 text-sm leading-relaxed text-[#C9C0B3]">
              Accede a salas privadas, servicio reservado y noches con aforo cuidado.
            </p>
            <Link
              href="/salas"
              className="mt-5 block rounded-md bg-[#D6A84F] px-4 py-3 text-center text-sm font-semibold text-[#120D05] transition hover:bg-[#F0C96B]"
            >
              Ver salas VIP
            </Link>
          </div>
        </div>
      </aside>

      <section className="space-y-8">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#11100F]/72 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
          <div className="relative min-h-[460px] p-6 md:p-10">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1800&auto=format&fit=crop"
              alt="Concierto nocturno elegante"
              className="absolute inset-0 h-full w-full object-cover opacity-42"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/76 to-black/25" />
            <div className="relative z-10 flex min-h-[380px] max-w-2xl flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.34em] text-[#F0C96B]">
                Proxima live session
              </p>
              <h1 className="mt-6 font-serif text-6xl font-light leading-[0.95] text-white md:text-8xl">
                Jazz Nights
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#D8D1C5]">
                Un club oscuro, amplio y elegante: musica en vivo, salones dorados,
                reservas privadas y una noche pensada para sonar lento.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#C9C0B3]">
                <span className="rounded-full border border-white/10 bg-black/35 px-4 py-2">
                  Sabado 25 de mayo
                </span>
                <span className="rounded-full border border-white/10 bg-black/35 px-4 py-2">
                  22:00 hrs
                </span>
                <span className="rounded-full border border-white/10 bg-black/35 px-4 py-2">
                  Pista principal
                </span>
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/reservar"
                  className="rounded-md bg-[#D6A84F] px-7 py-3 text-center font-semibold text-[#120D05] transition hover:bg-[#F0C96B]"
                >
                  Reservar ahora
                </Link>
                <Link
                  href="/eventos"
                  className="rounded-md border border-[#D6A84F]/35 px-7 py-3 text-center text-[#F4C96B] transition hover:bg-[#D6A84F]/10"
                >
                  Ver eventos
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section id="experiencia">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#D6A84F]">
                Accesos rapidos
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Tu noche, sin friccion</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <article
                key={action.title}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#D6A84F]/35 hover:bg-[#D6A84F]/8"
              >
                <div className="text-3xl text-[#D6A84F]">{action.icon}</div>
                <h3 className="mt-5 text-lg font-semibold text-white">{action.title}</h3>
                <p className="mt-1 text-sm text-[#9B9488]">{action.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Proximos eventos</h2>
            <Link href="/eventos" className="text-sm text-[#F0C96B] hover:text-white">
              Ver todos
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.title}
                className="group relative min-h-64 overflow-hidden rounded-lg border border-white/10 bg-[#11100F]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="relative z-10 flex min-h-64 flex-col justify-between p-5">
                  <span className="w-fit rounded-md border border-[#D6A84F]/35 bg-black/45 px-3 py-2 text-sm text-white">
                    {event.date}
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-[#D8D1C5]">{event.place}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <aside className="space-y-6 lg:block">
        <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold uppercase tracking-wide text-white">Mi turno</h2>
            <Link href="/reservar" className="text-sm text-[#F0C96B]">
              Ver lista
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-[1fr_132px] items-center gap-6">
            <div>
              <p className="text-sm text-[#9B9488]">Tu posicion en la fila</p>
              <p className="mt-3 text-6xl font-semibold text-[#D6A84F]">#4</p>
              <p className="mt-4 text-sm text-[#D8D1C5]">Tiempo estimado: 20 - 30 min</p>
            </div>
            <div className="grid aspect-square place-items-center rounded-full border-[12px] border-[#D6A84F]/25 border-t-[#D6A84F]">
              <span className="text-5xl text-white">♬</span>
            </div>
          </div>
          <Link
            href="/reservar"
            className="mt-7 block rounded-md border border-[#D6A84F]/45 px-5 py-3 text-center text-sm font-semibold text-[#F0C96B] transition hover:bg-[#D6A84F]/10"
          >
            Reservar turno
          </Link>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold uppercase tracking-wide text-white">Canciones pedidas</h2>
            <span className="text-sm text-[#F0C96B]">Hoy</span>
          </div>
          <div className="divide-y divide-white/10">
            {songs.map((song, index) => (
              <div key={song} className="flex items-center gap-4 py-4">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-xs text-[#D6A84F]">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{song}</p>
                  <p className="text-xs text-[#9B9488]">Solicitada por mesa {index + 2}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-lg border border-[#D6A84F]/30 bg-[#150F07] p-6">
          <img
            src="https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?q=80&w=900&auto=format&fit=crop"
            alt="Sala VIP dorada"
            className="absolute inset-0 h-full w-full object-cover opacity-28"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
          <div className="relative z-10 max-w-56 py-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D6A84F]">
              Eleva tu experiencia
            </p>
            <h2 className="mt-3 font-serif text-4xl text-white">Salas VIP</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#D8D1C5]">
              Tres ambientes, una noche inolvidable.
            </p>
            <Link
              href="/salas"
              className="mt-6 inline-block rounded-md bg-[#D6A84F] px-5 py-3 text-sm font-semibold text-[#120D05]"
            >
              Explorar salas
            </Link>
          </div>
        </section>
      </aside>
    </main>
  );
}
