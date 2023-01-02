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
      },
      spacing: {
        74: "74rem",
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
        "gray-dark": "#3A3A3A",
        "gray-light": "#F9F9F9",
        "border-gray": "#D9D9D9",
        gray: "#8492a6",
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
