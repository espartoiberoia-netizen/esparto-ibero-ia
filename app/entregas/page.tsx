// app/entregas/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // 👈 añadido
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

type Delivery = {
  id: number;
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

export default function EntregasPage() {
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [course, setCourse] = useState("esparto-basico");
  const [lesson, setLesson] = useState("intro");
  const [allowPublic, setAllowPublic] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [misEntregas, setMisEntregas] = useState<Delivery[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        cargarEntregas(data.user.id);
      }
    });
  }, []);

  async function cargarEntregas(uid: string) {
    const { data, error } = await supabase
      .from("deliveries")
      .select(
        "id, course_id, lesson_id, file_path, allowed_public_use, teacher_file_path, teacher_comment, ai_comment, ai_score, ai_model, ai_reviewed_at, created_at"
      )
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMisEntregas(data as Delivery[]);
    }
  }

  async function subirEntrega() {
    if (!file || !user) {
      alert("Selecciona un archivo primero.");
      return;
    }

    setSubiendo(true);

    const fileName = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("entregas")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Error subiendo el archivo. Inténtalo de nuevo.");
      setSubiendo(false);
      return;
    }

    const { error: insertError } = await supabase.from("deliveries").insert({
      user_id: user.id,
      course_id: course,
      lesson_id: lesson,
      file_path: fileName,
      allowed_public_use: allowPublic,
    });

    if (insertError) {
      console.error(insertError);
      alert("Error guardando la entrega en la base de datos.");
      setSubiendo(false);
      return;
    }

    alert("Entrega enviada correctamente.");
    setFile(null);
    setAllowPublic(false);
    await cargarEntregas(user.id);
    setSubiendo(false);
  }

  async function verArchivo(path: string) {
    const { data, error } = await supabase.storage
      .from("entregas")
      .createSignedUrl(path, 60 * 5); // 5 minutos

    if (error || !data?.signedUrl) {
      alert("No se ha podido generar el enlace del archivo.");
      return;
    }

    window.open(data.signedUrl, "_blank");
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8 space-y-6">
      <p className="text-sm">
        <Link
          href="/campus"
          className="text-sm underline text-neutral-700 hover:text-neutral-900"
        >
          Volver al campus
        </Link>
      </p>

      <h1 className="text-3xl font-serif">Entregar tu trabajo</h1>
      <p className="text-sm text-neutral-600">
        Sube aquí una foto o un vídeo corto de tu avance. Podrás comprobar el
        archivo y, cuando esté disponible, ver también la corrección del
        instructor y la revisión automática de Nemesio (IA).
      </p>

      {/* FORMULARIO DE ENVÍO */}
      <div className="space-y-3 text-sm bg-white/70 p-4 rounded-xl border border-[#E9E1D8]">
        <label className="block">
          Curso:
          <select
            className="w-full border p-2 rounded-xl mt-1"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="esparto-basico">Curso básico de esparto</option>
            <option value="esparto-medio">Curso medio de esparto</option>
            <option value="esparto-avanzado">Curso avanzado de esparto</option>
            <option value="cesta-baretas-olivo">
              Cesta con baretas de olivo
            </option>
          </select>
        </label>

        <label className="block">
          Lección:
          <select
            className="w-full border p-2 rounded-xl mt-1"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
          >
            <option value="intro">Introducción</option>
            <option value="nudo-basico">Nudo básico</option>
            <option value="pieza-primera">Primera pieza</option>
          </select>
        </label>

        <label className="block">
          Archivo (foto o vídeo corto):
          <input
            type="file"
            accept="image/*,video/*"
            className="mt-1"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <label className="flex items-start gap-2 text-xs">
          <input
            type="checkbox"
            checked={allowPublic}
            onChange={(e) => setAllowPublic(e.target.checked)}
          />
          <span>
            Autorizo voluntariamente a Esparto Ibero IA a utilizar este archivo
            como ejemplo de trabajos de alumnas en la web o redes sociales. Esta
            autorización es opcional.
          </span>
        </label>

        <button
          onClick={subirEntrega}
          disabled={subiendo}
          className="w-full bg-[#6E8B3D] text-white p-2 rounded-xl"
        >
          {subiendo ? "Enviando..." : "Enviar entrega"}
        </button>
      </div>

      {/* LISTADO DE ENTREGAS */}
      <section className="space-y-3 text-sm">
        <h2 className="text-xl font-serif">Mis entregas</h2>

        {misEntregas.length === 0 && (
          <p className="text-neutral-600">
            Todavía no has enviado ninguna entrega.
          </p>
        )}

        {misEntregas.map((e) => (
          <div
            key={e.id}
            className="p-3 border rounded-xl bg-white/70 space-y-1"
          >
            <p>
              <strong>Curso:</strong> {e.course_id}
            </p>
            <p>
              <strong>Lección:</strong> {e.lesson_id}
            </p>
            <p className="text-xs text-neutral-600">
              Enviada el: {new Date(e.created_at).toLocaleString()}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => verArchivo(e.file_path)}
                className="inline-flex rounded-xl border border-neutral-300 px-3 py-1 text-xs hover:bg-[#E9E1D8]"
              >
                Ver mi archivo
              </button>

              {e.teacher_file_path && (
                <button
                  onClick={() => verArchivo(e.teacher_file_path!)}
                  className="inline-flex rounded-xl border border-neutral-300 px-3 py-1 text-xs hover:bg-[#E9E1D8]"
                >
                  Ver corrección del instructor
                </button>
              )}
            </div>

            {e.teacher_comment && (
              <p className="mt-2 text-xs text-neutral-800">
                <strong>Comentario del instructor:</strong> {e.teacher_comment}
              </p>
            )}

            {e.ai_comment && (
              <p className="mt-2 text-xs text-neutral-700">
                <strong>Revisión automática (Nemesio):</strong> {e.ai_comment}
                {e.ai_score != null && (
                  <span className="ml-1 text-[11px] text-neutral-500">
                    · Valoración: {e.ai_score}/5
                  </span>
                )}
              </p>
            )}

            <p className="mt-1 text-[11px] text-neutral-500">
              Autorización pública: {e.allowed_public_use ? "Sí" : "No"}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
