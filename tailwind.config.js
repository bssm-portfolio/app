/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        70: "70rem",
        37.5: "37.5rem", // 600px;
      },
      maxWidth: {
        37.5: "37.5rem", // 600px;
      },
      maxHeight: {
        45: "45rem",
      },
      minWidth: {
        27.5: "27.5rem", // 600px;
      },
      minHeight: {
        35: "35rem",
      },
      height: {
        45: "45rem",
      },
      spacing: {
        74: "74rem",
        "2xsmall": "0.375rem", // 6px
        xsmall: "0.625rem", // 10px
        small: "0.75rem", // 12px
        middle: "0.875rem", // 14px
        base: "1rem", // 16px
        large: "1.25rem", // 20px
        xlarge: "2rem", // 32px
        "2xlarge": "2.25rem", // 36px
      },
      padding: {
        1.875: "1.875rem",
        0.468: "0.468rem",
      },
      colors: {
        blue: "#3E73FB",
        somago_yellow: "#FAAF3D",
        black: "#000000",
        white: "#ffffff",
        primary: {
          dark_gray: "#3A3A3A",
          light_gray: "#F9F9F9",
          border_gray: "#D9D9D9",
        },
        secondary: {},
        background: {},
      },
      borderWidth: {
        DEFAULT: "1px",
        0.5: "0.5px",
      },
      fontFamily: {
        inter: ["Inter var", "sans-serif"],
      },
      fontSize: {
        sxx: [
          "0.625rem",
          {
            lineHeight: "0.75rem",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
