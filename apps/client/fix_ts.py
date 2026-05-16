import os
import re

def replace_in_file(filepath, pattern, replacement):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(pattern, replacement, content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Fix ParticleCanvas.tsx
replace_in_file('src/design-system/effects/ParticleCanvas.tsx', 
                r'const draw = \(\) => \{', 
                r'const draw = () => {\n    if (!ctx) return')
replace_in_file('src/design-system/effects/ParticleCanvas.tsx', 
                r'ctx\.beginPath\(\)\n\s*ctx\.arc\(p\.x, p\.y, p\.size, 0, Math\.PI \* 2\)\n\s*ctx\.fillStyle = `\$\{p\.color\}\$\{p\.opacity\}\)`\n\s*ctx\.fill\(\)', 
                r'if (ctx) {\n        ctx.beginPath()\n        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)\n        ctx.fillStyle = `${p.color}${p.opacity})`\n        ctx.fill()\n      }')
replace_in_file('src/design-system/effects/ParticleCanvas.tsx', 
                r'ctx\.beginPath\(\)\n\s*ctx\.moveTo\(particles\[i\]\.x, particles\[i\]\.y\)\n\s*ctx\.lineTo\(particles\[j\]\.x, particles\[j\]\.y\)\n\s*ctx\.strokeStyle = `rgba\(0,229,255,\$\{alpha\}\)`\n\s*ctx\.lineWidth = 0\.5\n\s*ctx\.stroke\(\)', 
                r'if (ctx) {\n                  ctx.beginPath()\n                  ctx.moveTo(particles[i].x, particles[i].y)\n                  ctx.lineTo(particles[j].x, particles[j].y)\n                  ctx.strokeStyle = `rgba(0,229,255,${alpha})`\n                  ctx.lineWidth = 0.5\n                  ctx.stroke()\n                }')

# Fix useTypewriter.ts
replace_in_file('src/hooks/useTypewriter.ts',
                r'const timeoutRef = useRef<ReturnType<typeof setTimeout>>\(\)',
                r'const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)')

# Remove unused from Icon.tsx
replace_in_file('src/design-system/primitives/Icon.tsx', r'Zap,\n\s*', '')
replace_in_file('src/design-system/primitives/Icon.tsx', r'Stopwatch,', 'Timer as Stopwatch,')

# Remove unused from LiveAudio.tsx
replace_in_file('src/pages/app/LiveAudio.tsx', r'import \{ useState, useRef, useEffect, useCallback \} from \'react\'', 'import { useState, useRef, useEffect } from \'react\'')

# Remove unused from NeuralReply.tsx
replace_in_file('src/pages/app/NeuralReply.tsx', r'const activePersona = usePersonaStore\(s => s\.activePersonaId\)\n\s*', '')

# Remove unused from NodeCommand.tsx
replace_in_file('src/pages/app/NodeCommand.tsx', r'const STATUS_COLOR: Record<NodeStatus, string> = \{\n\s*active: \'var\(--green\)\',\n\s*idle:   \'var\(--txt3\)\',\n\s*error:  \'var\(--red\)\',\n\}\n', '')

# Remove unused from PersonaDetail.tsx
replace_in_file('src/pages/app/PersonaDetail.tsx', r'ProgressBar, ', '')

# Remove unused from Personas.tsx
replace_in_file('src/pages/app/Personas.tsx', r'PulseDot, ', '')
replace_in_file('src/pages/app/Personas.tsx', r'const \[filter, setFilter\] = useState\(\'all\'\)\n\s*', '')

# Remove unused from ShadowArchive.tsx
replace_in_file('src/pages/app/ShadowArchive.tsx', r'Button ', '')
replace_in_file('src/pages/app/ShadowArchive.tsx', r'filtered\.map\(\(o, i\) =>', 'filtered.map((o) =>')

# Remove unused from SignalFeed.tsx
replace_in_file('src/pages/app/SignalFeed.tsx', r' Icon ', '')
replace_in_file('src/pages/app/SignalFeed.tsx', r'\{ Icon \}', '') # if it's `{ Icon }`

# Remove unused from SystemTelemetry.tsx
replace_in_file('src/pages/app/SystemTelemetry.tsx', r' PulseDot ', '')

# Remove unused from NotFound.tsx
replace_in_file('src/pages/public/NotFound.tsx', r'useRef<number>\(\)', 'useRef<number>(0)')

# Remove unused from Register.tsx
replace_in_file('src/pages/public/Register.tsx', r'Chip, ', '')

# Fix router ReactElement unused
replace_in_file('src/router/index.tsx', r'import \{ lazy, Suspense, type ReactElement \} from \'react\'', 'import { lazy, Suspense } from \'react\'')
replace_in_file('src/router/index.tsx', r'const wrap = \(element: ReactElement\)', 'const wrap = (element: React.ReactNode)')

print("Fixes applied.")
