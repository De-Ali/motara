import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        brand: {
          50:  '#E8F1F4',
          100: '#C7DDE3',
          200: '#9DC4CE',
          300: '#6FA7B5',
          400: '#3D8A9E',
          500: '#16707F',
          600: '#0F4C5C',
          700: '#0B3A47',
          800: '#082B35',
          900: '#051C23'
        },
        accent: {
          50:  '#FDEDDC',
          100: '#FBD6AB',
          200: '#F8B770',
          300: '#F3963F',
          400: '#EE7C25',
          500: '#E36414',
          600: '#BB4F0E',
          700: '#8E3C0B',
          800: '#5F2807',
          900: '#321503'
        },
        success: '#2D6A4F',
        danger:  '#C1463B',
        warn:    '#D9A300',
        surface: {
          light: '#F8F7F4',
          dark:  '#0E1419'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        ar:   ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '12px',
        '2xl': '18px',
        '3xl': '24px'
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(15,76,92,0.18)',
        card: '0 2px 10px -2px rgba(15,76,92,0.10), 0 8px 24px -12px rgba(15,76,92,0.08)',
        glow: '0 0 0 4px rgba(227,100,20,0.18)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 40px -12px rgba(0,0,0,0.30)'
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at top, rgba(15,76,92,0.10), transparent 60%)',
        'hero-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(227,100,20,0.15), transparent 70%), radial-gradient(50% 50% at 100% 100%, rgba(15,76,92,0.18), transparent 70%)',
        'noise': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'shine': 'shine 2.4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.6s cubic-bezier(0,0,0.2,1) infinite'
      }
    }
  },
  plugins: []
};

export default config;
