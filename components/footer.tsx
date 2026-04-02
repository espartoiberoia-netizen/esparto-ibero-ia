// components/footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#E9E1D8] bg-[#FAF6F1]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-neutral-700 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-sm">Esparto Ibero IA</p>
          <p>
            Juan Manuel Suárez Rivas · Humilladero (Málaga)  · España
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/aviso-legal" className="hover:underline">
            Aviso legal
          </Link>
          <Link href="/privacidad" className="hover:underline">
            Privacidad
          </Link>
          <Link href="/cookies" className="hover:underline">
            Cookies
          </Link>

          <Link href="/condiciones" className="hover:underline">
            Condiciones del campus
          </Link>

          <a
            href="mailto:espartoiberoia@gmail.com"
            className="hover:underline"
          >
            Contacto: espartoiberoia@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
