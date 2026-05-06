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
        ink: {
          DEFAULT: "#faf8f4",
          92: "rgba(250, 248, 244, 0.92)",
          78: "rgba(250, 248, 244, 0.78)",
          72: "rgba(250, 248, 244, 0.72)",
          68: "rgba(250, 248, 244, 0.68)",
          64: "rgba(250, 248, 244, 0.64)",
          58: "rgba(250, 248, 244, 0.58)",
          55: "rgba(250, 248, 244, 0.55)",
          52: "rgba(250, 248, 244, 0.52)",
          48: "rgba(250, 248, 244, 0.48)",
          45: "rgba(250, 248, 244, 0.45)",
          42: "rgba(250, 248, 244, 0.42)",
          40: "rgba(250, 248, 244, 0.40)",
          38: "rgba(250, 248, 244, 0.38)",
          35: "rgba(250, 248, 244, 0.35)",
          22: "rgba(250, 248, 244, 0.22)",
          18: "rgba(250, 248, 244, 0.18)",
          16: "rgba(250, 248, 244, 0.16)",
          14: "rgba(250, 248, 244, 0.14)",
          12: "rgba(250, 248, 244, 0.12)",
          10: "rgba(250, 248, 244, 0.10)",
          8: "rgba(250, 248, 244, 0.08)"
        },
        night: "#121821",
        graphite: {
          DEFAULT: "#1a2330",
          50: "rgba(26, 35, 48, 0.5)",
          45: "rgba(26, 35, 48, 0.45)",
          25: "rgba(26, 35, 48, 0.25)"
        },
        line: "rgba(250, 248, 244, 0.28)"
      },
      spacing: {
        "safe-t": "env(safe-area-inset-top)",
        "safe-b": "env(safe-area-inset-bottom)",
        "safe-l": "env(safe-area-inset-left)",
        "safe-r": "env(safe-area-inset-right)"
      },
      boxShadow: {
        "hero-soft": "0 30px 80px rgba(0, 0, 0, 0.35)",
        bento:
          "0 1px 0 rgba(245, 242, 237, 0.04) inset, 0 12px 40px rgba(0, 0, 0, 0.35)"
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
