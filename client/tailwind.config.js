/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#abc0c9',
        secondary: '#1e3745', 
        pastelGreen: '#a8d5ba',
      },
      backgroundImage: {
        pastelGreenGradient: 'linear-gradient(to top, #a8d5ba, #ffffff)',
      }
    },
  },
  variants: {},
  plugins: [],
}

