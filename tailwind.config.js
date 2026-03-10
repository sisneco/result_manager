/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: appおよびcomponentsディレクトリ配下の全ファイルを対象にします
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
