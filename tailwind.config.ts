import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: "var(--color-surface)",
        secondary: "var(--color-secondary)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        hover: "var(--color-hover)",
      },
    },
  },
  plugins: [],
};

export default config;
