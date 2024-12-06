/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react")
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,tsx,jsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins:[nextui()]
}

