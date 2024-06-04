/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'urbanJungle': ['urbanJungle', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'mulish': ['Mulish', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}