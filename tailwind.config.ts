import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FAF5EA',
          200: '#F4E7CC',
          300: '#EDD8AD',
          400: '#E4C585',
          500: '#D4AF37', // Luxury Champagne Gold
          600: '#B89428',
          700: '#91721C',
          800: '#6E5515',
          900: '#4A370D',
        },
        obsidian: {
          950: '#0A0A0A',
          900: '#121212',
          850: '#181818',
          800: '#222222',
          700: '#2F2F2F',
          600: '#404040',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FCFAF7',
          200: '#F8F4EE',
          300: '#F0E8DC',
          400: '#E5D8C5',
        },
        amberGold: {
          DEFAULT: '#E0A96D',
          dark: '#C88A4E',
          light: '#F2C898',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(212, 175, 55, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'luxury-gold': '0 0 25px rgba(212, 175, 55, 0.25)',
        'luxury-dark': '0 20px 50px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #F4E7CC 0%, #D4AF37 50%, #B89428 100%)',
        'dark-gold-gradient': 'linear-gradient(135deg, #1E1A14 0%, #121212 100%)',
      }
    },
  },
  plugins: [],
};
export default config;
