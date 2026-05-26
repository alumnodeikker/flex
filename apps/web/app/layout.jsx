import Link from "next/link";
import "./globals.css";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/salas", label: "Salas" },
  { href: "/eventos", label: "Eventos" },
  { href: "/reservar", label: "Reservar" },
];

export const metadata = {
  title: "FLEX Live Sessions",
  description:
    "Eventos musicales, salas privadas y experiencias live con estilo moderno.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="min-h-screen bg-black">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-[#161617]/80 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-8">
              <Link href="/" className="group flex items-end gap-3">
                <span className="text-2xl font-semibold leading-none tracking-[-0.04em] text-white">
                  FLEX
                </span>
                <span className="hidden pb-0.5 text-xs font-medium text-[#A7B5C8] sm:block">
                  Live Sessions
                </span>
              </Link>

              <ul className="hidden items-center gap-7 md:flex">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-sm font-medium text-white/76 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/reservar"
                className="rounded-full bg-[#0071E3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#147CE5]"
              >
                Reservar
              </Link>
            </nav>
          </header>

          {children}

          <footer className="border-t border-white/10 bg-[#050505]">
            <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-6 py-10 text-sm text-[#8E8E93] md:flex-row md:items-center md:justify-between md:px-8">
              <p>
                <span className="text-xl font-semibold tracking-[-0.04em] text-white">FLEX</span>{" "}
                <span className="text-[#8FB9FF]">Live Sessions</span>
              </p>
              <p>© 2026 FLEX. Eventos, musica y experiencias privadas.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
