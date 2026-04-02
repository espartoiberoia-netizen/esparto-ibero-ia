// app/cursos-online/page.tsx
import Link from "next/link";

const courses = [
  {
    id: "esparto-basico",
    title: "Curso básico de esparto",
    description:
      "Aprende los gestos fundamentales y realiza tus primeras piezas sencillas con esparto.",
    price: "49 €", // [[SUPOSICIÓN]]
    level: "Inicial",
  },
  {
    id: "esparto-medio",
    title: "Curso medio de esparto",
    description:
      "Profundiza en técnicas y formas más complejas para ganar soltura y creatividad.",
    price: "[[SUPOSICIÓN]]",
    level: "Intermedio",
  },
  {
    id: "esparto-avanzado",
    title: "Curso avanzado de esparto",
    description:
      "Proyectos avanzados, acabados cuidados y piezas de mayor tamaño y complejidad.",
    price: "[[SUPOSICIÓN]]",
    level: "Avanzado",
  },
  {
    id: "canasto-varetas-olivo",
    title: "Canasto de varetas de olivo",
    description:
      "Descubre cómo trabajar con varetas de olivo para crear tu primer canasto tradicional.",
    price: "[[SUPOSICIÓN]]",
    level: "Proyecto único",
  },
];

export default function CursosOnlinePage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8">
      {/* Cabecera */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif">
          Cursos online de Esparto Ibero IA
        </h1>
        <p className="text-sm sm:text-base text-neutral-700 max-w-2xl">
          Aprende desde casa, a tu ritmo, con acceso al campus privado de
          Esparto Ibero IA. Vídeos claros, entregas de tus trabajos y
          acompañamiento humano apoyado en inteligencia artificial (como el
          agente Nemesio) para que no camines sola.
        </p>
      </section>

      {/* Grid de cursos */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif">Elige tu curso</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl border border-[#E9E1D8] bg-white/70 p-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-neutral-700">
                  {course.description}
                </p>
                <p className="text-xs text-neutral-600">
                  Nivel: {course.level}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold">{course.price}</span>
                <Link
                  href={`/cursos-online/${course.id}`}
                  className="rounded-xl bg-[#6E8B3D] px-3 py-1 text-xs text-white hover:opacity-90"
                >
                  Ver detalles
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cómo funciona Esparto Ibero IA online */}
      <section className="space-y-3 rounded-2xl border border-[#E9E1D8] bg-white/70 p-4">
        <h2 className="text-xl font-serif">¿Cómo funciona el campus online?</h2>
        <p className="text-sm text-neutral-700">
          Todos los cursos online comparten la misma base: un espacio tranquilo,
          sin prisas, pensado para que puedas aprender con calma y volver a las
          lecciones siempre que lo necesites.
        </p>
        <ul className="text-sm text-neutral-800 list-disc pl-5 space-y-1">
          <li>
            Acceso al <strong>campus privado</strong> desde cualquier
            dispositivo.
          </li>
          <li>
            Lecciones en <strong>vídeo grabado</strong> que puedes pausar y
            repetir cuando quieras. [[SUPOSICIÓN]]
          </li>
          <li>
            Materiales de apoyo descargables (PDFs, esquemas, listas de
            materiales). [[SUPOSICIÓN]]
          </li>
          <li>
            Área de <strong>entregas</strong> donde subes fotos o vídeos de tu
            trabajo y recibes comentarios.
          </li>
          <li>
            Comentarios humanos tuyos como instructor y apoyo extra con{" "}
            <strong>IA (Nemesio)</strong> para revisar gestos y detalles.
          </li>
        </ul>
      </section>

      {/* Qué incluye cualquier curso online */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif">Qué incluye cualquier curso online</h2>
        <div className="grid gap-3 sm:grid-cols-2 text-sm text-neutral-800">
          <div className="rounded-2xl border border-[#E9E1D8] bg-white/60 p-3">
            <h3 className="font-semibold mb-1">Aprende a tu ritmo</h3>
            <p>
              Tú decides cuándo te conectas y cuánto avanzas. Puedes compaginar
              el curso con trabajo, familia y otros ritmos de vida.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E9E1D8] bg-white/60 p-3">
            <h3 className="font-semibold mb-1">Campus tranquilo</h3>
            <p>
              Un espacio pensado para bajar revoluciones, conectar con tus
              manos y con materiales naturales, lejos del ruido y la prisa.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E9E1D8] bg-white/60 p-3">
            <h3 className="font-semibold mb-1">Acompañamiento</h3>
            <p>
              No compras solo unos vídeos: tienes un camino guiado, posibilidad
              de subir tus trabajos y recibir feedback.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E9E1D8] bg-white/60 p-3">
            <h3 className="font-semibold mb-1">Actualizaciones</h3>
            <p>
              El contenido puede crecer con el tiempo. Si el curso se amplía,
              podrás beneficiarte de nuevas lecciones mientras lo tengas activo.
              [[SUPOSICIÓN]]
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
