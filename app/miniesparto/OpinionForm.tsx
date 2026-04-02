"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function OpinionForm() {
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

    // Si quieres obligar consentimiento, descomenta:
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
    <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="font-medium">Nombre</label>
          <input className="w-full rounded-xl border border-neutral-300 px-3 py-2" name="name" placeholder="Tu nombre" />
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
        <p className="text-sm font-semibold text-emerald-700">¡Enviado! Gracias por tu opinión.</p>
      )}

      {status === "err" && (
        <p className="text-sm font-semibold text-red-700">No se pudo enviar: {errorMsg}</p>
      )}
    </form>
  );
}
