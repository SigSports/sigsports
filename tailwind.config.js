/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        yellow: {
          100: "#F8D442",
          200:"#FEAF00"
        },
        bg:"#F2EAE1",
        bgGray: "#2D3A3A",
        grayIcon: "#AEBBCD",
        textGray: "#A8A7A7",
        green: {
          100: "#92E6A7",
          200: "#058C42",
          300: "#16DB65",

          bg: "#04471C",
        },
        white: { ligth: "#FCFFFC80", default: "#FCFFFC" },
        dropShadow: {
          100: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },
      },
       screens: {
              tablet: "1320px",
            },
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        Quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
