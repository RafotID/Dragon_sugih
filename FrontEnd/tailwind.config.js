/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#AFB3B1',
        'custom-grey-border': '#928B86',
        'custom-grey-input': '#A09E9E',

        'custom-green-bg': '#E0FFFF',
        'custom-green-text': '#234F5C',
        'custom-green-text-Signup': '#C0D5D3',
        'custom-green-signup': '#315661',
        'custom-green': '#537577',
        'custom-green-singnin&signup': '#52807F',

        'custom-buton-tolak': '#B06A4E',
        'custom-buton-trima': '#5920B5',
      },
      fontFamily: {
        'inria-serif': ['"Inria Serif"', 'serif'],
        'inika': ['"Inika"'],
        'itim' : ['"Itim"'],
        'inter' : ['"Inter"'],
        'poppins' : ['"Poppins"']
      },
    },
  },
  plugins: [],
}