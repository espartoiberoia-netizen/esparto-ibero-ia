---
description: Protocolo exhaustivo de cierre de sesión para la web principal de Esparto Ibero IA. Verifica seguridad, limpia la caja de arena y lanza la versión final a producción en Vercel.
---

# /final-esparto-ibero — Cierre Magistral de Esparto Ibero IA

Este workflow consolida todo tu trabajo en vivo en el proyecto The Esparto Ibero IA. Garantiza que nada se pierde y que la web pública de tus clientes esté 100% impecable.

## Pasos

### 1. Estado de la Carpeta Local
// turbo
```bash
git status
```
Mostramos los archivos editados para que Juanma los valide antes del empujón (Push). Si hay archivos `.tmp`, `.pdf` (que no sean de la web) o basurilla en `public/`, avisarlo antes de comprometer los cambios.

### 2. Saneamiento de Caché y Logs
// turbo
```bash
python -c "
import os, glob
basura = glob.glob('public/*.tmp') + glob.glob('npm-debug.log') + glob.glob('.DS_Store')
es_peligroso = False
for b in basura:
    print(f'🗑️ Basura encontrada: {b}')
    es_peligroso = True
    
if not es_peligroso:
    print('✅ El proyecto está limpio como una patena.')
"
```

### 3. Check de Seguridad (Stripe / Supabase)
Si durante la sesión se han editado páginas de pagos o de usuarios, verificar:
- Que no haya API Keys expuestas por error en archivos `.tsx`.
// turbo
```bash
python -c "
import os, glob
archivos_peligrosos = []
for file in glob.glob('**/*.tsx', recursive=True):
    if 'node_modules' in file: continue
    with open(file, 'r', encoding='utf-8', errors='ignore') as f:
        texto = f.read()
        # Escaneo MUY básico de seguridad
        if 'sk_test_' in texto or 'sk_live_' in texto:
            archivos_peligrosos.append(file)

if archivos_peligrosos:
    print('🚨 ¡ALERTA ROJA! Posible secreto de Stripe o Supabase expuesto directamente en tu código:')
    for a in archivos_peligrosos:
        print(f'  - {a}')
else:
    print('✅ Código sin fugas evidentes de API keys duras.')
"
```

### 4. Compilación y Push a GitHub & Vercel
(Pedir permiso antes del comando)
```bash
git add .
git commit -m "Sesión Esparto Ibero - Modificaciones Completadas"
git push origin main
```

### 5. Verificación de Vercel Final
Indicarle a Juanma que puede revisar el estado de su despliegue visitando `https://espartoiberoia.com` y confirmar que todo ha subido bien y los accesos principales (como GesBO) funcionan.

```
═══════════════════════════════════════════════════
  🎓 INFORME DE CIERRE WEB — Esparto Ibero IA
═══════════════════════════════════════════════════
  1.  Sin Basura:           ✅/❌
  2.  Auditoría Claves:     ✅/❌
  3.  Sincro Github:        ✅/❌
  4.  Live Vercel:          ✅/❌
═══════════════════════════════════════════════════
  🚀 LISTO PARA DEJAR DE TRABAJAR. ¡A descansar!
═══════════════════════════════════════════════════
```
