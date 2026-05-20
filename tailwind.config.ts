import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#fffaf0",
        "ink-soft": "#f6efe2",
        ivory: "#1f1a12",
        champagne: "#b98a2d",
        "champagne-deep": "#765015",
        peacock: "#0f766e",
        ruby: "#8f1d2c",
        smoke: "#766d5f"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(185, 138, 45, 0.18), 0 20px 70px rgba(92, 68, 25, 0.16)"
      },
      animation: {
        rise: "rise 700ms ease-out both",
        "slow-fade": "slowFade 900ms ease-out both",
        marquee: "marquee 24s linear infinite"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        slowFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
