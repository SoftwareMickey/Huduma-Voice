/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      extend: {
        animation: {
          'dot-loading': 'dotPulse 1.2s infinite',
        },
        keyframes: {
          dotPulse: {
            '0%': { backgroundColor: 'white' },
            '50%': { backgroundColor: 'blue' },
            '100%': { backgroundColor: 'blue' },
          }
        }
      }
    },
  },
  plugins: [],
}
