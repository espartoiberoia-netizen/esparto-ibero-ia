// app/aviso-legal/page.tsx
export default function AvisoLegalPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Aviso legal</h1>
        <p className="text-sm text-neutral-700">
          En este documento encontrarás la información básica sobre la
          titularidad de esta web y las condiciones de uso.
        </p>
      </header>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">1. Titular de la web</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la
          sociedad de la información y de comercio electrónico (LSSI-CE), se
          informa que la titularidad del sitio web{" "}
          <strong>espartoiberoia.com</strong> corresponde a:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Nombre / denominación social:{" "}
            <strong>Juan Manuel Suárez Rivas</strong>
          </li>
          <li>NIF: <strong>25328366F</strong></li>
          <li>
            Dirección: C/ Puente los Nonitos, nº 14, 29531 Humilladero (Málaga),
            España
          </li>
          <li>Email de contacto: espartoiberoia@gmail.com</li>
        </ul>
        <p>
          En adelante, a efectos de este documento, nos referiremos a la
          titular como <strong>“Esparto Ibero IA”</strong>.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">2. Objeto del sitio web</h2>
        <p>
          A través de esta web se ofrece información sobre actividades de
          formación en esparto y otras fibras naturales, cursos online,
          talleres presenciales y contenidos relacionados con artesanía y
          sostenibilidad.
        </p>
        <p>
          El acceso y/o uso de este sitio web atribuye la condición de usuario,
          que acepta desde dicho acceso y/o uso las presentes condiciones de
          uso.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          3. Condiciones de uso y buen comportamiento
        </h2>
        <p>
          El usuario se compromete a hacer un uso adecuado de los contenidos y
          servicios que Esparto Ibero IA ofrece a través de la web y, con
          carácter enunciativo pero no limitativo, a no utilizarlos para:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Realizar actividades ilícitas, ilegales o contrarias a la buena fe.</li>
          <li>
            Difundir contenidos o propaganda de carácter racista, xenófobo,
            violento o contrario a los derechos humanos.
          </li>
          <li>Provocar daños en los sistemas físicos y lógicos de la web.</li>
          <li>
            Intentar acceder a cuentas de otros usuarios o a áreas restringidas
            del campus sin autorización.
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          4. Propiedad intelectual e industrial
        </h2>
        <p>
          Todos los contenidos de esta web, incluyendo a título enunciativo y no
          limitativo: textos, vídeos, imágenes, diseños, logotipos, iconos,
          así como el diseño gráfico y el código fuente, son titularidad de
          Esparto Ibero IA o de terceros que han autorizado su uso.
        </p>
        <p>
          Queda prohibida la reproducción, distribución, comunicación pública,
          transformación o cualquier otra forma de explotación de dichos
          contenidos sin autorización previa y expresa por escrito de la titular.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">5. Enlaces externos (links)</h2>
        <p>
          Esta web puede contener enlaces a sitios web de terceros. Esparto
          Ibero IA no se responsabiliza de los contenidos, informaciones u
          servicios que puedan aparecer en dichos sitios, que tendrán
          exclusivamente carácter informativo.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          6. Limitación de responsabilidad
        </h2>
        <p>
          La titular no garantiza la disponibilidad continua y permanente de los
          servicios de la web, pudiendo producirse interrupciones por tareas de
          mantenimiento o por causas ajenas a su control.
        </p>
        <p>
          En ningún caso Esparto Ibero IA será responsable de cualquier daño o
          perjuicio que se derive del uso de esta web o de la aplicación
          práctica de los contenidos de los cursos, correspondiendo al usuario
          valorar sus propias circunstancias físicas y de salud antes de
          realizar actividades manuales.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">7. Modificaciones</h2>
        <p>
          Esparto Ibero IA se reserva el derecho de modificar en cualquier
          momento y sin necesidad de previo aviso la presentación y
          configuración de la web, así como el presente aviso legal.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">8. Legislación aplicable</h2>
        <p>
          Con carácter general, las relaciones entre Esparto Ibero IA y los
          usuarios de sus servicios telemáticos presentes en esta web se
          encuentran sometidas a la legislación y jurisdicción españolas.
        </p>
      </section>
    </main>
  );
}
