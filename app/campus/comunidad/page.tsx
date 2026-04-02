// app/campus/comunidad/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

type CommunityPost = {
  id: number;
  user_email: string | null;
  body: string;
  created_at: string;
};

export default function ComunidadPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/acceso");
        return;
      }

      setUserEmail(data.user.email ?? null);

      const { data: postsData, error: postsError } = await supabase
        .from("community_posts")
        .select("id, user_email, body, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!postsError && postsData) {
        setPosts(postsData);
      }

      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!newPost.trim()) return;

    setSending(true);

    try {
      const res = await fetch("/api/comunidad/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newPost.trim() }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        console.error("Error en API /api/comunidad/post:", errorBody);
        alert(
          "No se ha podido publicar el mensaje.\n\n" +
            "Si se repite el error, avisa a Juanma para que lo revise."
        );
        setSending(false);
        return;
      }

      const { post } = (await res.json()) as { post: CommunityPost };

      setPosts((prev) => [post, ...prev]);
      setNewPost("");
    } catch (err) {
      console.error("Error de red al publicar mensaje:", err);
      alert(
        "Ha habido un problema de conexión al publicar el mensaje.\n\n" +
          "Revisa tu conexión a internet e inténtalo otra vez."
      );
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto">
        <p className="p-4">Cargando comunidad…</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Comunidad del campus</h1>
        {userEmail && (
          <p className="text-sm text-neutral-700">
            Participas como <strong>{userEmail}</strong>
          </p>
        )}
        <p className="text-sm text-neutral-700">
          Este es un espacio tranquilo para compartir avances, dudas y fotos de
          tus piezas de esparto. Escribe con respeto y piensa que al otro lado
          hay personas como tú, aprendiendo poco a poco.
        </p>
      </header>

      {/* Navegación rápida */}
      <div className="flex gap-2">
        <Link
          href="/campus"
          className="rounded-xl border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-800 hover:bg-[#E9E1D8]"
        >
          Volver al campus
        </Link>
        <Link
          href="/campus/sala-virtual"
          className="rounded-xl border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-800 hover:bg-[#E9E1D8]"
        >
          Ir a la sala virtual
        </Link>
      </div>

      {/* Formulario para nuevo mensaje */}
      <section className="rounded-xl border border-[#E9E1D8] bg-[#F5EFE7] p-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-800">
            Escribe un mensaje para la comunidad
          </label>
          <textarea
            className="w-full rounded-xl border border-neutral-300 p-2 text-sm"
            rows={3}
            placeholder="Puedes presentarte, contar qué estás aprendiendo o plantear una duda concreta…"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending || !newPost.trim()}
              className="rounded-xl bg-[#6E8B3D] px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              {sending ? "Publicando..." : "Publicar mensaje"}
            </button>
          </div>
        </form>
      </section>

      {/* Listado de mensajes */}
      <section className="space-y-3">
        {posts.length === 0 ? (
          <p className="text-sm text-neutral-600">
            Todavía no hay mensajes en la comunidad. Anímate y escribe el
            primero. 🙂
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-neutral-200 bg-white/90 p-3 text-sm text-neutral-800"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="font-semibold text-xs text-neutral-700">
                  {post.user_email ?? "Alumna del campus"}
                </span>
                <time
                  className="text-[11px] text-neutral-500"
                  dateTime={post.created_at}
                >
                  {new Date(post.created_at).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              <p className="whitespace-pre-line">{post.body}</p>
            </article>
          ))
        )}
      </section>
    </section>
  );
}
