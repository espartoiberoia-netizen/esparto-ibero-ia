// app/api/comunidad/post/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase con la SERVICE ROLE KEY (solo en el servidor)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
);

export async function POST(req: NextRequest) {
  try {
    const { body, userEmail } = (await req.json()) as {
      body?: string;
      userEmail?: string;
    };

    if (!body || typeof body !== "string") {
      return NextResponse.json(
        { error: "Falta el texto del mensaje." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("community_posts")
      .insert({
        body,
        user_email: userEmail ?? null, // 💡 guardamos el email en la columna user_email
      })
      .select("id, user_email, body, created_at")
      .single();

    if (error || !data) {
      console.error("Error insertando mensaje en community_posts:", error);
      return NextResponse.json(
        { error: "No se ha podido guardar el mensaje." },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: data }, { status: 200 });
  } catch (err) {
    console.error("Error inesperado en /api/comunidad/post:", err);
    return NextResponse.json(
      { error: "Error inesperado en el servidor." },
      { status: 500 }
    );
  }
}
