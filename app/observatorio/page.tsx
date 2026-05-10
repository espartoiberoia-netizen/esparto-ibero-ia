import { fetchPreciosObservatorio, fetchIndiceMensual, PrecioData } from '@/lib/supabase';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const ORDEN_TIPOS = [
  'Crudo en rama',
  'Crudo machacado',
  'Cocido entero',
  'Cocido machacado'
];

export default function ObservatorioPage() {
  const [precios, setPrecios] = useState<PrecioData[]>([]);
  const [indices, setIndices] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preciosAnteriores, setPreciosAnteriores] = useState<PrecioData[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarInicial() {
      const availableIndices = await fetchIndiceMensual();
      setIndices(availableIndices);
      
      if (availableIndices.length > 0) {
        // Cargar el mes más reciente (índice 0 por el orden desc)
        const currentId = availableIndices[0].id;
        const data = await fetchPreciosObservatorio(currentId);
        setPrecios(data);

        // Intentar cargar el mes anterior para comparativa
        if (availableIndices.length > 1) {
          const prevData = await fetchPreciosObservatorio(availableIndices[1].id);
          setPreciosAnteriores(prevData);
        }
      }
      setCargando(false);
    }
    cargarInicial();
  }, []);

  const cambiarMes = async (dir: 'next' | 'prev') => {
    let newIdx = currentIndex;
    if (dir === 'next' && currentIndex > 0) newIdx--;
    if (dir === 'prev' && currentIndex < indices.length - 1) newIdx++;
    
    if (newIdx !== currentIndex) {
      setCargando(true);
      setCurrentIndex(newIdx);
      const data = await fetchPreciosObservatorio(indices[newIdx].id);
      setPrecios(data);

      // Cargar el anterior al nuevo para la comparativa
      if (newIdx + 1 < indices.length) {
        const prevData = await fetchPreciosObservatorio(indices[newIdx + 1].id);
        setPreciosAnteriores(prevData);
      } else {
        setPreciosAnteriores([]);
      }
      setCargando(false);
    }
  };

  const mesActual = indices[currentIndex] ? `${MESES[indices[currentIndex].mes - 1]} ${indices[currentIndex].anio}` : '---';
  const preciosValidos = precios.filter(p => !p.excluido && p.precio_normalizado_kg > 0);
  
  const statsPorTipo = ORDEN_TIPOS.map(tipoNombre => {
    const items = preciosValidos.filter(p => p.tipo_esparto.toLowerCase().includes(tipoNombre.split(' ')[0].toLowerCase()));
    const promedio = items.length > 0 
      ? parseFloat((items.reduce((a, b) => a + b.precio_normalizado_kg, 0) / items.length).toFixed(2))
      : 0;
    
    // Calcular variación vs mes anterior
    const itemsPrev = preciosAnteriores.filter(p => p.tipo_esparto.toLowerCase().includes(tipoNombre.split(' ')[0].toLowerCase()));
    const promedioPrev = itemsPrev.length > 0 
      ? parseFloat((itemsPrev.reduce((a, b) => a + b.precio_normalizado_kg, 0) / itemsPrev.length).toFixed(2))
      : 0;
    
    const variacion = promedioPrev > 0 ? ((promedio - promedioPrev) / promedioPrev) * 100 : 0;

    let label = tipoNombre;
    if (tipoNombre === 'Crudo en rama') label = 'Crudo Entero';

    return { tipo: label, promedio, variacion };
  }).filter(s => s.promedio > 0);

  const datosTabla = [...precios].sort((a, b) => {
    const idxA = ORDEN_TIPOS.findIndex(t => a.tipo_esparto.includes(t.split(' ')[0]));
    const idxB = ORDEN_TIPOS.findIndex(t => b.tipo_esparto.includes(t.split(' ')[0]));
    if (idxA !== idxB) return idxA - idxB;
    return a.precio_normalizado_kg - b.precio_normalizado_kg;
  });

  const scrollToTable = () => {
    const element = document.getElementById('listado-precios');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-8 font-sans text-neutral-900 bg-[#FAF6F1] min-h-screen">
      {/* HEADER */}
      <section className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#4A3B28] mb-2 leading-tight">Observatorio de Precios Esparto Ibero IA</h1>
            
            {/* NAVEGADOR DE MESES */}
            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-[#E9E1D8] shadow-sm w-fit mt-2">
              <button 
                onClick={() => cambiarMes('prev')}
                disabled={currentIndex === indices.length - 1}
                className="p-1 hover:bg-[#FAF6F1] rounded-full disabled:opacity-20 transition-colors"
                title="Mes Anterior"
              >
                <svg className="w-6 h-6 text-[#6E8B3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <p className="text-sm md:text-base text-[#4A3B28] font-black uppercase tracking-widest min-w-[140px] text-center">
                {mesActual}
              </p>

              <button 
                onClick={() => cambiarMes('next')}
                disabled={currentIndex === 0}
                className="p-1 hover:bg-[#FAF6F1] rounded-full disabled:opacity-20 transition-colors"
                title="Mes Siguiente"
              >
                <svg className="w-6 h-6 text-[#6E8B3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <Link href="/" className="w-full md:w-auto px-4 py-3 bg-white rounded-xl shadow-sm border border-[#E9E1D8] text-center text-sm font-bold text-[#6E8B3D] hover:bg-[#6E8B3D] hover:text-white transition-all">
            ← VOLVER AL PANEL
          </Link>
        </div>

        {/* AVISO IMPORTANTE AMARILLO */}
        <div className="bg-amber-100 border-2 border-amber-400 p-4 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-4 shadow-md">
          <span className="text-3xl">⚠️</span>
          <div className="flex-1 text-center md:text-left">
            <p className="font-bold text-amber-950 text-sm md:text-base uppercase tracking-tight">¡Importante! Datos del gráfico son PROMEDIOS</p>
            <p className="text-amber-800 text-xs md:text-sm">Para encontrar el <strong>PRECIO MÁS BAJO</strong> por tipo de esparto, consulta el listado detallado abajo.</p>
          </div>
          <button 
            onClick={scrollToTable}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
          >
            VER LISTADO DETALLADO ↓
          </button>
        </div>
        
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {statsPorTipo.map((s) => (
            <div key={s.tipo} className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border-l-4 border-[#6E8B3D] border-[#E9E1D8] border-y border-r relative overflow-hidden">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#B8A896] mb-1 md:mb-2 font-black">{s.tipo}</p>
              <p className="text-lg md:text-3xl font-serif text-[#4A3B28]">€{s.promedio}<span className="text-[10px] md:text-sm text-neutral-400 font-sans ml-1">/kg</span></p>
              
              {/* VARIACION KPI */}
              {s.variacion !== 0 && (
                <div className={`text-[9px] font-black mt-1 ${s.variacion > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {s.variacion > 0 ? '▲' : '▼'} {Math.abs(s.variacion).toFixed(1)}% <span className="text-[8px] text-neutral-400 font-normal">VS MES ANT.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* GRÁFICO */}
      <section className="grid gap-6 lg:grid-cols-3 mb-10">
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl border border-[#E9E1D8] shadow-sm relative">
          {cargando && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-3xl font-black text-[#6E8B3D] animate-pulse">ACTUALIZANDO DATOS...</div>}
          <h2 className="text-lg md:text-xl font-serif mb-6 text-[#4A3B28] border-b border-[#FAF6F1] pb-4">Promedio de Precios (€ / Kilo)</h2>
          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsPorTipo} margin={{ top: 30, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EAE4" />
                <XAxis 
                  dataKey="tipo" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 700, fill: '#4A3B28'}} 
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis hide />
                <Bar dataKey="promedio" radius={[8, 8, 0, 0]} barSize={40}>
                  {statsPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6E8B3D' : '#8B7355'} />
                  ))}
                  <LabelList 
                    dataKey="promedio" 
                    position="top" 
                    formatter={(val: any) => `MEDIA €${val}`}
                    style={{ fill: '#4A3B28', fontSize: '11px', fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#4A3B28] p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-col justify-center">
          <h2 className="text-xl font-serif mb-6 text-[#E9E1D8]">¿Por qué promedios?</h2>
          <div className="space-y-6">
            <p className="text-xs text-[#B8A896] leading-relaxed">
              El mercado del esparto es variable. Un fardo de 25kg suele tener un precio por kilo inferior a un manojo pequeño. 
              <strong> El gráfico suma todas las fuentes</strong> (tiendas online, ventas directas y anuncios) para darte una referencia rápida.
            </p>
            <button 
              onClick={scrollToTable}
              className="w-full py-3 bg-[#6E8B3D] hover:bg-white hover:text-[#6E8B3D] transition-all rounded-xl font-bold uppercase text-[10px] tracking-widest"
            >
              Consultar precios al detalle ↓
            </button>
          </div>
        </div>
      </section>

      {/* LISTADO COMPARATIVO */}
      <section id="listado-precios" className="bg-white p-5 md:p-8 rounded-3xl border border-[#E9E1D8] shadow-sm scroll-mt-20 relative">
        {cargando && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-3xl font-black text-[#6E8B3D] animate-pulse">CARGANDO...</div>}
        <h2 className="text-xl md:text-2xl font-serif text-[#4A3B28] mb-6">Listado Comparativo (Al Detalle)</h2>

        {!cargando && precios.length === 0 ? (
          <div className="py-20 text-center text-neutral-400 text-sm">No hay datos publicados para este mes.</div>
        ) : (
          <>
            {/* VISTA DESKTOP */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-[#FAF6F1] text-[10px] uppercase tracking-[0.2em] text-[#B8A896]">
                    <th className="pb-4 font-black">Tipo de Esparto</th>
                    <th className="pb-4 font-black">Formato</th>
                    <th className="pb-4 font-black">Zona</th>
                    <th className="pb-4 font-black text-right text-[#6E8B3D]">Precio €/kg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF6F1]">
                  {datosTabla.map((item) => {
                    const zonaFormateada = item.zona.toLowerCase() === 'nacional' ? 'nacional' : item.zona.toUpperCase();
                    const esManojo = item.formato.toLowerCase().includes('manojo');

                    return (
                      <tr key={item.id} className="hover:bg-[#FAF6F1]/80 transition-colors">
                        <td className="py-4 text-sm font-bold text-[#4A3B28]">{item.tipo_esparto}</td>
                        <td className={`py-4 text-xs italic ${esManojo ? 'font-bold text-neutral-800 not-italic' : 'text-neutral-500'}`}>
                          {item.formato}
                        </td>
                        <td className="py-4 text-[11px] font-bold tracking-wider text-neutral-600">{zonaFormateada}</td>
                        <td className="py-4 text-right font-serif text-xl text-[#6E8B3D]">€{item.precio_normalizado_kg?.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* VISTA MÓVIL */}
            <div className="md:hidden space-y-3">
              {datosTabla.map((item) => {
                const zonaFormateada = item.zona.toLowerCase() === 'nacional' ? 'nacional' : item.zona.toUpperCase();
                const esManojo = item.formato.toLowerCase().includes('manojo');
                
                return (
                  <div key={item.id} className="bg-[#FAF6F1]/50 p-4 rounded-2xl border border-[#E9E1D8]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-[#4A3B28] uppercase tracking-wider">{item.tipo_esparto}</p>
                        <p className="text-[10px] font-bold text-neutral-500 tracking-wider font-mono">{zonaFormateada}</p>
                      </div>
                      <p className="text-lg font-serif text-[#6E8B3D] font-bold">€{item.precio_normalizado_kg?.toFixed(2)}/kg</p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] border-t border-[#E9E1D8] pt-2 mt-2">
                      <span className={`${esManojo ? 'font-bold text-neutral-800' : 'text-neutral-400 italic'}`}>
                        {item.formato}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-full border border-[#E9E1D8] text-[9px] font-bold">{item.fuente_tipo}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      <footer className="mt-12 text-center text-[9px] text-[#B8A896] uppercase tracking-[0.3em] pb-8">
        Esparto Ibero IA © 2026 • Móvil v2.0 (Histórico Activo)
      </footer>
    </main>
  );
}
