/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Finnova Sunset Pastel
        pastel: {
          50: '#fffbf5',    // Marfil suave / canvas modo claro
          100: '#fff4e6',   // Crema melocotón muy sutil
          200: '#fed7aa',   // Naranja pastel suave / bordes y tags
          300: '#fdba74',   // Naranja pastel puro / acento hero
          400: '#fb923c',   // Albaricoque cálido / métricas secundarias
          500: '#f97316',   // Naranja sunset vivo / métricas primarias y CTAs
          600: '#ea580c',   // Naranja oscuro de alto contraste
          700: '#c2410c',   // Terracota tostado
        },
        obsidian: {
          950: '#090d16',   // Fondo oscuro ultra profundo
          900: '#0f172a',   // Pizarra ejecutivo
          850: '#162032',   // Card background modo oscuro
          800: '#1e293b',   // Bordes y separadores oscuros
          700: '#334155',
          600: '#475569',
          400: '#94a3b8',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        coral: {
          light: '#ffe4e6',
          DEFAULT: '#f43f5e',
          dark: '#be123c',
        },
        mint: {
          light: '#d1fae5',
          DEFAULT: '#10b981',
          dark: '#047857',
        }
      },
      boxShadow: {
        'sunset': '0 10px 25px -5px rgba(251, 146, 60, 0.12), 0 8px 10px -6px rgba(251, 146, 60, 0.08)',
        'sunset-glow': '0 0 20px rgba(253, 186, 116, 0.35)',
        'card-soft': '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      }
    },
  },
  plugins: [],
};
