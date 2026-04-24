import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#E8581A",
          light: "#FFF0E8",
          mid: "#F5915A",
        },
        ink: {
          DEFAULT: "#1A1410",
          muted: "#6B6460",
        },
        surface: {
          DEFAULT: "#FFFCFB",
          alt: "#F5F3F2",
        },
        line: "#E8E0DC",
      },
      fontFamily: {
        sans: ["var(--font-sarabun)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,20,16,0.04), 0 4px 16px rgba(26,20,16,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
