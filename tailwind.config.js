/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          950: "#030712",
          925: "#0a0f1c",
          900: "#111827",
          875: "#1a2236",
          850: "#1f2937",
        },
        ink: "#111",
        paper: "#fff",
        chrome: "#eee",
        desktop: "#d8d8d8",
        panel: "#fafafa",
        muted: "#444",
      },
      fontFamily: {
        mono: [
          "Departure",
          "ui-monospace",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        hard: "7px 7px 0 #111",
        "hard-callout": "4px 4px 0 #111",
        "hard-sm": "2px 2px 0 #111",
        "hard-dark": "3px 3px 0 #777",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
