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
        'custom-black': '#2F4F4F',
        'custom-green': '#537577',
        'custom-buton-tolak': '#B06A4E',
        'custom-buton-trima': '#5920B5',
      },
      fontFamily: {
        'inria-serif': ['"Inria Serif"', 'serif'],
        'inika': ['"Inika"'],
        'itim' : ['"Itim"'],
        'inter' : ['"Inter"']
      },
    },
  },
  plugins: [],
}