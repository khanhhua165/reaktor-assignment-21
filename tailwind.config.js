module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Open Sans"],
    },
    screens: {
      sm: "689px",

      md: "935px",

      lg: "1179px",

      xl: "1415px",

      "2xl": "1653px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
