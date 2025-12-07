import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        medieval: ['var(--font-medieval)', 'serif'],
      },
      colors: {
        dnd: {
          red: '#8B0000',
          gold: '#D4AF37',
          dark: '#1a1a1a',
          parchment: '#f4e4bc',
          parchmentDark: '#d4c19a',
          brown: '#8b4513',
          brownLight: '#a0522d',
        },
      },
      backgroundImage: {
        'parchment': 'linear-gradient(135deg, #f4e4bc 0%, #e8d5a3 50%, #d4c19a 100%)',
        'parchment-old': 'linear-gradient(135deg, #e8d5a3 0%, #d4c19a 50%, #c4a882 100%)',
        'parchment-dark': 'linear-gradient(135deg, #2a1f14 0%, #1f1810 50%, #1a140e 100%)',
        'parchment-old-dark': 'linear-gradient(135deg, #1f1810 0%, #1a140e 50%, #15100a 100%)',
      },
    },
  },
  plugins: [],
}
export default config

