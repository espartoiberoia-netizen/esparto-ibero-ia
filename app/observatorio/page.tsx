'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { fetchPreciosObservatorio, PrecioData } from '@/lib/supabase';

const ORDEN_TIPOS = [
  'Crudo en rama',
  'Crudo machacado',
  'Cocido entero',
  'Cocido machacado'
];

export default function ObservatorioPage() {
  const [precios, setPrecios] = useState<PrecioData[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const data = await fetchPreciosObservatorio();
      setPrecios(data);
      setCargando(false);
    }
    cargar();
  }, []);

  const preciosValidos = precios.filter(p => !p.excluido && p.precio_normalizado_kg > 0);
  
  const statsPorTipo = ORDEN_TIPOS.map(tipoNombre => {
    const items = preciosValidos.filter(p => p.tipo_esparto.toLowerCase().includes(tipoNombre.split(' ')[0].toLowerCase()));
    const promedio = items.length > 0 
      ? parseFloat((items.reduce((a, b) => a + b.precio_normalizado_kg, 0) / items.length).toFixed(2))
      : 0;
    
    let label = tipoNombre;
    if (tipoNombre === 'Crudo en rama') label = 'Crudo Entero';

    return { tipo: label, promedio };
  }).filter(s => s.promedio > 0);

  const datosTabla = [...precios].sort((a, b) => {
    const idxA = ORDEN_TIPOS.findIndex(t => a.tipo_esparto.includes(t.split(' ')[0]));
    const idxB = ORDEN_TIPOS.findIndex(t => b.tipo_esparto.includes(t.split(' ')[0]));
    if (idxA !== idxB) return idxA - idxB;
    return a.precio_normalizado_kg - b.precio_normalizado_kg;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-8 font-sans text-neutral-900 bg-[#FAF6F1] min-h-screen">
      {/* HEADER - OPTIMIZADO MÓVIL */}
      <section className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#4A3B28] mb-2 leading-tight">Observatorio de Precios Esparto Ibero IA</h1>
            <p className="text-sm md:text-base text-neutral-600 font-medium">Índice técnico de mercado • Abril 2026</p>
          </div>
          <Link href="/" className="w-full md:w-auto px-4 py-3 bg-white rounded-xl shadow-sm border border-[#E9E1D8] text-center text-sm font-bold text-[#6E8B3D] hover:bg-[#6E8B3D] hover:text-white transition-all">
            ← VOLVER AL PANEL
          </Link>
        </div>
        
        {/* KPIs - REJILLA ADAPTATIVA */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {statsPorTipo.map((s) => (
            <div key={s.tipo} className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border-l-4 border-[#6E8B3D] border-[#E9E1D8] border-y border-r">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#B8A896] mb-1 md:mb-2 font-black">{s.tipo}</p>
              <p className="text-xl md:text-3xl font-serif text-[#4A3B28]">€{s.promedio}<span className="text-[10px] md:text-sm text-neutral-400 font-sans ml-1">/kg</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* GRÁFICO - ALTURA AJUSTADA PARA MÓVIL */}
      <section className="grid gap-6 lg:grid-cols-3 mb-10">
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl border border-[#E9E1D8] shadow-sm">
          <h2 className="text-lg md:text-xl font-serif mb-6 text-[#4A3B28] border-b border-[#FAF6F1] pb-4">Distribución (€ / Kilo)</h2>
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
                    formatter={(val: number) => `€${val}`}
                    style={{ fill: '#4A3B28', fontSize: '11px', fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INFO METODOLOGÍA - OCULTA ALGUNOS DETALLES EN MÓVIL PARA AHORRAR ESPACIO */}
        <div className="bg-[#4A3B28] p-6 md:p-8 rounded-3xl text-white shadow-xl">
          <h2 className="text-xl font-serif mb-6 text-[#E9E1D8]">Metodología Ibero-IA</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-xl">⚖️</span>
              <div>
                <p className="font-bold text-sm">Precios €/Kg Reales</p>
                <p className="text-[11px] text-[#B8A896]">Normalizamos todos los formatos (manojo, fardo) para comparar manzanas con manzanas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-xl">🔍</span>
              <div>
                <p className="font-bold text-sm">Dato Verificado</p>
                <p className="text-[11px] text-[#B8A896]">Auditamos facturas y webs para que el artesano no pague de más.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LISTADO DE PRECIOS - TABLA PARA DESKTOP / TARJETAS PARA MÓVIL */}
      <section className="bg-white p-5 md:p-8 rounded-3xl border border-[#E9E1D8] shadow-sm">
        <h2 className="text-xl md:text-2xl font-serif text-[#4A3B28] mb-6">Listado Comparativo (€/kg)</h2>

        {cargando ? (
          <div className="py-20 text-center animate-pulse text-neutral-400 text-sm">Cargando base de precios...</div>
        ) : (
          <>
            {/* VISTA DESKTOP (TABLA) - Se oculta en móvil */}
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
                  {datosTabla.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF6F1]/80 transition-colors">
                      <td className="py-4 text-sm font-bold text-[#4A3B28]">{item.tipo_esparto}</td>
                      <td className="py-4 text-xs text-neutral-500 italic">{item.formato}</td>
                      <td className="py-4 text-xs text-neutral-500">{item.zona}</td>
                      <td className="py-4 text-right font-serif text-xl text-[#6E8B3D]">€{item.precio_normalizado_kg?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VISTA MÓVIL (TARJETAS) - Solo se ve en móvil */}
            <div className="md:hidden space-y-3">
              {datosTabla.map((item) => (
                <div key={item.id} className="bg-[#FAF6F1]/50 p-4 rounded-2xl border border-[#E9E1D8]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs font-bold text-[#4A3B28] uppercase tracking-wider">{item.tipo_esparto}</p>
                      <p className="text-[10px] text-neutral-500">{item.zona}</p>
                    </div>
                    <p className="text-lg font-serif text-[#6E8B3D] font-bold">€{item.precio_normalizado_kg?.toFixed(2)}/kg</p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] border-t border-[#E9E1D8] pt-2 mt-2">
                    <span className="text-neutral-400 italic">Vendido en: {item.formato}</span>
                    <span className="bg-white px-2 py-0.5 rounded-full border border-[#E9E1D8] text-[9px] font-bold">{item.fuente_tipo}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="mt-12 text-center text-[9px] text-[#B8A896] uppercase tracking-[0.3em] pb-8">
        Esparto Ibero IA © 2026 • Móvil v1.1
      </footer>
    </main>
  );
}
