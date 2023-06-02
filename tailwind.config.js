// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-roboto)", ...fontFamily.sans],
      special: ["var(--font-teko)"],
    },
    extend: {},
  },
  plugins: [],
}
