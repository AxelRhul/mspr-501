import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "messagerie":"url('/img/background.png')"
      },
    },
    colors: {
      "vert": "#80CC28",
      "vertFoncé": "#5C8F37",
      "white":"#FFFF",
      "black": "#000",
      "rouge":"#F01E29",
    }
  },
  plugins: [],
};
export default config;
