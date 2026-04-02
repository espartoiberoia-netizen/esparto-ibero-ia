"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function MiniEspartoPage() {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createClient(url, key);
  }, []);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "err">(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") ?? "").toString().trim();
    const email = (formData.get("email") ?? "").toString().trim();
    const message = (formData.get("message") ?? "").toString().trim();
    const source = (formData.get("source") ?? "facebook").toString().trim();
    const consent = formData.get("consent") === "on";

    if (!message) {
      setStatus("err");
      setErrorMsg("Escribe tu opinión.");
      setLoading(false);
      return;
    }

    // Si quieres obligar a aceptar privacidad, descomenta:
    // if (!consent) {
    //   setStatus("err");
    //   setErrorMsg("Debes aceptar la política de privacidad.");
    //   setLoading(false);
    //   return;
    // }

    const { error } = await supabase.from("miniesparto_opiniones").insert([
      { name, email, message, source, consent },
    ]);

    if (error) {
      setStatus("err");
      setErrorMsg(error.message);
    } else {
      setStatus("ok");
      form.reset();
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-lime-50 to-amber-50" />

        <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-10">
          {/* Texto */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-semibold text-neutral-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Concurso Nacional · 2026
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              MiniEsparto
            </h1>

            <p className="text-base text-neutral-700 md:text-lg">
              Concurso nacional de miniaturas en esparto. Consulta las bases oficiales y déjanos tu opinión para mejorar
              esta primera edición.
            </p>

            {/* SOLO 2 BOTONES */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/miniesparto/bases"
                className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Ver bases en pantalla
              </a>

              <a
                href="#opinion"
                className="rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Enviar opinión
              </a>
            </div>

            <div className="pt-3 text-sm text-neutral-600">
              Enlace para Facebook:{" "}
              <span className="font-semibold">espartoiberoia.com/miniesparto</span>
            </div>
          </div>

          {/* Cartel grande con imagen */}
          <div className="flex items-stretch">
            <div className="w-full rounded-3xl border border-neutral-200 bg-white/70 p-4">
              <div className="h-full min-h-[420px] md:min-h-[520px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <img
                  src="/images/MiniPichon.jpeg"
                  alt="Cartel MiniEsparto"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-neutral-600">
                  Cartel provisional (luego lo sustituimos por el definitivo).
                </p>

                <a
                  href="/images/MiniPichon.jpeg"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-neutral-800 underline hover:opacity-80"
                >
                  Ver imagen en grande
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="opinion" className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">Formulario de opinión</h2>
        <p className="text-neutral-700">
          Tu feedback nos ayuda a ajustar normas, categorías, plazos y premios.
        </p>

        <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="font-medium">Nombre</label>
              <input
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                name="name"
                placeholder="Tu nombre"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium">Email</label>
              <input
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                type="email"
                name="email"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium">Tu opinión</label>
            <textarea
              className="w-full rounded-xl border border-neutral-300 px-3 py-2"
              rows={6}
              name="message"
              placeholder="Cuéntanos qué mejorarías: categorías, tamaños, premios, plazos..."
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="font-medium">¿Cómo nos has conocido?</label>
              <select
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                name="source"
                defaultValue="facebook"
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="web">Web</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-neutral-700">
              <input type="checkbox" name="consent" />
              <span>Acepto la política de privacidad.</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar opinión"}
          </button>

          {status === "ok" && (
            <p className="text-sm font-semibold text-emerald-700">
              ¡Enviado! Gracias por tu opinión.
            </p>
          )}

          {status === "err" && (
            <p className="text-sm font-semibold text-red-700">
              No se pudo enviar: {errorMsg}
            </p>
          )}

          <p className="text-xs text-neutral-500">
            Nota: el envío guarda la opinión en Supabase (tabla <span className="font-semibold">miniesparto_opiniones</span>).
          </p>
        </form>
      </section>
    </main>
  );
}
