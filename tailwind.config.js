/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#EB0C8F",
        sidebg: "#F9DAED",
        bodybg: "#FEF3F9",
      },
    },
  },
  plugins: [],
};
