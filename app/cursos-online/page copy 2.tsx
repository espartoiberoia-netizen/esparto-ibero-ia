// app/cursos-online/page.tsx
import Link from "next/link";

export default function CursosOnlinePage() {
  const cursos = [
    {
      id: "esparto-basico",
      titulo: "Curso básico de esparto",
      nivel: "Iniciación",
      resumen:
        "Aprende los gestos fundamentales y realiza tus primeras piezas sencillas de esparto.",
      estado: "disponible",
      precio: "49 €",
      nota: "Primer curso que abriremos",
    },
    {
      id: "esparto-medio",
      titulo: "Curso medio de esparto",
      nivel: "Intermedio",
      resumen:
        "Seguimos avanzando en técnicas y piezas más complejas.",
      estado: "proximamente",
      precio: "Por confirmar",
      nota: "En preparación",
    },
    {
      id: "esparto-avanzado",
      titulo: "Curso avanzado de esparto",
      nivel: "Avanzado",
      resumen:
        "Trabajo avanzado con esparto y piezas de mayor tamaño / complejidad.",
      estado: "proximamente",
      precio: "Por confirmar",
      nota: "En preparación",
    },
    {
      id: "cesta-baretas-olivo",
      titulo: "Cesta con baretas de olivo",
      nivel: "Monográfico",
      resumen:
        "Monográfico centrado en una cesta con baretas de olivo.",
      estado: "proximamente",
      precio: "Por confirmar",
      nota: "Recuperando tu antiguo curso de olivo",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Cursos online de Esparto Ibero IA</h1>
        <p className="text-sm text-neutral-700 max-w-2xl">
          Vista general de los cursos online. Cada curso tiene su propia página
          de detalles, donde podremos concretar temario, materiales, etc.
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

              <p className="text-sm text-neutral-700">{curso.resumen}</p>

              <p className="text-xs text-neutral-600">{curso.nota}</p>
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

              <Link
                href={`/cursos-online/${curso.id}`}
                className="rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-800 hover:bg-[#E9E1D8]"
              >
                Ver detalles
              </Link>
            </div>
          </article>
        ))}
      </section>

      <p className="text-xs text-neutral-600 max-w-3xl">
        Nota: solo el curso básico de esparto se activará en la primera fase. El
        resto se irán definiendo y grabando poco a poco, seguramente contigo y
        con @Nemesio.
      </p>
    </main>
  );
}
