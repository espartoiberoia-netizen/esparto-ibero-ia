// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";

export const metadata = {
  title: "Esparto Ibero IA",
  description: "Formación en esparto que calma y conecta con la tierra",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#FAF6F1] text-[#2E2A27] flex flex-col">
        <Navbar />
        <main className="mx-auto flex-1 max-w-6xl px-4 py-8">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
