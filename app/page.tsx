// app/page.tsx
import { HeroCarousel } from "@/components/hero-carousel";
import SeasonalHighlight from "@/components/home/SeasonalHighlight";



export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Columna izquierda: foto viva + texto + botones */}
        <div className="space-y-6">
          {/* 🔸 Rincón vivo / foto de temporada */}
          <SeasonalHighlight />

          <h1 className="text-4xl font-serif">
            Formación en esparto que calma y conecta con la tierra
          </h1>

          <p className="text-lg max-w-2xl">
            Aprende paso a paso, a tu ritmo, con vídeos claros y materiales
            guiados. Talleres presenciales cada fin de semana en tu zona.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              className="px-4 py-2 rounded-xl bg-[#6E8B3D] text-white text-sm font-medium hover:opacity-90"
              href="/cursos-online"
            >
              Ver cursos online
            </a>
            <a
              className="px-4 py-2 rounded-xl bg-[#E9E1D8] text-sm font-medium hover:bg-[#ddcfbf]"
              href="/cursos-presenciales"
            >
              Próximos talleres
            </a>
          </div>
        </div>

        {/* Columna derecha: carrusel de fotos (solo a partir de tablet) */}
        <div className="hidden md:block">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}

