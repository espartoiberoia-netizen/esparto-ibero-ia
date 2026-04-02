// app/cursos-presenciales/page.tsx
import Link from "next/link";

export default function CursosPresencialesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-neutral-600">
          Talleres presenciales · Humilladero (Málaga)
        </p>
        <h1 className="text-3xl font-serif">Talleres presenciales de esparto</h1>
        <p className="text-sm text-neutral-700 max-w-3xl">
          Cada viernes por la tarde nos reunimos en Humilladero, en el edificio Punto 
          Vuela (Guadalinfo), para trabajar el esparto en directo, en un ambiente tranquilo y
          cercano. Grupos pequeños, para disfrutar de un buen ambiente, tiempo para preguntar y tocar el material con
          calma.
        </p>
        <p className="text-sm text-neutral-800">
          <strong>Horario:</strong> viernes de 18:00 a 20:00 ·
          <span className="ml-1">
            <strong>Ubicación:</strong> Edificio Punto Vuela (Guadalinfo), Humilladero (Málaga)
          </span>
        </p>
      </header>

      {/* Próximos talleres */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif">Próximos talleres presenciales</h2>
        <p className="text-sm text-neutral-700 max-w-3xl">
          Estamos organizando las próximas fechas y contenidos (iniciación al
          esparto, piezas sencillas, monográficos especiales…). Aquí iremos
          publicando los talleres confirmados. Mientras tanto, si te interesa
          venir, puedes escribirnos y te avisamos cuando haya plaza.
        </p>

        <div className="rounded-xl border border-[#E9E1D8] bg-white/80 p-4 text-sm text-neutral-800">
          <p className="font-semibold mb-1">
            ¿Quieres reservar plaza o que te avisemos?
          </p>
          <p className="mb-3">
            Déjanos un mensaje indicando que te interesan los talleres
            presenciales y te contestaremos con las próximas fechas disponibles.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-xl bg-[#6E8B3D] px-4 py-2 text-xs font-medium text-white hover:opacity-90"
          >
            Ir al formulario de contacto
          </Link>
        </div>
      </section>

      {/* Dónde estamos */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif">Dónde se imparten los talleres</h2>
        <p className="text-sm text-neutral-700 max-w-3xl">
          Los talleres se realizan en el <strong>Edificio Punto Vuela (al lado de la Guardería) </strong> de
          Humilladero (Málaga). Es un espacio cómodo y accesible donde podemos
          trabajar con calma, con aire acondicionado, con mesas, sillas y buena luz.
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Edificio+Vuela+Humilladero+M%C3%A1laga"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-[#E9E1D8]"
        >
          Ver ubicación en Google Maps
        </a>

        <p className="text-[11px] text-neutral-600 max-w-3xl">

        </p>
      </section>

      {/* Fotos del taller */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif">Un vistazo al ambiente</h2>
        <p className="text-sm text-neutral-700 max-w-3xl">
          Aquí podrás ver algunas fotos del espacio, de las mesas preparadas y
          de piezas hechas durante los talleres. De momento dejamos el hueco
          listo para ir subiendo imágenes reales.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#E9E1D8] bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
            Foto del taller 1 (próximamente)
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#E9E1D8] bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
            Foto del taller 2 (próximamente)
          </div>
        </div>
      </section>
    </main>
  );
}
