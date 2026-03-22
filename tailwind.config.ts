import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0b10",
        panel: "#14161f",
        panelSoft: "#1b1f2a",
        accent: "#e9b7a8",
        accentMuted: "#8f6874",
        success: "#2dd4bf",
        warning: "#f59e0b",
        danger: "#f87171",
        text: "#e5e7eb",
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.4)",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
