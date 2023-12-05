/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "90/0": "90.5%",
      },
      spacing: {
        79: "19rem",
      },
    },
  },
  plugins: [],
};
