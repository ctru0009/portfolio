/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111",
        paper: "#fff",
        chrome: "#eee",
        desktop: "#d8d8d8",
        panel: "#fafafa",
        muted: "#444",
        dim: "#777",
        faint: "#999",
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
      fontSize: {
        10: ["10px", "1.6"],
        11: ["11px", "1.6"],
        12: ["12px", "1.75"],
        13: ["13px", "1.6"],
        16: ["16px", "1.3"],
        20: ["20px", "1"],
        30: ["30px", "1.16"],
        33: ["33px", "1.16"],
      },
      maxWidth: {
        prose: "70ch",
      },
      boxShadow: {
        hard: "7px 7px 0 #111",
        "hard-callout": "4px 4px 0 #111",
        "hard-sm": "2px 2px 0 #111",
        "hard-dark": "3px 3px 0 #777",
        "hard-dark-sm": "2px 2px 0 #777",
      },
    },
  },
  plugins: [],
};
