// app/cookies/page.tsx
export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Política de cookies</h1>
        <p className="text-sm text-neutral-700">
          En esta página te explico qué son las cookies, qué tipos utilizamos en
          la web de Esparto Ibero IA y cómo puedes gestionarlas.
        </p>
      </header>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu
          navegador cuando visitas una página web. Sirven, entre otras cosas,
          para recordar tus preferencias, mantener la sesión iniciada o
          obtener estadísticas de uso de la web.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">2. ¿Qué tipos de cookies usamos?</h2>

        <h3 className="font-semibold">2.1. Cookies técnicas (necesarias)</h3>
        <p>
          Son aquellas imprescindibles para el funcionamiento básico de la web y
          del campus, por ejemplo, mantener tu sesión iniciada como alumna o
          recordar ciertas preferencias. Sin estas cookies, algunos servicios no
          se podrían prestar correctamente.
        </p>

        <h3 className="font-semibold">2.2. Cookies de analítica</h3>
        <p>
          Podremos utilizar herramientas de analítica web respetuosas con la
          privacidad para conocer de forma agregada cómo se utiliza la web
          (páginas más visitadas, tiempo de permanencia, etc.) y mejorarla.
          Estas cookies solo se activarán si das tu consentimiento.
        </p>

        <h3 className="font-semibold">2.3. Cookies de terceros</h3>
        <p>
          Algunos servicios integrados en la web pueden instalar sus propias
          cookies, por ejemplo:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Reproductor de vídeo (Vimeo), cuando reproduces una lección o un
            vídeo de muestra.
          </li>
          <li>
            Plataforma de pago (Stripe), cuando en el futuro se inicie un
            proceso de compra.
          </li>
          <li>
            Herramienta de chat o soporte, si se habilita en la web.
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">3. Gestión del consentimiento</h2>
        <p>
          Al acceder por primera vez a la web, se mostrará un banner de cookies
          que te permitirá aceptar o rechazar las cookies no necesarias. En
          cualquier momento podrás revisar tu elección mediante las opciones
          del propio banner (cuando lo implementemos) o configurando tu
          navegador.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          4. Cómo desactivar o eliminar cookies desde tu navegador
        </h2>
        <p>
          Puedes permitir, bloquear o eliminar las cookies instaladas en tu
          equipo mediante la configuración de las opciones del navegador que
          utilices. Consulta la ayuda de tu navegador para más información sobre
          cómo gestionar las cookies.
        </p>
      </section>
    </main>
  );
}
