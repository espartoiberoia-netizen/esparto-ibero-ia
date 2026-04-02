// lib/supabase-server.ts
import { createClient } from "@supabase/supabase-js";

export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Faltan variables de entorno de Supabase");
  }

  // Cliente solo para uso en servidor (rutas API, etc.)
  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}
