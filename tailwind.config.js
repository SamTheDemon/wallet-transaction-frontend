const { Container } = require("postcss");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        "primary":"#",
        "secondary":"#",
        "text-main-white":"#FFFFFF",
        "main-gray":"#DDDDDD",
        "light-gray": "#2B2B2B",
        "dark-gray": "#1C1C1C",
        "background-main":"#080808",
        "incoming":"#50AF95",
        "outgoing":"#FF9300",
        "shade-gray":"#878787",
        "overview-gray": "#B0B0B01A"
      
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to right, rgba(72, 165, 76, 1), rgba(45, 94, 155, 1))'
      }
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
    },
    container:{
      padding: "2rem",
      center: true,
    },
    screens:{
      sm:"640px",
      md: "768px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
