/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#06040f',
        surface: '#0d0a1a',
        neon: '#b44fff',
        neon2: '#ff2cf1',
        neon3: '#4ff8d2',
        gold: '#ffd166',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}