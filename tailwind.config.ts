import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "Fraunces",
          "Iowan Old Style",
          "Georgia",
          "Cambria",
          "serif"
        ],
        sans: [
          "InterVariable",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      colors: {
        paper: "#faf8f4",
        ink: {
          50: "#f6f5f3",
          100: "#e9e6e0",
          200: "#d3cec3",
          300: "#b3aa99",
          400: "#8c8172",
          500: "#6b6152",
          600: "#524a3f",
          700: "#3d372f",
          800: "#282420",
          900: "#191612",
          950: "#100e0b"
        },
        brass: {
          50: "#fbf6ea",
          100: "#f3e6c2",
          200: "#e6cc85",
          300: "#d6ac4c",
          400: "#c1912e",
          500: "#a3771f",
          600: "#815d18",
          700: "#634713",
          800: "#453210",
          900: "#2c200a"
        },
        signal: {
          high: "#b23a2e",
          highBg: "#fbeae7",
          watch: "#a3701a",
          watchBg: "#faf0dc",
          routine: "#3d7a5c",
          routineBg: "#e9f4ee"
        },
        golden: {
          drmarty: "#1f6f6b",
          badlands: "#b5562b",
          upn: "#4a4593"
        }
      },
      boxShadow: {
        card: "0 1px 2px rgba(25,22,18,0.06), 0 1px 1px rgba(25,22,18,0.04)",
        raised: "0 4px 16px rgba(25,22,18,0.08), 0 1px 3px rgba(25,22,18,0.06)"
      },
      borderRadius: {
        card: "10px"
      }
    }
  },
  plugins: []
};

export default config;
