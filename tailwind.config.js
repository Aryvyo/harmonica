/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['FreeSans', 'Helvetica', 'Arial', 'sans-serif']
    }},
  },
  plugins: [],
}
