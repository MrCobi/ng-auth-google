/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production', // Purgar solo en producción
    content: [
      "./src/**/*.{html,ts}", // Rutas de los archivos
    ],
  },
}

