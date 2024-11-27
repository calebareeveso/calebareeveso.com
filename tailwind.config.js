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
        primary: "#000000",
        secondary: "#0000004d",
        primaryGray: "#FAFAFA",
        secondaryGray: "#E0E0E0",
      },
    },
  },
  // plugins: [require("@tailwindcss/line-clamp")],
};
