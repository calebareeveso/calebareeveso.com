/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
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
