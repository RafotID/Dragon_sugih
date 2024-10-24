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
        'custom-div':'#222831',

        'gradienA':'#97908A',
        'gradienM':'#7C7D7C',
        'gradienB':'#817F7D',

        'gradien1':'#FF6E33',
        'gradien2':'#FF8733',
        'gradien3':'#FFB80B',

        'gradienApi1':'#8B0000',
        'gradienApi2':'#FF0000',
        'gradienApi3':'#FFD700',

        'gradienApik1':'#00008B',
        'gradienApik2':'#0000FF',
        'gradienApik3':'#00FFFF',

        'custom-number-magic':'#92DBFF',
        'custom-number-healt':'#FF90BC',
        'custom-number-physical':'#D27C2C',
        'custom-number-heal':'#2E7D32',
        'custom-number-dev':'#84B0C1',
        'custom-number-air': '#92DBFF',

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
        'jua': ['"jua"'],
        'Just-Another-Hand': ['"Just Another Hand"','Just','Another','Hand']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}