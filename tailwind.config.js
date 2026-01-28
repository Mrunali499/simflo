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
<<<<<<< HEAD
        "bg-icon-circle": "var(--bg-icon-circle)",
        "text-description": "var(--text-description)",
=======
        "chip-text": "var(--chip-text)",
        white: "var(--white)",
        "text-header": "var(--text-header)",
        "date-text": "var(--date-text)",
        "date-card-bg": "var(--date-card-bg)",
>>>>>>> 225fedbee89fb52b6f75daad218f4f80c618b14b
      },
    },
  },
  plugins: [],
};
