import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0f9d58",
          dark: "#0b1f14",
          black: "#101314",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "var(--font-hindi)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
