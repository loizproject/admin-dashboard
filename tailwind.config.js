/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#EB0C8F",
        sidebg: "#F9DAED",
        bodybg: "#FEF3F9",
        header: "#1A1A1A",
      },
      backgroundImage: {
        "gradient-bg": "linear-gradient(to right, #4e9cff, #ff0a8e)",
      },
    },
  },
  plugins: [],
};
