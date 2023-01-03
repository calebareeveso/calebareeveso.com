/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A3A3A",
        secondary: "#000000",
        primaryGray: "#FAFAFA",
        secondaryGray: "#E0E0E0",
      },
    },
  },
  plugins: [],
};
