/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "w-max-1290": { max: "1290px" },
        "w-max-1020": { max: "1020px" },
        "w-max-854": { max: "854px" },
        "w-max-400": { max: "400px" },

      },
    },
  },
  plugins: [],
};
