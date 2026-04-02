// app/cursos-online/page.tsx
"use client";

// app/cursos-online/page.tsx
import Link from "next/link";

export default function CursosOnlinePage() {
  const cursos = [
    {
      id: 1,
      titulo: "Curso básico de esparto",
      nivel: "Iniciación",
      descripcion:
        "Aprende los gestos fundamentales, cómo preparar el esparto y realiza tus primeras piezas sencillas.",
      duracion: "6–8 horas de vídeo",
      estado: "disponible",
      precio: "49 €",
      etiqueta: "Ideal para empezar desde cero",
    },
    {
      id: 2,
      titulo: "Curso medio de esparto",
      nivel: "Intermedio",
      descripcion:
        "Profundiza en técnicas de trenzado, remates y patrones para piezas más complejas.",
      duracion: "En preparación",
      estado: "proximamente",
      precio: "Por confirmar",
      etiqueta: "Próximamente",
    },
    {
      id: 3,
      titulo: "Curso avanzado de esparto",
      nivel: "Avanzado",
      descripcion:
        "Diseño de piezas grandes, estructuras complejas y proyectos personalizados.",
      duracion: "En preparación",
      estado: "proximamente",
      precio: "Por confirmar",
      etiqueta: "Próximamente",
    },
    {
      id: 4,
      titulo: "Cesta con baretas de olivo",
      nivel: "Monográfico",
      descripcion:
        "Paso a paso para crear tu primera cesta con baretas de olivo, desde la preparación del material hasta el acabado.",
      duracion: "En preparación",
      estado: "proximamente",
      precio: "Por confirmar",
      etiqueta: "Recuperando tu curso de huerto",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Cursos online de Esparto Ibero IA</h1>
        <p className="text-sm text-neutral-700 max-w-2xl">
          Formación tranquila, paso a paso, para aprender a trabajar el esparto y
          otros materiales naturales desde casa. Vídeos en alta calidad, acceso
          24/7 y campus privado para seguir tu ritmo.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {cursos.map((curso) => (
          <article
            key={curso.id}
            className="flex flex-col justify-between rounded-xl border border-[#E9E1D8] bg-white/80 p-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-serif text-lg">{curso.titulo}</h2>
                <span className="text-xs uppercase tracking-wide text-neutral-600">
                  {curso.nivel}
                </span>
              </div>

              <p className="text-sm text-neutral-700">{curso.descripcion}</p>

              <p className="text-xs text-neutral-600">
                {curso.duracion} · {curso.etiqueta}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-sm">
                <span className="font-semibold">{curso.precio}</span>
                {curso.estado === "disponible" && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-[#E9E1D8] px-2 py-0.5 text-xs text-neutral-800">
                    Abierto
                  </span>
                )}
                {curso.estado === "proximamente" && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                    Próximamente
                  </span>
                )}
              </div>

              {curso.estado === "disponible" ? (
                <button
                  className="rounded-xl bg-[#6E8B3D] px-3 py-2 text-sm text-white hover:opacity-90"
                  onClick={() => {
                    alert(
                      "Aquí conectaremos el pago con Stripe para el curso básico de esparto."
                    );
                  }}
                >
                  Apuntarme
                </button>
              ) : (
                <button
                  className="rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-600"
                  disabled
                >
                  Próximamente
                </button>
              )}
            </div>
          </article>
        ))}
      </section>

      <p className="text-xs text-neutral-600 max-w-3xl">
        Nota: Por ahora solo el curso básico de esparto estará disponible en la
        fase inicial del proyecto. Los cursos intermedios, avanzados y el
        monográfico de baretas de olivo irán llegando poco a poco, según vayamos
        grabando y editando el contenido.
      </p>
    </main>
  );
}
