import * as defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Libre Franklin"', ...defaultTheme.fontFamily.sans],
        serif: ['"DM Serif Display"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        dawn: {
          50: "#f7f7f5",
          100: "#ebebe9",
          200: "#d7d6d1",
          300: "#bdbbb4",
          400: "#aeaba3",
          500: "#8f8a80",
          600: "#827d74",
          700: "#6d6761",
          800: "#5b5751",
          900: "#4b4743",
          950: "#272523",
        },

        fern: {
          50: "#f4faf3",
          100: "#e6f3e5",
          200: "#cce7cb",
          300: "#a4d3a2",
          400: "#65ae62",
          500: "#50994e",
          600: "#3e7d3c",
          700: "#346332",
          800: "#2c502b",
          900: "#264225",
          950: "#102310",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
