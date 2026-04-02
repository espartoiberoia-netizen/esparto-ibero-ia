// app/admin/entregas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

type DeliveryRow = {
  id: number;
  user_id: string;
  course_id: string;
  lesson_id: string;
  file_path: string;
  allowed_public_use: boolean;
  teacher_file_path: string | null;
  teacher_comment: string | null;
  ai_comment: string | null;
  ai_score: number | null;
  ai_model: string | null;
  ai_reviewed_at: string | null;
  created_at: string;
};

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminEntregasPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [deliveries, setDeliveries] = useState<DeliveryRow[]>([]);

  useEffect(() => {
    async function load() {
      // 1️⃣ Comprobar sesión
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/acceso");
        return;
      }

      // 2️⃣ Comprobar email de admin
      if (!ADMIN_EMAIL || user.email !== ADMIN_EMAIL) {
        setDenied(true);
        setLoading(false);
        return;
      }

      // 3️⃣ Cargar entregas de la tabla deliveries
      const { data, error } = await supabase
        .from("deliveries")
        .select(
          "id, user_id, course_id, lesson_id, file_path, allowed_public_use, teacher_file_path, teacher_comment, ai_comment, ai_score, ai_model, ai_reviewed_at, created_at"
        )
        .order("created_at", { ascending: false });

      if (!error && data) {
        setDeliveries(data as DeliveryRow[]);
      }

      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-sm">Cargando entregas...</p>
      </section>
    );
  }

  if (denied) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <p className="text-sm text-red-700">
          No tienes permisos para ver esta página.
        </p>
        <p className="text-sm">
          Si este debería ser tu panel de revisión, comprueba que estás
          autenticada con el correo configurado en{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">
            NEXT_PUBLIC_ADMIN_EMAIL
          </code>
          .
        </p>
        <Link
          href="/campus"
          className="inline-flex rounded-xl border border-neutral-300 px-3 py-1.5 text-xs hover:bg-[#E9E1D8]"
        >
          Ir al campus
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm">
          <Link
            href="/campus"
            className="text-sm underline text-neutral-700 hover:text-neutral-900"
          >
            Volver al campus
          </Link>
        </p>

        <h1 className="text-2xl font-serif">Revisión de entregas (admin)</h1>
        <p className="text-sm text-neutral-600">
          Esta vista es solo para ti. Muestra todas las entregas de la tabla{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">
            deliveries
          </code>{" "}
          para que puedas revisarlas junto con Nemesio.
        </p>
      </header>

      {deliveries.length === 0 ? (
        <p className="text-sm text-neutral-700">
          Todavía no hay ninguna entrega registrada.
        </p>
      ) : (
        <div className="space-y-3">
          {deliveries.map((d) => (
            <article
              key={d.id}
              className="rounded-xl border border-[#E2D7C8] bg-white/90 p-3 text-sm space-y-1"
            >
              <p className="text-xs text-neutral-500">
                ID #{d.id} · Usuario:{" "}
                <span className="font-mono text-[11px]">{d.user_id}</span>
              </p>
              <p>
                <strong>Curso:</strong> {d.course_id} ·{" "}
                <strong>Lección:</strong> {d.lesson_id}
              </p>
              <p className="text-xs text-neutral-600">
                Entregada el{" "}
                {new Date(d.created_at).toLocaleString("es-ES", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>

              {d.ai_reviewed_at && (
                <p className="text-xs text-neutral-600">
                  Última revisión IA el{" "}
                  {new Date(d.ai_reviewed_at).toLocaleString("es-ES", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}{" "}
                  {d.ai_model && (
                    <span className="text-[11px] text-neutral-500">
                      · modelo: {d.ai_model}
                    </span>
                  )}
                </p>
              )}

              {d.ai_score != null && (
                <p className="text-xs text-neutral-700">
                  Valoración Nemesio: {d.ai_score}/5
                </p>
              )}

              {d.teacher_comment && (
                <p className="text-xs text-neutral-800">
                  <strong>Comentario tuyo:</strong> {d.teacher_comment}
                </p>
              )}

              {d.ai_comment && (
                <p className="text-xs text-neutral-700">
                  <strong>Comentario IA:</strong> {d.ai_comment}
                </p>
              )}

              <p className="text-[11px] text-neutral-500">
                Autorización pública: {d.allowed_public_use ? "Sí" : "No"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
