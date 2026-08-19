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
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          500: '#635BFF',
          600: '#635BFF',
          700: '#4F46E5',
        },
        brand: {
          purple: '#635BFF',
          blue: '#2563EB',
          green: '#10B981',
          coral: '#F97316',
        }
      },
    },
  },
  plugins: [],
};
export default config;
