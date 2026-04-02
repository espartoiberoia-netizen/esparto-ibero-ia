// app/privacidad/page.tsx
export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Política de privacidad</h1>
        <p className="text-sm text-neutral-700">
          En esta política te explico cómo tratamos tus datos personales cuando
          utilizas la web y el campus de Esparto Ibero IA.
        </p>
      </header>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          1. Responsable del tratamiento
        </h2>
        <p>
          De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la legislación
          española vigente, se informa de que el responsable del tratamiento de
          tus datos es:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Nombre: <strong>Juan Manuel Suárez Rivas</strong>
          </li>
          <li>
            Dirección: C/ Puente los Nonitos, nº 14, 29531 Humilladero (Málaga),
            España
          </li>
          <li>Email de contacto: espartoiberoia@gmail.com</li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          2. Datos que se recogen y finalidades
        </h2>

        <h3 className="font-semibold">2.1. Formulario de contacto</h3>
        <p>
          Datos: nombre, email, teléfono (opcional) y mensaje.
          <br />
          Finalidad: responder a las consultas y solicitudes que nos envíes.
        </p>

        <h3 className="font-semibold">2.2. Registro y acceso al campus</h3>
        <p>
          Datos: email, contraseña (almacenada de forma cifrada), y, en su
          caso, nombre y otros datos de perfil que decidas completar.
          <br />
          Finalidad: gestionar tu cuenta de usuario y darte acceso al campus y a
          los cursos que tengas activos.
        </p>

        <h3 className="font-semibold">
          2.3. Facturación y gestión administrativa
        </h3>
        <p>
          Cuando en el futuro adquieras cursos de pago, podrán solicitarse datos
          de facturación (nombre completo, NIF, dirección postal, país).
          <br />
          Finalidad: emitir facturas y cumplir obligaciones legales en materia
          fiscal y contable.
        </p>

        <h3 className="font-semibold">2.4. Datos de navegación</h3>
        <p>
          Se pueden recoger datos técnicos de uso de la web (dirección IP,
          navegador, tiempo de visita, páginas visitadas) mediante herramientas
          de analítica y cookies. La finalidad es mejorar el funcionamiento de
          la web y la experiencia de usuario. Más información en la{" "}
          <a href="/cookies" className="underline decoration-dotted">
            política de cookies
          </a>
          .
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          3. Legitimación del tratamiento
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Formulario de contacto:</strong> consentimiento del propio
            usuario.
          </li>
          <li>
            <strong>Registro y campus:</strong> ejecución de un contrato de
            servicios formativos (acceso a contenidos).
          </li>
          <li>
            <strong>Facturación:</strong> cumplimiento de obligaciones legales
            en materia fiscal y contable.
          </li>
          <li>
            <strong>Analítica web y cookies no técnicas:</strong> tu
            consentimiento, que puedes revocar en cualquier momento.
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          4. Conservación de los datos
        </h2>
        <p>
          Los datos proporcionados se conservarán mientras mantengas tu cuenta
          activa o mientras sean necesarios para cumplir la finalidad para la
          que fueron recogidos, y durante los plazos exigidos por la normativa
          fiscal y contable en el caso de facturación.
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          5. Cesiones y encargados de tratamiento
        </h2>
        <p>
          No se cederán datos personales a terceros salvo obligación legal. No
          obstante, para poder prestar los servicios de la web y el campus,
          trabajamos con proveedores que actúan como{" "}
          <em>encargados de tratamiento</em>, siguiendo nuestras instrucciones.
          A modo enunciativo:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Plataformas de alojamiento y base de datos (por ejemplo, Supabase,
            Vercel).
          </li>
          <li>Plataformas de vídeo (por ejemplo, Vimeo).</li>
          <li>
            Plataformas de pago (por ejemplo, Stripe, cuando se activen pagos
            online).
          </li>
          <li>
            Herramientas de analítica y chat, si se habilitan en la web.
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          6. Derechos de las personas usuarias
        </h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión,
          limitación del tratamiento, oposición y portabilidad enviando un
          correo electrónico a{" "}
          <strong>espartoiberoia@gmail.com</strong> indicando en
          el asunto “Protección de datos” y adjuntando una copia de tu
          documento de identidad.
        </p>
              <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">
          7. Uso de sistemas de inteligencia artificial
        </h2>
        <p>
          Esparto Ibero IA, utiliza sistemas de inteligencia artificial
           (por ejemplo, un agente interno denominado
          “Nemesio”) para ayudar en la revisión y mejora de algunos contenidos,
          incluyendo, en su caso, los trabajos (fotos o vídeos) que las alumnas
          envían voluntariamente a través del campus.
        </p>
        <p>
          Estos sistemas se utilizan con fines estrictamente formativos y de
          apoyo al instructor humano, y no adoptan decisiones con efectos
          jurídicos sobre las personas usuarias. La base jurídica de este
          tratamiento es la ejecución del contrato formativo y el interés
          legítimo de mejorar la calidad del servicio, siempre dentro del marco
          del Reglamento (UE) 2016/679 (RGPD).
        </p>
        <p>
          En cualquier momento puedes solicitar más información sobre este tipo
          de tratamiento escribiendo a <strong>espartoiberoia@gmail.com</strong>.
        </p>
      </section>

        <p>
          Asimismo, si consideras que tus derechos no han sido atendidos
          correctamente, puedes presentar una reclamación ante la Agencia
          Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted"
          >
            www.aepd.es
          </a>
          ).
        </p>
      </section>

      <section className="space-y-2 text-sm text-neutral-800">
        <h2 className="text-lg font-semibold">8. Seguridad de los datos</h2>
        <p>
          Esparto Ibero IA aplica medidas técnicas y organizativas razonables
          para proteger tus datos personales y evitar su pérdida, mal uso o
          acceso no autorizado. No obstante, ningún sistema es completamente
          seguro y existe siempre un cierto riesgo asociado al tratamiento de
          datos en internet.
        </p>
      </section>
    </main>
  );
}
