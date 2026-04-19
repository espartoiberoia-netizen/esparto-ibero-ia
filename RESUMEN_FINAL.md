# 📊 Observatorio de Precios Esparto Ibero IA (v1.0)
Actualizado: 19 de abril de 2026

## 🚀 Estado de la Integración
- [x] **Base de Datos**: Cargada con los precios reales de Abril 2026 (Esparto Santo, Cuerdas Valero, CuerdaCieza, etc.).
- [x] **Conexión Lib**: Creado `lib/supabase.ts` para extraer datos en tiempo real.
- [x] **Interfaz Visual**: Creada la página `/observatorio` con gráficos interactivos y tabla de precios.
- [x] **Dependencias**: Instalando `recharts` para las gráficas.

## 📈 Resumen de Precios de Referencia (Abril)
1. **Esparto Santo (Cieza)**: 5,44 €/kg (base) | 6,00 €/kg (picado).
2. **Cuerdas Valero (Albacete)**: 4,30 €/manojo (~5,37 €/kg).
3. **CuerdaCieza (Online)**: 4,60 €/kg (fardos 25kg).
4. **Natural y Artesano**: 8,50 €/kg.

## 🛠️ Cómo Mantener el Observatorio
Cada vez que recibas un albarán o factura (como la de hoy de Cuerdas Valero):

1. **Abre el archivo `cargar_supabase.py`** en la carpeta `Esparto_Precios`.
2. **Añade el registro** en la lista `precios` con los nuevos datos.
3. **Ejecuta el script**: `python cargar_supabase.py`.
4. Los gráficos en la web se actualizarán **automáticamente** sin tocar código.

## 🔗 Acceso
La página ya está disponible localmente en:
`http://localhost:3000/observatorio` (si tienes el servidor Next.js corriendo)

---
*Este proyecto garantiza la transparencia del mercado del esparto mediante el uso de Inteligencia Artificial y datos verificados.*
