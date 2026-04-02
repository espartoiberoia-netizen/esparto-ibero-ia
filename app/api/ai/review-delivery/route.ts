// app/api/ai/review-delivery/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const deliveryId = body.deliveryId as number | undefined;

    if (!deliveryId) {
      return NextResponse.json(
        { error: "Falta deliveryId" },
        { status: 400 }
      );
    }

    const supabase = supabaseAdmin();

    // ⚠️ Aquí, en el futuro, llamarás realmente al agente Nemesio.
    // Por ahora dejamos un comentario / ejemplo simulado.
    const fakeComment =
      "Ejemplo de comentario automático de Nemesio. Aquí aparecerá la revisión generada por el agente de IA cuando esté conectado.";
    const fakeScore = 4;
    const fakeModel = "Nemesio-simulado";

    const { error } = await supabase
      .from("deliveries")
      .update({
        ai_comment: fakeComment,
        ai_score: fakeScore,
        ai_model: fakeModel,
        ai_reviewed_at: new Date().toISOString(),
      })
      .eq("id", deliveryId);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "No se ha podido guardar la revisión IA" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error procesando la petición" },
      { status: 500 }
    );
  }
}
