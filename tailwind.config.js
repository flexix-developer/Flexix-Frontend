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
        15: "3.6rem",
      },
      width: {
        "90/0": "95%",
        85: "79%",
        "15/0": "15%",
      },
    },
  },
  plugins: [],
};
