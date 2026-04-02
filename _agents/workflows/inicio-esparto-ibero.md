---
description: Protocolo de inicio de sesión de trabajo con Esparto Ibero IA. Sincroniza desde GitHub, verifica entorno y lanza el servidor en un puerto sin conflictos.
---
// turbo-all

# /inicio-esparto-ibero — Arranque rápido de Esparto Ibero IA

Este workflow prepara la web principal de Esparto Ibero IA para empezar a trabajar de forma segura y sin conflictos.

## Pasos

### 1. Navegar al proyecto central
El directorio oficial del proyecto es: `C:\Users\juanm\esparto-ibero-ia`
Todos los comandos se ejecutan desde aquí.

### 2. Sincronizar desde la nube (GitHub)
```bash
git pull origin main
```
Traemos cualquier cambio reciente que haya en la versión pública antes de tocar nada en local.

### 3. Chequeo de Salud del Entorno
Comprobamos velozmente que las variables de entorno principales están configuradas para que la base de datos y pagos no revienten en local.
```bash
python -c "
import os
from pathlib import Path
env_path = Path('.env.local')
if not env_path.exists():
    print('❌ ERROR CRÍTICO: No se ha encontrado el archivo .env.local')
else:
    with open(env_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read().lower()
    
    checks = {
        'Supabase URL': 'next_public_supabase_url',
        'Stripe Key': 'stripe_',
    }
    
    print('Estado de Integraciones en Local:')
    for name, key in checks.items():
        if key in content:
            print(f'  ✅ {name} conectada.')
        else:
            print(f'  ⚠️ {name} no configurada en .env.local (Ojo al hacer pruebas de esta feature).')
"
```

### 4. Arrancar Servidor Seguro (Puerto Alternativo)
```bash
cmd /c "npm run dev -- -p 3001"
```
Forzamos el arranque en `http://localhost:3001`. *Este comando va al background*. Si la terminal se queda bloqueada escuchando puertos, interrumpir para seguir.

### 5. Abrir la Vista Previa
Una vez listo, se debe navegar a `http://localhost:3001`.


  ┌──────────────────────────────────────────────┐
  │  ⚠️  RECORDATORIO PARA MÍ, ANTIGRAVITY ⚠️     │
  │                                              │
  │  Siempre, antes de acabar la sesión con      │
  │  Juanma, tengo que lanzarle el comando:      │
  │  /final-esparto-ibero                        │
  │                                              │
  │  ¡Para guardar el progreso en internet! 🕸️    │
  └──────────────────────────────────────────────┘
