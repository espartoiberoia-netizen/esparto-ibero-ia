export default function SeasonalHighlight() {
  return (
    <section className="w-full">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200">
              Concurso Nacional
            </div>

            <h3 className="text-lg font-semibold">MiniEsparto</h3>

            <p className="text-sm text-neutral-700">
              Ya está disponible la página del concurso: bases, normativa y formulario para enviarnos tu opinión.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/miniesparto"
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Ver bases
            </a>

            <a
              href="/miniesparto#opinion"
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
            >
              Enviar opinión
            </a>

            <a
              href="/bases-miniesparto.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
            >
              PDF oficial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
