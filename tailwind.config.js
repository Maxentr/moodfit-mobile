/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        NunitoSansExtraBold: "NunitoSans-ExtraBold",
        NunitoSansBlack: "NunitoSans-Black",
        NunitoSansBold: "NunitoSans-Bold",
        NunitoSansSemiBold: "NunitoSans-SemiBold",
        NunitoSans: "NunitoSans-Regular",
        NunitoSansLight: "NunitoSans-Light",
        NunitoSansExtraLight: "NunitoSans-ExtraLight",
      },
    },
  },
  plugins: [],
}
