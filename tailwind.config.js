/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#222932',
        secondary: '#5A7889',
        accent: '#F2F2F2',
        orange: '#F85606',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
