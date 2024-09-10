/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#D9D9D9',
      },
      fontFamily: {
        'inria-serif': ['"Inria Serif"', 'serif'],
        'inika': ['"Inika"']
      },
    },
  },
  plugins: [],
}