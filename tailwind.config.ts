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
        // Primary palette - Blue to Purple gradient
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        // System colors
        skeletal: "#F5E6D3",
        muscular: "#FFB3B3",
        circulatory: "#FF6B6B",
        digestive: "#98D8AA",
        respiratory: "#87CEEB",
        nervous: "#DDA0DD",
        // UI colors - dark theme
        cream: "#FFF8E7",
        peach: "#FFCBA4",
        mint: "#98FB98",
        sky: "#87CEEB",
        lavender: "#E6E6FA",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        "kid": "1rem",
      },
      boxShadow: {
        "kid": "0 8px 30px rgba(0, 0, 0, 0.3)",
        "kid-hover": "0 12px 40px rgba(0, 0, 0, 0.4)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.3)",
        "glow-purple": "0 0 30px rgba(139, 92, 246, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
