// components/cookie-banner.tsx
"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("cookie-consent");
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie-consent", "accepted");
    }
    setVisible(false);
  };

  const handleReject = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie-consent", "rejected");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="max-w-xl rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-lg text-sm text-neutral-800">
        <p className="mb-3">
          En Esparto Ibero IA utilizamos cookies técnicas para que la web
          funcione correctamente y, opcionalmente, cookies de analítica para
          mejorarla. Puedes aceptarlas o rechazarlas.
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <a
            href="/cookies"
            className="text-xs underline decoration-dotted mr-auto"
          >
            Más información
          </a>
          <button
            onClick={handleReject}
            className="rounded-xl border border-neutral-300 px-3 py-1 text-xs"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="rounded-xl bg-[#6E8B3D] px-3 py-1 text-xs text-white"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
