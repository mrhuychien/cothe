import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Kid-friendly pastel colors
        primary: {
          50: "#FFF5F5",
          100: "#FED7E2",
          200: "#FBB6CE",
          300: "#F687B3",
          400: "#ED64A6",
          500: "#D53F8C",
          600: "#B83280",
          700: "#97266D",
          800: "#702459",
          900: "#521B41",
        },
        // System colors
        skeletal: "#F5E6D3",
        muscular: "#FFB3B3",
        circulatory: "#FF6B6B",
        digestive: "#98D8AA",
        respiratory: "#87CEEB",
        nervous: "#DDA0DD",
        // UI colors
        cream: "#FFF8E7",
        peach: "#FFCBA4",
        mint: "#98FB98",
        sky: "#87CEEB",
        lavender: "#E6E6FA",
      },
      fontFamily: {
        heading: ["var(--font-baloo)", "cursive"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      borderRadius: {
        "kid": "1.5rem",
      },
      boxShadow: {
        "kid": "0 8px 30px rgba(0, 0, 0, 0.08)",
        "kid-hover": "0 12px 40px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
