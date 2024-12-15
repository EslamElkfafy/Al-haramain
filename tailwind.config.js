/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveBetweenFromLeftToRight: {
          '0%': { left: '-1000px', opacity: '0' },
          '100%': { left: '4rem', opacity: '1' },
        },
        moveBetweenFromRightToLeft: {
          '0%': { right: '-1000px', opacity: '0' },
          '100%': { right: '4rem', opacity: '1' },
        },
      },
      animation: {
        moveTextFromLeftToRight: 'moveBetweenFromLeftToRight 2s ease-in-out forwards',
        moveTextFromRightToLeft: 'moveBetweenFromRightToLeft 2s ease-in-out forwards',
      },
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
