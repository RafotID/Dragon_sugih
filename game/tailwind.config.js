/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inria-serif': ['"Inria Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}