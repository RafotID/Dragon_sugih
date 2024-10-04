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
        'custom-grey-text': '#FBF8D1',
        'papanText': '#303938',

        'custom-green-bg': '#E0FFFF',
        'custom-linier-1': '#3F5256',
        'custom-linier-2': '#858C90',
        'custom-linier-3': '#323F47',
        'custom-linier-4': '#ACACAC',
        'custom-linier-5': '#737373',

        'custom-green-text': '#234F5C',
        'custom-green-text-Signup': '#C0D5D3',
        'custom-green-signup': '#315661',
        'custom-green': '#537577',
        'custom-green-singnin&signup': '#52807F',

        'custom-blue-buuton': '#1A2E96',
        'custom-bg-info': '#3D3E38'
      },
      fontFamily: {
        'inria-serif': ['"Inria Serif"', 'serif'],
        'inika': ['"Inika"'],
        'itim': ['"Itim"'],
        'inter': ['"Inter"'],
        'poppins': ['"Poppins"'],
        'nosifer': ['"Nosifer"'],
        'jomhuria': ['"Jomhuria"'],
        'girassol': ['"Girassol"'],
        'jua': ['"jua"']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}