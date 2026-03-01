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
        brand: {
          black: "#090d0b",
          white: "#FAFAFA",
          grey: {
            100: "#F5F5F5",
            200: "#E5E5E5",
            300: "#888888",
            400: "#666666",
            500: "#333333",
            600: "#A8A8A8",
            900: "#111111",
          },
          border: "rgba(255,255,255,0.12)",
          silver: {
            light: "#E8E8E8",
            DEFAULT: "#B8B8B8",
            dark: "#787878",
            dim: "#585858",
          },
          gold: {
            light: "#F4D03F",
            DEFAULT: "#D4AF37",
            dark: "#B8860B",
            dim: "#8B6914",
          },
        },
      },
      backgroundImage: {
        "gradient-silver":
          "linear-gradient(135deg, #e8e8e8 0%, #b8b8b8 35%, #787878 70%, #b8b8b8 100%)",
        "gradient-silver-subtle":
          "linear-gradient(180deg, #e8e8e8 0%, #787878 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #f4d03f 0%, #d4af37 40%, #b8860b 80%, #d4af37 100%)",
        "gradient-gold-subtle":
          "linear-gradient(180deg, #f4d03f 0%, #b8860b 100%)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        label: ["0.875rem", { lineHeight: "1.4" }],
        caption: ["0.8125rem", { lineHeight: "1.45" }],
      },
      transitionDuration: {
        button: "150ms",
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(212, 175, 55, 0.35)",
        "gold-glow-strong": "0 0 32px rgba(212, 175, 55, 0.5)",
      },
      keyframes: {
        "hero-kb": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "gold-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "hero-kb": "hero-kb 10s linear forwards",
        "gold-shimmer": "gold-shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
