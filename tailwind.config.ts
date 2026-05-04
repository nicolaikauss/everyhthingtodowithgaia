import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "ui-serif", "Georgia", "serif"]
      },
      colors: {
        ink: "#f5f2ed",
        night: "#080a0d",
        graphite: "#0f1318",
        line: "rgba(245, 242, 237, 0.22)"
      },
      boxShadow: {
        "hero-soft": "0 30px 80px rgba(0, 0, 0, 0.35)"
      },
      animation: {
        "slow-fade": "slowFade 1.4s ease-out forwards",
        drift: "drift 24s ease-in-out infinite"
      },
      keyframes: {
        slowFade: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
