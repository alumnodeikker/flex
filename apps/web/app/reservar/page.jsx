export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <img
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop"
          alt="Lounge de lujo"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

        <div className="relative z-10 w-full max-w-2xl rounded-lg border border-[#D4A373]/20 bg-zinc-950/90 p-8 shadow-[0_0_80px_rgba(212,163,115,0.12)] md:p-10">
          <div className="mb-10 text-center">
            <span className="text-sm uppercase tracking-[0.35em] text-[#D4A373]">
              Reserva premium
            </span>
            <h1 className="mt-5 font-serif text-5xl font-light text-white">
              Reservar
            </h1>
            <p className="mt-4 text-zinc-400">
              Vive una experiencia exclusiva en nuestro lounge.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-zinc-300" htmlFor="nombre">
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-zinc-700 bg-black/40 px-5 py-4 outline-none transition focus:border-[#D4A373]"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-zinc-300" htmlFor="fecha">
                  Fecha
                </label>
                <input
                  id="fecha"
                  type="date"
                  className="w-full rounded-lg border border-zinc-700 bg-black/40 px-5 py-4 outline-none transition focus:border-[#D4A373]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-300" htmlFor="hora">
                  Hora
                </label>
                <input
                  id="hora"
                  type="time"
                  className="w-full rounded-lg border border-zinc-700 bg-black/40 px-5 py-4 outline-none transition focus:border-[#D4A373]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300" htmlFor="personas">
                Numero de personas
              </label>
              <input
                id="personas"
                type="number"
                min="1"
                placeholder="4"
                className="w-full rounded-lg border border-zinc-700 bg-black/40 px-5 py-4 outline-none transition focus:border-[#D4A373]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300" htmlFor="comentarios">
                Comentarios
              </label>
              <textarea
                id="comentarios"
                rows="5"
                placeholder="Detalles especiales..."
                className="w-full resize-none rounded-lg border border-zinc-700 bg-black/40 px-5 py-4 outline-none transition focus:border-[#D4A373]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#D4A373] py-4 text-lg font-semibold text-black transition hover:bg-[#E5B88E]"
            >
              Confirmar reserva
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
