export default function MiniEspartoBasesPage() {
  const pdf = "/bases-miniesparto.pdf";

  return (
    <main className="fixed inset-0 bg-neutral-100">
      <div className="fixed left-4 top-4 z-50 flex flex-wrap gap-2">
        <a
          href="/miniesparto"
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow border border-neutral-200 hover:bg-neutral-50"
        >
          ← Volver
        </a>

        <a
          href={pdf}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
        >
          Abrir en nueva pestaña
        </a>

        <a
          href={pdf}
          download
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow border border-neutral-200 hover:bg-neutral-50"
        >
          Descargar PDF
        </a>
      </div>

      <iframe
        src={pdf}
        title="Bases MiniEsparto PDF"
        style={{ width: "100vw", height: "100vh", border: 0, display: "block" }}
      />
    </main>
  );
}
