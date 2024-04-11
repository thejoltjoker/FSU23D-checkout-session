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
      boxShadow: {
        box: "0 6px 20px 0 rgba(69, 25, 3, 0.15)",
      },
      borderRadius: {
        "4xl": "3rem",
      },
      fontFamily: {
        heading: [
          '"Kanit"',
          '"Nunito"',
          '"Noto Color Emoji"',
          ...defaultTheme.fontFamily.sans,
        ],
        sans: [
          '"Nunito"',
          '"Noto Color Emoji"',
          ...defaultTheme.fontFamily.sans,
        ],
        emoji: [
          '"Noto Emoji"',
          '"Noto Color Emoji"',
          ...defaultTheme.fontFamily.sans,
        ],
        "emoji-color": [
          '"Noto Color Emoji"',
          '"Noto Emoji"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      spacing: {
        navbar: "4rem",
      },
      colors: {
        brown: {
          50: "#fffbeb",
          100: "#fef2c7",
          200: "#fde48a",
          300: "#fcd04d",
          400: "#fbbc24",
          500: "#f59a0b",
          600: "#d97406",
          700: "#b45009",
          800: "#923e0e",
          900: "#78330f",
          950: "#451903",
        },
        banana: {
          50: "#fffdeb",
          100: "#fffac6",
          200: "#fef589",
          300: "#feea4b",
          400: "#fedb21",
          500: "#f8be10",
          600: "#db9104",
          700: "#b66807",
          800: "#94510c",
          900: "#79420e",
          950: "#462202",
        },
        zanah: {
          50: "#f1f7ee",
          100: "#dcead4",
          200: "#c5ddb9",
          300: "#a1c690",
          400: "#81b06b",
          500: "#62944e",
          600: "#4b753b",
          700: "#3b5b30",
          800: "#33492b",
          900: "#2c4027",
          950: "#152112",
        },

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
