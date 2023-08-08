/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "Poppins",
      },
      colors: {
        gradient: "linear-gradient(to right bottom, #2846bf, #a271f8)",
      }
    },
  },
  plugins: [],
}

