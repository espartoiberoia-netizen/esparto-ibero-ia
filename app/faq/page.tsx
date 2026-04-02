// app/faq/page.tsx
type FaqItem = {
  pregunta: string;
  respuesta: string;
};

const FAQS: FaqItem[] = [
  {
    pregunta: "¿Qué es Esparto Ibero IA?",
    respuesta:
      "Es un proyecto de formación en esparto y artesanía, con cursos online, talleres presenciales en Humilladero (Málaga) y un campus privado donde ir sumando contenidos poco a poco.",
  },
  {
    pregunta: "¿Necesito experiencia previa para el curso básico?",
    respuesta:
      "No. El curso básico está pensado para personas que parten de cero o casi cero. Empezamos desde cómo preparar el espacio, las fibras y los primeros gestos con el esparto.",
  },
  {
    pregunta: "¿Qué incluye el curso básico de esparto?",
    respuesta:
      "Incluye lecciones en vídeo paso a paso, materiales descargables en PDF y acceso al campus para ver el contenido online. Más adelante también tendrás acceso a avisos de sesiones en directo y a la comunidad privada.",
  },
  {
    pregunta: "¿Cuánto tiempo tendré acceso al curso?",
    respuesta:
      "La idea es que puedas volver a las lecciones siempre que lo necesites mientras el proyecto esté en marcha. Si en el futuro hubiera cambios importantes en las condiciones de acceso, se comunicarían por correo electrónico a las alumnas.",
  },
  {
    pregunta: "¿Cómo se combinan los cursos online con los talleres presenciales?",
    respuesta:
      "Los cursos online te permiten aprender a tu ritmo desde casa. Los talleres presenciales en Humilladero son un complemento: sirven para practicar en directo, resolver dudas cara a cara y compartir avances con otras personas.",
  },
  {
    pregunta: "¿Cómo se compra un curso?",
    respuesta:
      "De momento estamos terminando de preparar la parte técnica de los pagos online. El plan es utilizar Stripe para que puedas pagar con tarjeta de forma segura. Mientras tanto, si estás interesada, puedes escribirme y vemos opciones.",
  },
  {
    pregunta: "Vivo lejos de Humilladero, ¿me compensa el campus?",
    respuesta:
      "Sí, el campus está pensado precisamente para poder aprender desde cualquier sitio con conexión a internet. Los talleres presenciales son un extra para quienes estáis cerca, pero el corazón del proyecto son los cursos online.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Preguntas frecuentes</h1>
        <p className="text-sm text-neutral-700 max-w-2xl">
          Aquí tienes respuestas a las dudas más habituales sobre los cursos,
          el campus y los talleres presenciales. Si te queda alguna pregunta,
          puedes escribirme sin problema.
        </p>
      </header>

      <section className="space-y-4">
        {FAQS.map((item) => (
          <article
            key={item.pregunta}
            className="rounded-xl border border-[#E9E1D8] bg-white/80 p-4"
          >
            <h2 className="text-sm font-semibold">{item.pregunta}</h2>
            <p className="mt-2 text-sm text-neutral-800">{item.respuesta}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-neutral-200 bg-[#F5EFE7] p-4 text-sm text-neutral-800">
        <p className="mb-2">
          ¿No encuentras respuesta a tu pregunta o tienes un caso especial?
        </p>
        <p>
          Escríbeme a{" "}
          <a
            href="mailto:espartoiberoia@gmail.com"
            className="underline decoration-dotted"
          >
            espartoiberoia@gmail.com
          </a>{" "}
          contándome un poco tu situación y te respondo personalmente.
        </p>
      </section>
    </main>
  );
}
    