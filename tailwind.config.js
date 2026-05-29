/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        panel: '#111111',
        panel2: '#0E0E0E',
        blue: {
          DEFAULT: '#1E50FF',
          bright: '#3A78FF',
          deep: '#0A2BCC',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        cond: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
