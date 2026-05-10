// lib/supabase.ts - Conexión principal de Supabase para Esparto Ibero IA
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PrecioData {
  id: number;
  tipo_esparto: string;
  zona: string;
  formato: string;
  precio_original: number;
  precio_normalizado_kg: number;
  fecha: string;
  fuente_tipo: string;
  excluido?: boolean;
}

/**
 * Obtiene los meses disponibles en el índice
 */
export async function fetchIndiceMensual() {
  const { data, error } = await supabase
    .from('indice_mensual')
    .select('*')
    .eq('estado', 'publicado')
    .order('anio', { ascending: false })
    .order('mes', { ascending: false });

  if (error) {
    console.error('Error fetching indice:', error);
    return [];
  }
  return data;
}

/**
 * Obtiene los precios para un informe específico
 */
export async function fetchPreciosObservatorio(indiceId?: number) {
  let query = supabase
    .from('precios')
    .select(`
      id,
      precio_original,
      precio_normalizado_kg,
      fecha,
      excluido_calculo,
      indice_mensual_id,
      tipos_esparto (nombre),
      zonas_geograficas (provincia),
      formatos_venta (nombre),
      fuentes (tipo)
    `);

  if (indiceId) {
    query = query.eq('indice_mensual_id', indiceId);
  } else {
    // Si no hay ID, traer lo más reciente por defecto
    query = query.order('fecha', { ascending: false }).limit(50);
  }

  const { data, error } = await query.order('precio_normalizado_kg', { ascending: true });

  if (error) {
    console.error('Error fetching precios:', error);
    return [];
  }

  return (data || []).map((item: any) => ({
    id: item.id,
    tipo_esparto: item.tipos_esparto?.nombre || 'Desconocido',
    zona: item.zonas_geograficas?.provincia || 'Nacional',
    formato: item.formatos_venta?.nombre || 'Unidad',
    precio_original: item.precio_original,
    precio_normalizado_kg: item.precio_normalizado_kg,
    fecha: item.fecha,
    fuente_tipo: item.fuentes?.tipo || 'directo',
    excluido: item.excluido_calculo,
    indice_mensual_id: item.indice_mensual_id
  }));
}
