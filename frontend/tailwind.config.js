/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      roboto:['Roboto', 'sans-serif'],
      charter:['Charter', 'sans-serif'],
      dmSerifDisplay:['DM Serif Display', 'serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
}

