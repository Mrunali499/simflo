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
        "bg-icon-circle": "var(--bg-icon-circle)",
        "text-description": "var(--text-description)",
        "chip-text": "var(--chip-text)",
        white: "var(--white)",
        "text-header": "var(--text-header)",
        "date-text": "var(--date-text)",
        "date-card-bg": "var(--date-card-bg)",
        "action-bar-bg": "var(--action-bar-bg)",
        "input-placeholder": "var(--input-placeholder)",
        "plus-active-bg": "var(--plus-active-bg)",
        "date-card-bg": "var(--date-card-bg)",
        "border-subtle": "var(--border-subtle)",
        "text-figma-gray": "var(--text-figma-gray)",
        "chat-border": "var(--border-chat-item)",
      },
    },
  },
  plugins: [],
};
