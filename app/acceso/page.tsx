// app/acceso/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

type Mode = "login" | "registro";

export default function AccesoPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createSupabaseBrowserClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje(null);
    setLoading(true);

    try {
      if (mode === "registro") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMensaje(
          "Cuenta creada. Revisa tu correo para confirmar y luego inicia sesión."
        );
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/campus");
      }
    } catch (err: any) {
      console.error(err);
      setMensaje(err.message || "Ha ocurrido un error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-serif">
        {mode === "login" ? "Acceso al campus" : "Crear cuenta para el campus"}
      </h1>

      <p className="text-sm text-neutral-700">
        Usa tu email y una contraseña que recuerdes. Ahora mismo es solo para
        entrar al campus de prueba.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-xl border border-neutral-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full p-3 rounded-xl border border-neutral-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {mensaje && (
          <p className="text-sm text-neutral-800 bg-[#E9E1D8] rounded-xl p-2">
            {mensaje}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#6E8B3D] text-white px-4 py-2 rounded-xl disabled:opacity-60"
        >
          {loading
            ? "Procesando..."
            : mode === "login"
            ? "Entrar al campus"
            : "Crear cuenta"}
        </button>
      </form>

      <button
        type="button"
        className="text-sm underline"
        onClick={() =>
          setMode((m) => (m === "login" ? "registro" : "login"))
        }
      >
        {mode === "login"
          ? "¿No tienes cuenta? Crear una nueva"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </section>
  );
}
