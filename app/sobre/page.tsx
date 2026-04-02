// app/sobre/page.tsx
export default function SobrePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-neutral-600">
          Sobre mí
        </p>
        <h1 className="text-3xl font-serif">
          Hola, soy JuanMa Suárez de "El huerto del Llorón"
        </h1>
        <p className="text-sm text-neutral-700 max-w-3xl">
          Esparto Ibero IA nace desde el cariño por el esparto, la artesanía y
          la vida tranquila. Mi intención es que puedas aprender a trabajar el
          esparto paso a paso, desde casa o en los talleres presenciales en
          Humilladero (Málaga) o en los que se desarrollen en otro municipios cercanos,
           sin prisas y con acompañamiento.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,2fr),minmax(0,1.3fr)] md:items-start">
        {/* Columna texto */}
        <div className="space-y-4 text-sm text-neutral-800">
          <h2 className="text-lg font-serif">Qué vas a encontrar aquí</h2>
          <p>
            En este proyecto se mezclan varias cosas que para mí tienen mucho
            sentido juntos:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Cursos online</strong> para aprender a tu ritmo, con
              lecciones en vídeo claras y materiales descargables.
            </li>
            <li>
              <strong>Talleres presenciales en Humilladero</strong>, donde
              podemos vernos las caras, tocar el material y resolver dudas en
              directo.
            </li>
            <li>
              Un <strong>campus privado</strong> donde irás teniendo acceso a
              nuevas lecciones, recursos y, poco a poco, una pequeña comunidad
              de personas a las que también les calma trabajar con las manos.
            </li>
          </ul>

          <h2 className="text-lg font-serif"> Cómo me gusta enseñar</h2>
          <p>
            La idea no es que hagas un curso rápido y lo olvides, sino que
            vayas integrando el esparto en tu día a día. Prefiero:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Explicar despacio, sin tecnicismos innecesarios.</li>
            <li>Repetir los gestos clave las veces que haga falta.</li>
            <li>
              Proponer piezas sencillas al principio, para que veas resultados
              y te animes a seguir.
            </li>
          </ul>

          <p>
            Poco a poco iré sumando cursos (básico, intermedio, avanzado) y
            otros proyectos relacionados, como el trabajo con baretas de olivo y
            técnicas de cestería que pueden acompañar al esparto.
          </p>

          <p className="text-[11px] text-neutral-500">
            Este texto es un punto de partida. Siéntete libre de modificarlo
            para que refleje mejor tu historia personal y tu forma de trabajar.
          </p>
        </div>

        {/* Columna foto / tarjeta lateral */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#E9E1D8] bg-white/80 p-4 text-sm text-neutral-800">
            <h2 className="text-base font-serif mb-2">
              Desde Humilladero, Málaga
            </h2>
            <p className="mb-2">
              Vivo y trabajo en Humilladero (Málaga), donde también organizo los
              talleres presenciales. Si estás por la zona, quizá nos veamos en
              el edificio Vuela cualquier viernes por la tarde.
            </p>
            <p>
              Si quieres preguntarme algo sobre los cursos o los talleres, me
              puedes escribir a{" "}
              <a
                href="mailto:espartoiberoia@gmail.com"
                className="underline decoration-dotted"
              >
                espartoiberoia@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[#E9E1D8] bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
            Aquí podrás poner una foto tuya o del taller
          </div>
        </aside>
      </section>
    </main>
  );
}
