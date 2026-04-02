// app/admin/entregas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

type Delivery = {
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

export default function AdminEntregasPage() {
  const supabase = createSupabaseBrowserClient();
  const [entregas, setEntregas] = useState<Delivery[]>([]);
  const [commentById, setCommentById] = useState<Record<number, string>>({});
  const [fileById, setFileById] = useState<Record<number, File | null>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [aiLoadingId, setAiLoadingId] = useState<number | null>(null);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const { data, error } = await supabase
      .from("deliveries")
      .select(
        "id, user_id, course_id, lesson_id, file_path, allowed_public_use, teacher_file_path, teacher_comment, ai_comment, ai_score, ai_model, ai_reviewed_at, created_at"
      )
      .order("created_at", { ascending: false });

    if (!error && data) {
      const list = data as Delivery[];
      setEntregas(list);
      const initialComments: Record<number, string> = {};
      list.forEach((e) => {
        initialComments[e.id] = e.teacher_comment || "";
      });
      setCommentById(initialComments);
    }
  }

  async function getSignedUrl(path: string) {
    const { data, error } = await supabase.storage
      .from("entregas")
      .createSignedUrl(path, 60 * 5);

    if (error || !data?.signedUrl) {
      alert("No se ha podido generar el enlace del archivo.");
      return null;
    }

    return data.signedUrl;
  }

  async function verArchivo(path: string) {
    const url = await getSignedUrl(path);
    if (url) {
      window.open(url, "_blank");
    }
  }

  function handleCommentChange(id: number, value: string) {
    setCommentById((prev) => ({ ...prev, [id]: value }));
  }

  function handleFileChange(id: number, file: File | null) {
    setFileById((prev) => ({ ...prev, [id]: file }));
  }

  async function guardarCorreccion(entrega: Delivery) {
    setSavingId(entrega.id);

    let teacherFilePath = entrega.teacher_file_path;
    const file = fileById[entrega.id] || null;

    if (file) {
      const path = `teacher/${entrega.user_id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("entregas")
        .upload(path, file);

      if (uploadError) {
        console.error(uploadError);
        alert("Error subiendo el archivo de corrección.");
        setSavingId(null);
        return;
      }

      teacherFilePath = path;
    }

    const comentario = commentById[entrega.id] || null;

    const { error: updateError } = await supabase
      .from("deliveries")
      .update({
        teacher_file_path: teacherFilePath,
        teacher_comment: comentario,
      })
      .eq("id", entrega.id);

    if (updateError) {
      console.error(updateError);
      alert("Error guardando la corrección.");
      setSavingId(null);
      return;
    }

    alert("Corrección guardada.");
    await cargar();
    setSavingId(null);
  }

  // Botón para simular/activar revisión automática de Nemesio
  async function solicitarRevisionIA(entrega: Delivery) {
    setAiLoadingId(entrega.id);

    try {
      const res = await fetch("/api/ai/review-delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryId: entrega.id }),
      });

      if (!res.ok) {
        alert("No se ha podido pedir la revisión automática.");
      } else {
        alert("Revisión automática solicitada (simulada).");
        await cargar();
      }
    } catch (e) {
      console.error(e);
      alert("Error de red al pedir la revisión automática.");
    } finally {
      setAiLoadingId(null);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-serif">Revisión de entregas</h1>
      <p className="text-sm text-neutral-700">
        Aquí puedes ver los archivos que suben las alumnas, abrirlos, añadir un
        comentario y, si quieres, subir un archivo de corrección. También puedes
        pedir que el agente de IA <strong>Nemesio</strong> genere una revisión
        automática (comentario y valoración).
      </p>

      <div className="space-y-4 text-sm">
        {entregas.length === 0 && (
          <p className="text-neutral-600">Todavía no hay entregas.</p>
        )}

        {entregas.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border border-[#E9E1D8] bg-white/80 p-4 space-y-2"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p>
                  <strong>Alumna (user_id):</strong> {e.user_id}
                </p>
                <p>
                  <strong>Curso:</strong> {e.course_id}
                </p>
                <p>
                  <strong>Lección:</strong> {e.lesson_id}
                </p>
                <p className="text-xs text-neutral-600">
                  Enviada el: {new Date(e.created_at).toLocaleString()}
                </p>
              </div>
              <div className="text-xs text-neutral-600">
                Autorización pública: {e.allowed_public_use ? "Sí" : "No"}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => verArchivo(e.file_path)}
                className="inline-flex rounded-xl border border-neutral-300 px-3 py-1 text-xs hover:bg-[#E9E1D8]"
              >
                Ver archivo de la alumna
              </button>

              {e.teacher_file_path && (
                <button
                  onClick={() => verArchivo(e.teacher_file_path!)}
                  className="inline-flex rounded-xl border border-neutral-300 px-3 py-1 text-xs hover:bg-[#E9E1D8]"
                >
                  Ver tu corrección
                </button>
              )}

              <button
                onClick={() => solicitarRevisionIA(e)}
                disabled={aiLoadingId === e.id}
                className="inline-flex rounded-xl border border-neutral-300 px-3 py-1 text-xs hover:bg-[#E9E1D8]"
              >
                {aiLoadingId === e.id
                  ? "Pidiendo a Nemesio..."
                  : "Pedir revisión automática (Nemesio)"}
              </button>
            </div>

            {e.ai_comment && (
              <p className="mt-2 text-xs text-neutral-700">
                <strong>Revisión automática (Nemesio):</strong> {e.ai_comment}
                {e.ai_score != null && (
                  <span className="ml-1 text-[11px] text-neutral-500">
                    · Valoración: {e.ai_score}/5
                  </span>
                )}
                {e.ai_model && (
                  <span className="ml-1 text-[10px] text-neutral-400">
                    ({e.ai_model})
                  </span>
                )}
              </p>
            )}

            <div className="mt-3 space-y-2">
              <label className="block text-xs font-semibold">
                Comentario para la alumna:
                <textarea
                  className="mt-1 w-full rounded-xl border border-neutral-300 p-2 text-sm"
                  rows={3}
                  value={commentById[e.id] ?? ""}
                  onChange={(ev) =>
                    handleCommentChange(e.id, ev.target.value)
                  }
                  placeholder="Escribe aquí tu corrección o comentario..."
                />
              </label>

              <label className="block text-xs font-semibold">
                Archivo de corrección (opcional):
                <input
                  type="file"
                  className="mt-1"
                  accept="image/*,video/*"
                  onChange={(ev) =>
                    handleFileChange(
                      e.id,
                      ev.target.files?.[0] ? ev.target.files[0] : null
                    )
                  }
                />
                <span className="block text-[11px] text-neutral-500 mt-1">
                  Si seleccionas un archivo nuevo, se guardará como tu archivo
                  de corrección para esta entrega.
                </span>
              </label>

              <button
                onClick={() => guardarCorreccion(e)}
                disabled={savingId === e.id}
                className="mt-1 inline-flex rounded-xl bg-[#6E8B3D] px-3 py-1 text-xs text-white hover:opacity-90"
              >
                {savingId === e.id
                  ? "Guardando..."
                  : "Guardar comentario y corrección"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
