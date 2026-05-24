// components/navbar.tsx
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-[#E9E1D8] bg-[#FAF6F1]/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-serif text-xl">
          <img src="/images/logo_eiia_svg.svg" alt="Logo Esparto Ibero IA" className="h-16 w-auto object-contain md:h-20" />
          <span className="hidden sm:inline-block">Esparto Ibero IA</span>
        </Link>

        {/* Navegación principal */}
        <nav className="flex flex-wrap gap-3 text-sm text-neutral-800">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <Link href="/cursos-online" className="hover:underline">
            Cursos online
          </Link>
          <Link href="/cursos-presenciales" className="hover:underline">
            Cursos presenciales
          </Link>
          <Link href="/campus" className="hover:underline">
            Campus
          </Link>
          <Link href="/observatorio" className="font-semibold text-[#6E8B3D] hover:underline decoration-2 underline-offset-4">
            Observatorio
          </Link>
          <Link href="/sobre" className="hover:underline">
            Sobre mí
          </Link>
          <Link href="/contacto" className="hover:underline">
            Contacto
          </Link>
          <a
            href="https://gesbo-robot.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 font-bold text-amber-700 hover:text-amber-500 transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            GESBO
          </a>
        </nav>
      </div>
    </header>
  );
}
