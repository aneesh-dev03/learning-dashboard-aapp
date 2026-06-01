import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-sora)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      // not using these much actually, most colors are inline
      // but keeping them in case
      colors: {
        bg: '#080b12',
        card: '#0d1117',
      },
      animation: {
        'pulse-slow': 'shimmer 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
