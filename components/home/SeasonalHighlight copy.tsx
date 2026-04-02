  // components/home/SeasonalHighlight.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type SeasonalHighlightConfig = {
  enabled: boolean;
  imageSrc: string;
  imageAlt: string;
  label: string;
  sublabel?: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
};

const seasonalHighlight: SeasonalHighlightConfig = {
  // Pon esto en false cuando no quieras mostrar la tarjeta
  enabled: true,

  // Ruta a tu foto dentro de /public
  imageSrc: "/seasonal/JMS_Felices_Fiestas_.jpg",
  imageAlt:
    "JMS junto al pino de esparto en Esparto Ibero IA, felicitando las fiestas.",

  // Textos
  label: "FELICES FIESTAS",
  sublabel: "Pino de Esparto",
  description: "Una celebración desde el Taller de Esparto de Humilladero.",
  linkHref: "/cursos-presenciales",
  linkLabel: "Ver talleres presenciales",
};

export function SeasonalHighlight() {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!seasonalHighlight.enabled) return null;

  const {
    imageSrc,
    imageAlt,
    label,
    sublabel,
    description,
    linkHref,
    linkLabel,
  } = seasonalHighlight;

  const openZoom = () => setIsZoomOpen(true);
  const closeZoom = () => setIsZoomOpen(false);

  return (
    <>
      {/* TARJETA PEQUEÑA EN LA HOME */}
      <div className="overflow-hidden rounded-3xl border border-[#E1D5C7] bg-[#F9F3EA] shadow-sm">
        <div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] sm:p-4">
          {/* FOTO (click para ampliar) */}
          <button
            type="button"
            onClick={openZoom}
            className="group relative h-48 w-full overflow-hidden rounded-2xl sm:h-40 focus:outline-none focus:ring-2 focus:ring-[#6E8B3D] focus:ring-offset-2 focus:ring-offset-[#F9F3EA]"
            aria-label="Ampliar foto del pino de esparto"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top transition-transform duration-200 group-hover:scale-105"
              sizes="(min-width: 768px) 260px, 100vw"
            />
            <span className="pointer-events-none absolute bottom-1 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
              Toca para ampliar
            </span>
          </button>

          {/* TEXTOS */}
          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs font-semibold tracking-wide text-[#6E8B3D]">
              {label}
            </p>

            {sublabel && (
              <p className="text-sm font-medium text-[#3F3A32]">
                {sublabel}
              </p>
            )}

            {description && (
              <p className="text-xs text-[#5F564A]">{description}</p>
            )}

            {linkHref && linkLabel && (
              <div className="mt-2">
                <Link
                  href={linkHref}
                  className="inline-flex items-center rounded-full bg-[#3F3A32] px-3 py-1 text-xs font-medium text-white hover:bg-[#2f2923]"
                >
                  {linkLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL / FOTO AMPLIADA */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4"
          aria-modal="true"
          role="dialog"
        >
          {/* Capa para cerrar al hacer click fuera */}
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Cerrar imagen ampliada"
            onClick={closeZoom}
          />

          <div className="relative z-50 w-full max-w-3xl">
            {/* Barra superior con texto + acciones */}
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-white">
              <span className="truncate">
                Taller de Esparto de Humilladero – Pino de Esparto
              </span>

              <div className="flex gap-2">
                <a
                  href={imageSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20"
                >
                  Abrir en pestaña nueva
                </a>
                <button
                  type="button"
                  onClick={closeZoom}
                  className="rounded-full bg-black/60 px-3 py-1 font-medium hover:bg-black/80"
                >
                  Cerrar
                </button>
              </div>
            </div>

            {/* Contenedor de la imagen ampliada (tamaño moderado) */}
            <div className="relative max-h-[75vh] overflow-hidden rounded-3xl bg-black">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1000}
                height={750}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
