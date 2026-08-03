import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          light: "#122b4f",
          deep: "#0B0F1E", // navbar / darkest surfaces
        },
        gold: {
          DEFAULT: "#C9A227",
          soft: "rgba(201,162,39,0.12)",
          hover: "#e0bb3f",
        },
        greyLight: "#F3F5F8",
        ink: "#0A0A0A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "2px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(.16,.8,.24,1)",
      },
      boxShadow: {
        card: "0 20px 40px -20px rgba(11,31,58,0.25)",
        modal: "0 40px 80px -20px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
