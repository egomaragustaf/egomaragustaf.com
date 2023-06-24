/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./about/**/*.{html,js}",
    "./contact/**/*.{html,js}",
    "./dist/js/**/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'box': 'url(/dist/assets/background/bg-pattern.png)',
      }
    },
  },
  plugins: [],
}

