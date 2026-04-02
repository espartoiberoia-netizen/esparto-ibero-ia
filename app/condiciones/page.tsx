// app/condiciones/page.tsx
export default function CondicionesCampus() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-serif">Condiciones del Campus</h1>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">1. Uso del campus</h2>
        <p>
          El acceso al campus es personal e intransferible. No está permitido
          compartir usuario ni contraseña con terceros. Esparto Ibero IA puede actualizar los contenidos, lecciones y
          materiales del campus en cualquier momento para mejorar el servicio.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          2. Envío de fotos o vídeos del alumnado
        </h2>
        <p>
          Las alumnas pueden enviar fotos o vídeos de sus trabajos para revisión
          a través del área de entregas. Esta función forma parte del servicio
          formativo ofrecido por Esparto Ibero IA.
        </p>
        <p>
          Al enviar estos materiales, la alumna declara ser titular de los
          contenidos y autoriza a Esparto Ibero IA a almacenarlos y utilizarlos
          con fines formativos dentro del campus, sin que ello implique la
          cesión de los derechos de propiedad intelectual sobre la obra.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          3. Autorización para uso público de trabajos
        </h2>
        <p>
          De forma opcional, la alumna puede autorizar que determinadas fotos o
          vídeos se utilicen como ejemplo de trabajos en la web pública o en
          redes sociales de Esparto Ibero IA. Esta autorización se ofrece
          mediante una casilla específica en el formulario de entrega y es
          completamente voluntaria.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          4. Uso de inteligencia artificial (“Nemesio”)
        </h2>
        <p>
          El campus puede utilizar un agente de inteligencia artificial interno,
          denominado “Nemesio”, para generar comentarios automáticos sobre las
          entregas del alumnado (por ejemplo, observaciones sobre el gesto, la
          tensión del material o aspectos a mejorar). Estos comentarios tienen
          carácter orientativo y no sustituyen la revisión humana por parte del
          instructor.
        </p>
        <p>
          El uso de estos sistemas de IA se realiza exclusivamente con fines
          formativos, para hacer más ligero el trabajo manual del instructor y
          poder ofrecer un mejor seguimiento a más personas. En ningún caso se
          utilizarán para tomar decisiones automatizadas con efectos jurídicos
          sobre las alumnas.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">5. Prohibiciones</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Descargar, copiar o difundir materiales del curso (vídeos, PDFs,
            textos) fuera del ámbito estrictamente personal sin autorización.
          </li>
          <li>
            Compartir enlaces privados de lecciones o archivos del campus con
            personas no matriculadas.
          </li>
          <li>
            Utilizar los contenidos con fines comerciales sin permiso expreso de
            Esparto Ibero IA.
          </li>
        </ul>
      </section>
    </main>
  );
}
