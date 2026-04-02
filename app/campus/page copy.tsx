// app/campus/page.tsx 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";


type UserCourseRow = {
  id: number;
  user_id: string;
  course_id: number;
  status: string | null;
};

type DeliveryRow = {
  course_id: string;
  created_at: string;
};

type CampusCourse = {
  courseId: number;             // ID numérico que viene de user_courses
  titulo: string;
  nivel: string;
  slug: string;                 // slug del curso (para URLs)
  status: string | null;
  deliveryCourseId: string;     // valor que se guarda en deliveries.course_id
  hasDelivery: boolean;
  lastDeliveryAt: string | null;
};

// Mapeo local de los cursos por ID (los mismos IDs que en la tabla user_courses)
// [[SUPOSICIÓN]]: en deliveries.course_id estás guardando el SLUG del curso.
// Si en deliveries.course_id guardas "1", "2", "3"... cambia deliveryCourseId a "1", "2", etc.
const COURSE_DEFS: Record<
  number,
  { titulo: string; nivel: string; slug: string; deliveryCourseId: string }
> = {
  1: {
    titulo: "Curso básico de esparto",
    nivel: "Iniciación",
    slug: "esparto-basico",
    deliveryCourseId: "esparto-basico", // ⬅ esto debe coincidir con deliveries.course_id
  },
  2: {
    titulo: "Curso medio de esparto",
    nivel: "Intermedio",
    slug: "esparto-medio",
    deliveryCourseId: "esparto-medio",
  },
  3: {
    titulo: "Curso avanzado de esparto",
    nivel: "Avanzado",
    slug: "esparto-avanzado",
    deliveryCourseId: "esparto-avanzado",
  },
  4: {
    titulo: "Cesta con baretas de olivo",
    nivel: "Monográfico",
    slug: "cesta-baretas-olivo",
    deliveryCourseId: "cesta-baretas-olivo",
  },
};

// Ruta de la página de entrega en el frontend
// (tu página está en app/entregas/page.tsx → URL /entregas)
const ENTREGA_BASE_PATH = "/entregas";

export default function CampusPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [courses, setCourses] = useState<CampusCourse[]>([]);

  useEffect(() => {
    async function load() {
      // 1️⃣ Comprobar sesión
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/acceso");
        return;
      }

      const user = data.user;
      setUserEmail(user.email ?? null);

      // 2️⃣ Cargar cursos activos del usuario
      const { data: rows, error: rowsError } = await supabase
        .from("user_courses")
        .select("id, user_id, course_id, status")
        .eq("user_id", user.id);

      if (rowsError || !rows || rows.length === 0) {
        setCourses([]);
        setLoading(false);
        return;
      }

      const userCourses: UserCourseRow[] = rows as UserCourseRow[];

      // 3️⃣ Mapear cursos a nuestro modelo base (SIN entregas aún)
      const baseCourses = userCourses
        .map((row) => {
          const def = COURSE_DEFS[row.course_id];
          if (!def) return null;
          return {
            courseId: row.course_id,
            titulo: def.titulo,
            nivel: def.nivel,
            slug: def.slug,
            status: row.status,
            deliveryCourseId: def.deliveryCourseId,
            hasDelivery: false,
            lastDeliveryAt: null as string | null,
          };
        })
        .filter((c): c is CampusCourse => c !== null);

      if (baseCourses.length === 0) {
        setCourses([]);
        setLoading(false);
        return;
      }

      // 4️⃣ Pedir a Supabase las entregas del usuario para esos cursos
      const deliveryCourseIds = Array.from(
        new Set(baseCourses.map((c) => c.deliveryCourseId))
      );

      let deliveriesByCourse = new Map<string, DeliveryRow[]>();

      if (deliveryCourseIds.length > 0) {
        const { data: deliveriesData, error: deliveriesError } =
          await supabase
            .from("deliveries") // ⬅ tu tabla real
            .select("course_id, created_at")
            .eq("user_id", user.id)
            .in("course_id", deliveryCourseIds);

        if (!deliveriesError && deliveriesData) {
          (deliveriesData as DeliveryRow[]).forEach((d) => {
            const list = deliveriesByCourse.get(d.course_id) ?? [];
            list.push(d);
            deliveriesByCourse.set(d.course_id, list);
          });
        }
      }

      // 5️⃣ Mezclar cursos + estado de entrega
      const coursesWithDeliveries: CampusCourse[] = baseCourses.map((course) => {
        const deliveries = deliveriesByCourse.get(course.deliveryCourseId) ?? [];
        if (deliveries.length === 0) {
          return {
            ...course,
            hasDelivery: false,
            lastDeliveryAt: null,
          };
        }

        // coger la última entrega por fecha
        const last = [...deliveries].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )[0];

        return {
          ...course,
          hasDelivery: true,
          lastDeliveryAt: last.created_at,
        };
      });

      setCourses(coursesWithDeliveries);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const hasCourses = courses.length > 0;

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto">
        <p className="p-4">Cargando campus...</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto space-y-6">
      {/* Cabecera */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif">Campus Esparto Ibero IA</h1>
          {userEmail && (
            <p className="text-sm text-neutral-700">
              Sesión iniciada como <strong>{userEmail}</strong>
            </p>
          )}
        </div>

      <div className="flex flex-col items-end gap-2">
          {/* Enlaces solo si hay cursos activos */}
          {hasCourses && (
            <div className="flex gap-4 text-sm">
              <Link
                href="/campus/sala-virtual"
                className="underline text-neutral-700 hover:text-neutral-900"
              >
                Ir a la sala virtual
              </Link>
              <Link
                href="/campus/comunidad"
                className="underline text-neutral-700 hover:text-neutral-900"
              >
                Ir a la comunidad
              </Link>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-xs underline text-neutral-700"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Bloque de cursos */}
      <section className="rounded-xl border border-[#E9E1D8] bg-[#F5EFE7] px-4 py-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
          Tus cursos activos
        </h2>

        {!hasCourses ? (
          <p className="mt-2 text-sm text-neutral-700">
            Todavía no tienes cursos activos. Cuando te apuntes a un curso,
            aparecerá aquí para que puedas acceder rápidamente a todo el
            contenido.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {courses.map((course) => (
              <li
                key={course.courseId}
                className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white/90 p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="font-semibold">{course.titulo}</div>
                  <div className="text-xs text-neutral-600">
                    {course.nivel} ·{" "}
                    {course.status === "premium"
                      ? "Acceso premium"
                      : "Acceso estándar"}
                  </div>

                  {/* Estado de la entrega */}
                  <div className="text-xs text-neutral-700">
                    {course.hasDelivery && course.lastDeliveryAt ? (
                      <span>
                        ✅ Entrega enviada el{" "}
                        {new Date(
                          course.lastDeliveryAt
                        ).toLocaleString("es-ES", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </span>
                    ) : (
                      <span>📌 Entrega pendiente</span>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/campus/sala-virtual"
                    className="rounded-xl bg-[#6E8B3D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#5c7432]"
                  >
                    Ir a la sala virtual
                  </Link>
                  <Link
                    href="/campus/comunidad"
                    className="rounded-xl border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-[#E9E1D8]"
                  >
                    Ir a la comunidad
                  </Link>
                  <Link
                    href={ENTREGA_BASE_PATH}
                    className="rounded-xl border border-[#6E8B3D] px-3 py-2 text-xs font-semibold text-[#6E8B3D] hover:bg-[#F5EFE7]"
                  >
                    {course.hasDelivery
                      ? "Ver / actualizar entrega"
                      : "Entregar práctica"}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
