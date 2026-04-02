// app/campus/sala-virtual/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

// Enlaces configurables por variables de entorno
const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_CAMPUS_URL;
const ZOOM_URL = process.env.NEXT_PUBLIC_ZOOM_ROOM_URL;

export default function SalaVirtualPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/acceso");
        return;
      }

      setUserEmail(data.user.email ?? null);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto">
        <p className="p-4">Cargando sala virtual...</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto space-y-6">
      <header className="space-y-2">
        <p className="text-sm">
          <button
            type="button"
            onClick={() => router.push("/campus")}
            className="text-sm underline text-neutral-700"
          >
            Volver al campus
          </button>
        </p>

        <h1 className="text-3xl font-serif">Sala virtual del campus</h1>

        {userEmail && (
          <p className="text-sm text-neutral-700">
            Sesión iniciada como <strong>{userEmail}</strong>
          </p>
        )}

        <p className="text-sm text-neutral-700">
          Aquí tendrás tus recursos extra: grupo privado de Telegram para
          compartir avances, avisos de sesiones en directo por Zoom y, más
          adelante, materiales adicionales por curso.
        </p>
      </header>

      <section className="rounded-xl border border-[#E9E1D8] bg-[#F5EFE7] p-4 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
          Tu zona de alumna
        </h2>

        {/* BLOQUE TELEGRAM */}
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-800">
            Grupo privado de Telegram
          </h3>

          <p className="text-sm text-neutral-700">
            Únete al grupo privado de Telegram para compartir avances, resolver
            dudas rápidas y enterarte de las novedades del campus.
          </p>

          {TELEGRAM_URL ? (
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-[#6E8B3D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5a7131]"
            >
              Entrar al grupo privado de Telegram
            </a>
          ) : (
            <p className="text-sm text-neutral-600">
              El enlace al grupo de Telegram aún no está configurado. Cuando
              esté listo aparecerá aquí el botón para entrar.
            </p>
          )}

          <p className="text-xs text-neutral-500">
            El grupo es sólo para alumnas del campus. Usa el enlace anterior
            para unirte con tu cuenta de Telegram.
          </p>
        </div>

        <hr className="border-t border-[#E2D7C8]" />

        {/* BLOQUE ZOOM */}
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-800">
            Sesiones en directo (Zoom)
          </h3>

          {ZOOM_URL ? (
            <>
              <p className="text-sm text-neutral-700">
                Usa este enlace cuando tengamos sesión en directo por Zoom. Se
                abrirá en una nueva pestaña.
              </p>
              <a
                href={ZOOM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-[#6E8B3D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5a7131]"
              >
                Entrar a la sala de Zoom
              </a>
            </>
          ) : (
            <>
              <p className="text-sm text-neutral-700">
                Próximamente añadiremos aquí el enlace fijo a las sesiones en
                directo por Zoom. De momento, cuando haya sesión te avisaré por
                el propio grupo de Telegram.
              </p>
              <p className="text-xs text-neutral-500">
                Cuando el enlace esté activo se abrirá en una nueva pestaña de
                tu navegador.
              </p>
            </>
          )}
        </div>
      </section>
    </section>
  );
}
