/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void:    '#040810',
        deep:    '#070d1f',
        surface: '#0c1627',
        cyan:    '#00e5ff',
        violet:  '#7c3aed',
        amber:   '#f59e0b',
        green:   '#34d399',
        red:     '#f87171',
        txt:     '#e2e8f0',
        txt2:    '#94a3b8',
        txt3:    '#475569',
      },
      fontFamily: {
        disp: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '14px',
        xl:   '20px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        'neural': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
