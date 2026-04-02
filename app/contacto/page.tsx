// app/contacto/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Introduce un email válido"),
  telefono: z.string().optional(),
  mensaje: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
  consentimiento: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debes aceptar la política de privacidad",
    }),
});


type FormValues = z.infer<typeof Schema>;

export default function Contacto() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("¡Gracias! Hemos recibido tu mensaje.");
        reset();
      } else {
        alert("Ha habido un problema al enviar el mensaje.");
      }
    } catch (error) {
      console.error(error);
      alert("No se ha podido enviar el mensaje.");
    }
  }

  return (
    <section className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-serif">Contacto</h1>
      <p className="text-sm text-neutral-700">
        Cuéntanos en qué podemos ayudarte. Te responderemos lo antes posible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            className="w-full p-3 rounded-xl border border-neutral-300"
            placeholder="Nombre"
            {...register("nombre")}
          />
          {errors.nombre && (
            <p className="text-sm text-red-600 mt-1">
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div>
          <input
            className="w-full p-3 rounded-xl border border-neutral-300"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            className="w-full p-3 rounded-xl border border-neutral-300"
            placeholder="Teléfono (opcional)"
            {...register("telefono")}
          />
        </div>

        <div>
          <textarea
            className="w-full p-3 rounded-xl border border-neutral-300"
            rows={5}
            placeholder="Mensaje"
            {...register("mensaje")}
          />
          {errors.mensaje && (
            <p className="text-sm text-red-600 mt-1">
              {errors.mensaje.message}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("consentimiento")} />
          <span>Acepto la política de privacidad</span>
        </label>
        {errors.consentimiento && (
          <p className="text-sm text-red-600 mt-1">
            {errors.consentimiento.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#6E8B3D] text-white px-4 py-2 rounded-xl disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
}
