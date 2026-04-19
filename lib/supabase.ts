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
 * Obtiene los precios agregados para el observatorio
 */
export async function fetchPreciosObservatorio() {
  const { data, error } = await supabase
    .from('precios')
    .select(`
      id,
      precio_original,
      precio_normalizado_kg,
      fecha,
      excluido_calculo,
      tipos_esparto (nombre),
      zonas_geograficas (provincia),
      formatos_venta (nombre),
      fuentes (tipo)
    `)
    .order('precio_normalizado_kg', { ascending: true }); // Orden base por precio

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
    excluido: item.excluido_calculo
  }));
}
