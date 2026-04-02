// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-4 py-16">
      <p className="text-xs uppercase tracking-wide text-neutral-500">
        Error 404
      </p>
      <h1 className="text-3xl font-serif">
        Esta página de esparto todavía no está tejida
      </h1>
      <p className="text-sm text-neutral-700 max-w-xl">
        Has llegado a una dirección que ahora mismo no existe en Esparto Ibero
        IA. Puede que el enlace esté mal escrito o que hayamos movido el
        contenido.
      </p>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/"
          className="rounded-xl bg-[#6E8B3D] px-4 py-2 text-white hover:opacity-90"
        >
          Volver al inicio
        </Link>
        <Link
          href="/cursos-online"
          className="rounded-xl border border-neutral-300 px-4 py-2 text-neutral-800 hover:bg-[#E9E1D8]"
        >
          Ver cursos online
        </Link>
        <Link
          href="/contacto"
          className="rounded-xl border border-neutral-300 px-4 py-2 text-neutral-800 hover:bg-[#E9E1D8]"
        >
          Contactar
        </Link>
      </div>
    </main>
  );
}
