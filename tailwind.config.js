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
        pink:{
          100:"#A634FF",
          200:"#453961"
        },
        blue:{
          200:"#2E5A62",
          100:"#16ACDB"
        },
        yellow:"#575839",
        orange:"#FFA234",
        red: {
          100: "#FF0000",
        },
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
              "2xl":"1600px",
              "3xl": "1920px"
            },
      fontFamily: {
        Raleway: ["Raleway"],
        Montserrat: ["Montserrat"],
        Quicksand: ["Quicksand"],
        Poppins: ["Poppins"]
      },
    },
  },
  plugins: [],
};
