// app/cursos-online/esparto-basico/page.tsx

import Link from "next/link";

export default function CursoEspartoBasicoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-neutral-600">
          Cursos online · Nivel iniciación
        </p>
        <h1 className="text-3xl font-serif">Curso básico de esparto</h1>
        <p className="text-sm text-neutral-700">
          Aprende, paso a paso y a tu ritmo, los gestos fundamentales para
          trabajar el esparto y crear tus primeras piezas útiles. Sin prisas, con
          explicaciones claras y ejemplos cercanos.
        </p>
        <div className="flex items-baseline gap-3 text-sm">
          <span className="text-2xl font-semibold">49 €</span>
          <span className="text-neutral-600">
            acceso completo al curso · campus privado
          </span>
        </div>
      </header>

      {/* Vídeo de muestra */}
      <section className="space-y-2">
        <h2 className="text-lg font-serif">Vídeo de muestra</h2>
        <p className="text-sm text-neutral-700">
          Aquí puedes ver una pequeña presentación del curso y del estilo de las
          lecciones.
        </p>

        <div className="aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 bg-black">
          <iframe
            src="https://player.vimeo.com/video/1138043607"
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        <p className="text-[11px] text-neutral-600">
          Este vídeo es solo una muestra. En el curso completo tendrás acceso a
          todas las lecciones, materiales y actualizaciones futuras.
        </p>
      </section>

      {/* Qué vas a aprender */}
      <section className="space-y-2">
        <h2 className="text-lg font-serif">Qué vas a aprender</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
          <li>Cómo preparar tu mesa de trabajo y cuidar tu postura.</li>
          <li>Diferentes tipos de esparto y cómo hidratarlos correctamente.</li>
          <li>
            El gesto básico de trenzado, explicado despacio y desde varios
            ángulos.
          </li>
          <li>Cómo rematar bien para que las piezas queden firmes y duraderas.</li>
          <li>Tu primera pieza sencilla, lista para usar o regalar.</li>
        </ul>
      </section>

      {/* Para quién es */}
      <section className="space-y-2">
        <h2 className="text-lg font-serif">Para quién es este curso</h2>
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div className="space-y-1">
            <h3 className="font-semibold">Te encaja si…</h3>
            <ul className="list-disc space-y-1 pl-5 text-neutral-700">
              <li>Te atrae el trabajo manual y las fibras vegetales.</li>
              <li>No has tocado nunca el esparto o solo has hecho algo suelto.</li>
              <li>Buscas un aprendizaje tranquilo, sin prisas ni tecnicismos.</li>
              <li>
                Quieres reconectar con materiales naturales y procesos lentos.
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">No es para ti si…</h3>
            <ul className="list-disc space-y-1 pl-5 text-neutral-700">
              <li>
                Buscas un curso exprés para producir piezas en serie y vender ya.
              </li>
              <li>No te gusta dedicar tiempo a practicar gestos repetitivos.</li>
              <li>Prefieres algo totalmente teórico y sin practicar.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="space-y-2">
        <h2 className="text-lg font-serif">Qué incluye el curso</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
          <li>
            Acceso al campus privado de Esparto Ibero IA con las lecciones en
            vídeo.
          </li>
          <li>
            Contenidos grabados que puedes ver las veces que quieras, sin límite.
          </li>
          <li>
            Materiales descargables en PDF con recordatorios y esquemas
            principales.
          </li>
          <li>
            Actualizaciones futuras del curso incluidas en el precio inicial.
          </li>
        </ul>
      </section>

      {/* Cómo funciona el campus */}
      <section className="space-y-2">
        <h2 className="text-lg font-serif">Cómo funciona el campus</h2>
        <p className="text-sm text-neutral-700">
          Una vez que el curso esté abierto a la venta, podrás comprarlo y se
          activará automáticamente en tu campus. Desde ahí tendrás todas las
          lecciones organizadas paso a paso, podrás pausar, retroceder, volver
          cuando quieras y descargar los materiales asociados.
        </p>
      </section>

      {/* CTA suave, sin Stripe aún */}
      <section className="space-y-3 border-t border-neutral-200 pt-4">
        <p className="text-sm text-neutral-700">
          Este curso todavía está en fase de preparación final. Si te interesa,
          puedes ir viendo el material de muestra y familiarizarte con el campus.
          Más adelante añadiremos el pago seguro y la matrícula automática.
        </p>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/cursos-online"
            className="rounded-xl border border-neutral-300 px-3 py-2 hover:bg-[#E9E1D8]"
          >
            Volver a todos los cursos
          </Link>
        </div>
      </section>
    </main>
  );
}
