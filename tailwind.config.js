/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2fbf0',
          100: '#e1f7dd',
          200: '#c5efbd',
          300: '#9bdf90',
          400: '#83d026', // FruitSabzi signature green
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        accent: {
          amber: '#f59e0b',
          red: '#ef4444',
          coral: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'hover': '0 10px 25px -5px rgba(22, 163, 74, 0.15), 0 8px 10px -6px rgba(22, 163, 74, 0.1)',
      }
    },
  },
  plugins: [],
}

