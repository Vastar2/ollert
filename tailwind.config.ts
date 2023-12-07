import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      background: {
        mainWhite: "var(--main-white)",
        darkWhite: "var(--dark-white)",
        mainGray: "var(--main-gray)",
        lightGray: "var(--light-gray)",
        accent: "var(--accent)",
        accentHover: "var(--accent-hover)",
      },
      colors: {
        mainWhite: "var(--main-white)",
        darkWhite: "var(--dark-white)",
        mainGray: "var(--main-gray)",
        lightGray: "var(--light-gray)",
        halfLightGray: "var(--half-light-gray)",
        superLightGray: "var(--super-light-gray)",
        accent: "var(--accent)",
        accentHover: "var(--accent-hover)",
      },
      borderRadius: {
        custom: "6px",
      },
      boxShadow: {
        custom: "0px 0px 26px -12px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
