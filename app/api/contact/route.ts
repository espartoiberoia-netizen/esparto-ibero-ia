// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sb = supabaseAdmin();

    const { error } = await sb.from("contact_messages").insert({
      name: body.nombre,
      email: body.email,
      phone: body.telefono ?? null,
      message: body.mensaje,
      consent: body.consentimiento ?? false,
    });

    if (error) {
      console.error("Error Supabase:", error);
      return NextResponse.json(
        { ok: false, error: "Error guardando mensaje" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en POST /api/contact:", err);
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida" },
      { status: 400 }
    );
  }
}
