// components/hero-carousel.tsx
"use client";

import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    src: "/images/Hero_Logo_Esparto_Ibero_IA.png",
    alt: "Nuestra marca.",
  },
  {
    src: "/images/Hero_Canasto_Huevos_AR_nb.png",
    alt: "Trabajo terminado del taller por nuestro alumno AR.",
  },
  {
    src: "/images/Hero_Escritorio_Contacto_EIIA2.jpg",
    alt: "Contacta para estar en el taller presencial de esparto o en el CAMPUS.",
  },
  {
    src: "/images/Hero_LIBES.png",
    alt: "LIBES. Nuestro editor IA  .",
  },
];

const INTERVALO_MS = 3500;

export function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(SLIDES);
  const [index, setIndex] = useState(0);

  // Mezclamos las fotos SOLO en el cliente, después de hidratar
  useEffect(() => {
    setSlides((prev) => [...prev].sort(() => Math.random() - 2.8  ));
  }, []);

  // Cambio automático de foto
  useEffect(() => {
    if (slides.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, INTERVALO_MS);

    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[index] ?? slides[0];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E9E1D8] bg-[#E9E1D8]">
      <div
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-700"
        style={{ backgroundImage: `url(${current.src})` }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-black/35 px-3 py-2 text-[11px] text-white">
        {current.alt}
      </div>
    </div>
  );
}
