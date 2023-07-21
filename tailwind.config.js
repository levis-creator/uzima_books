/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-color1": "#0945a9",
        "theme-color2": "#0681d7",
        "theme-color3": "#5ec0fe",
        "theme-color4": "#c2fff8",
        "theme-color5": "#fffbf4",
      },
    },
  },
  plugins: [],
};
