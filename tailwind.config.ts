import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"]
      },
      colors: {
        coffee: {
          50: "#fbf7f2",
          100: "#f3e7d8",
          200: "#dfc3a3",
          300: "#c89a6a",
          400: "#a8713f",
          500: "#7b4a2b",
          600: "#5a321f",
          700: "#3b2118",
          800: "#251410",
          900: "#140b08"
        },
        gold: {
          400: "#d8a657",
          500: "#bd8540",
          600: "#94612f"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0, 0, 0, 0.35)",
        soft: "0 18px 50px rgba(20, 11, 8, 0.18)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
