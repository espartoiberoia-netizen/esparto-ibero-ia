// app/cursos-presenciales/page.tsx
import Link from "next/link";

export default function CursosPresencialesPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8">
      {/* Cabecera */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif">
          Talleres presenciales de esparto
        </h1>
        <p className="text-sm sm:text-base text-neutral-700 max-w-2xl">
          Espacios pequeños, manos trabajando juntas y tiempo para charlar
          mientras el esparto se va convirtiendo en algo útil y bonito. Los
          talleres presenciales son para vivir la experiencia en grupo.
        </p>
      </section>

      {/* Próximos talleres (de momento, en preparación) */}
      <section className="space-y-3 rounded-2xl border border-[#E9E1D8] bg-white/70 p-4">
        <h2 className="text-xl font-serif">Próximos talleres presenciales</h2>
        <p className="text-sm text-neutral-700">
          Ahora mismo estamos organizando las próximas fechas y lugares para los
          talleres de:
        </p>
        <ul className="text-sm text-neutral-800 list-disc pl-5 space-y-1">
          <li>Iniciación al esparto.</li>
          <li>Primera pieza sencilla (cesto o bandeja). [[SUPOSICIÓN]]</li>
          <li>Canasto de varetas de olivo. [[SUPOSICIÓN]]</li>
        </ul>
        <p className="text-sm text-neutral-700">
          Si quieres que te avise cuando haya fechas cerca de ti, puedes
          escribirme desde la página de contacto.
        </p>
        <Link
          href="/contacto"
          className="inline-flex rounded-xl bg-[#6E8B3D] px-4 py-2 text-xs sm:text-sm text-white hover:opacity-90 mt-2"
        >
          Quiero recibir información de próximos talleres
        </Link>
      </section>

      {/* Bloque potente: organiza un taller en tu pueblo */}
      <section className="space-y-4 rounded-2xl border-2 border-[#6E8B3D] bg-[#F3EFE7] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-serif">
            ¿Quieres un taller de esparto en tu pueblo?
          </h2>
          <span className="text-xs rounded-full bg-[#6E8B3D] px-3 py-1 text-white">
            Tu plaza puede ser gratuita
          </span>
        </div>

        <p className="text-sm text-neutral-700">
          En Esparto Ibero IA los talleres presenciales nacen donde hay alguien
          con ganas de moverlos. Tú reúnes el grupo y ponemos la fecha; yo llevo
          el esparto, la experiencia y las ganas de enseñar.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 text-sm text-neutral-800">
          <div className="space-y-1">
            <h3 className="font-semibold">Cómo funciona</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Te conviertes en <strong>anfitriona local</strong>: buscas un
                pequeño grupo interesado (amigas, vecinas, familia…).
              </li>
              <li>
                Buscamos juntas un espacio sencillo donde podamos trabajar:
                sala, patio, local municipal, etc.
              </li>
              <li>
                Fijamos la fecha (sábado o domingo) y la duración del taller en
                función del contenido.
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold">Qué recibes tú</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Tu plaza como anfitriona sale <strong>sin coste</strong> como
                agradecimiento por coordinar el grupo. [[SUPOSICIÓN]]
              </li>
              <li>
                Prioridad para elegir fechas y el tipo de taller que mejor encaje
                con vuestro grupo.
              </li>
              <li>
                Hablamos del precio por persona según el tamaño del grupo y el
                desplazamiento, y te preparo una propuesta cerrada para tu
                pueblo.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-2 text-sm text-neutral-800">
          <h3 className="font-semibold">Ayuntamientos y asociaciones</h3>
          <p>
            Si eres ayuntamiento, asociación o colectivo, también podemos
            organizar talleres dentro de un programa cultural o de dinamización
            rural. Cuéntame tu idea y preparo una propuesta a medida.
          </p>
        </div>

        <div className="space-y-2 text-sm text-neutral-700">
          <p>
            Si te resuena y te apetece llevar el esparto a tu pueblo, escríbeme
            y cuéntame:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Desde qué pueblo o zona escribes.</li>
            <li>Cuántas personas crees que podrías reunir.</li>
            <li>Si tienes ya un espacio posible para el taller.</li>
          </ul>
        </div>

        <Link
          href="/contacto"
          className="inline-flex rounded-xl bg-[#6E8B3D] px-4 py-2 text-xs sm:text-sm text-white hover:opacity-90"
        >
          Quiero organizar un taller en mi pueblo
        </Link>
      </section>
    </main>
  );
}
