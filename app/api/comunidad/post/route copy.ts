// app/api/comunidad/post/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cliente de Supabase solo en el servidor (usa la service role key)
const supabase = createClient(supabaseUrl, serviceRoleKey);

export async function POST(req: Request) {
  try {
    const { body, userEmail } = await req.json();

    if (!body || typeof body !== "string") {
      return NextResponse.json(
        { error: "El mensaje está vacío o no es válido" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("community_posts")
      .insert({
        body: body.trim(),
        user_email: userEmail ?? null,
      })
      .select("id, user_email, body, created_at")
      .single();

    if (error || !data) {
      console.error("Error insertando en Supabase:", error);
      return NextResponse.json(
        { error: error?.message ?? "Error al insertar en la base de datos" },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err: any) {
    console.error("Error en handler /api/comunidad/post:", err);
    return NextResponse.json(
      { error: "Error interno en el servidor" },
      { status: 500 }
    );
  }
}
