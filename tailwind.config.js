/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,html}"
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
      'serif': ['"Playfair Display"', 'serif']
    },
    extend: {},
  },
  plugins: [],
}

