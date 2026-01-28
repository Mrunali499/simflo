/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "icon-inactive": "var(--icon-inactive)",
        "text-dark": "var(--text-dark)",
        "border-default": "var(--border-default)",
        black: "var(--black)",
        "text-placeholder": "var(--text-placeholder)",
        "text-secondary": "var(--text-secondary)",
        "search-placeholder": "var(--search-placeholder)",
        "search-bg": "var(--search-bg)",
      },
    },
  },
  plugins: [],
};
