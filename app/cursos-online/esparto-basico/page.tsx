// app/cursos-online/esparto-basico/page.tsx
import Link from "next/link";

export default function CursoEspartoBasicoPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8">
      {/* Cabecera del curso */}
      <section className="space-y-3">
        <Link
          href="/cursos-online"
          className="text-xs underline decoration-dotted text-neutral-600"
        >
          ← Volver a todos los cursos
        </Link>

        <h1 className="text-3xl sm:text-4xl font-serif">
          Curso básico de esparto
        </h1>
        <p className="text-sm sm:text-base text-neutral-700 max-w-2xl">
          Un curso pensado para empezar desde cero, coger confianza con el
          esparto y disfrutar de tus primeras piezas hechas a mano, sin prisa y
          con acompañamiento.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-[#E9E1D8] px-3 py-1">
            Nivel: Inicial
          </span>
          <span className="font-semibold text-lg">49 €</span>

          {/* Botón de compra / reserva (de momento, lleva a Contacto) */}
          <Link
            href="/contacto"
            className="rounded-xl bg-[#6E8B3D] px-4 py-2 text-xs sm:text-sm text-white hover:opacity-90"
          >
            Comprar curso / reservar plaza
          </Link>

          <span className="text-xs text-neutral-500">
            Próximamente pago directo con Stripe. De momento te atendemos por
            contacto.
          </span>
        </div>
      </section>

      {/* Qué vas a aprender */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif">Qué vas a aprender</h2>
        <ul className="text-sm text-neutral-800 list-disc pl-5 space-y-1">
          <li>
            Preparar tu espacio de trabajo para que sea cómodo, seguro y
            agradable.
          </li>
          <li>
            Conocer el esparto y sus cuidados básicos antes de empezar a
            trabajar con él. [[SUPOSICIÓN]]
          </li>
          <li>Realizar los primeros gestos y nudos fundamentales.</li>
          <li>
            Crear tu primera pieza sencilla, útil y bonita, paso a paso y sin
            prisas.
          </li>
          <li>
            Entender cómo seguir practicando por tu cuenta después del curso.
          </li>
        </ul>
      </section>

      {/* Para quién es / no es */}
      <section className="grid gap-4 sm:grid-cols-2 text-sm">
        <div className="rounded-2xl border border-[#E9E1D8] bg-white/70 p-3">
          <h2 className="text-lg font-serif mb-2">Este curso es para ti si…</h2>
          <ul className="list-disc pl-5 space-y-1 text-neutral-800">
            <li>
              No has trabajado nunca con esparto o solo has hecho alguna prueba
              suelta.
            </li>
            <li>
              Buscas una actividad manual tranquila, conectada con la tierra y
              con materiales naturales.
            </li>
            <li>
              Te apetece aprender a tu ritmo, pero con una guía clara y
              estructurada.
            </li>
            <li>
              Valoras poder enseñar tus avances y recibir comentarios sobre tu
              trabajo.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#E9E1D8] bg-white/50 p-3">
          <h2 className="text-lg font-serif mb-2">Este curso no es para ti si…</h2>
          <ul className="list-disc pl-5 space-y-1 text-neutral-800">
            <li>
              Buscas algo rápido, con resultados en una tarde y sin practicar.
            </li>
            <li>
              No te interesa dedicar tiempo a aprender el gesto con calma.
            </li>
            <li>
              Quieres directamente piezas muy avanzadas sin pasar por la base.
            </li>
          </ul>
        </div>
      </section>

      {/* Contenido del curso (provisional) */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif">Contenido del curso</h2>
        <p className="text-sm text-neutral-700">
          Esta estructura es orientativa y la irás afinando con calma con Nemesio
          y con tu experiencia real con las alumnas. [[SUPOSICIÓN]]
        </p>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-neutral-800">
          <li>Bienvenida y preparación del espacio.</li>
          <li>Conociendo el esparto y las herramientas básicas. [[SUPOSICIÓN]]</li>
          <li>Gestos y nudos fundamentales.</li>
          <li>Ejercicio guiado de práctica del gesto.</li>
          <li>Proyecto: tu primera pieza sencilla.</li>
          <li>Cierre, ideas para seguir practicando y próximos pasos.</li>
        </ol>
      </section>

      {/* Qué incluye este curso */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif">Qué incluye este curso</h2>
        <ul className="text-sm text-neutral-800 list-disc pl-5 space-y-1">
          <li>
            Acceso al campus privado de Esparto Ibero IA para este curso.
          </li>
          <li>
            Lecciones en vídeo que puedes ver las veces que necesites.
          </li>
          <li>
            Materiales de apoyo en PDF (listas de materiales, recordatorios,
            etc.). [[SUPOSICIÓN]]
          </li>
          <li>
            Área de entregas donde subir fotos o vídeos de tu trabajo y recibir
            comentarios.
          </li>
          <li>
            Correcciones humanas tuyas como instructor y apoyo de IA (Nemesio)
            en algunas revisiones.
          </li>
        </ul>
      </section>

      {/* Cómo se trabaja en el campus */}
      <section className="space-y-3 rounded-2xl border border-[#E9E1D8] bg-white/70 p-4">
        <h2 className="text-xl font-serif">Cómo se trabaja en el campus</h2>
        <p className="text-sm text-neutral-700">
          No es solo “darle al play” y mirar vídeos. La idea es que puedas
          integrar el esparto en tu día a día con calma, practicando y recibiendo
          feedback.
        </p>
        <ul className="text-sm text-neutral-800 list-disc pl-5 space-y-1">
          <li>Miras la lección en vídeo cuando te venga bien.</li>
          <li>Practicas el gesto o la pieza propuesta.</li>
          <li>
            Cuando te apetezca, subes una foto o un vídeo corto en la sección de
            entregas.
          </li>
          <li>
            Recibes comentarios de Juan Manuel y, en algunos casos, también una
            revisión automática de Nemesio (IA) para ayudarte a ver detalles.
          </li>
        </ul>
      </section>
    </main>
  );
}
