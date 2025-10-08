/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        consorcio: {
          light: "#86efac",
          DEFAULT: "#22c55e",
          dark: "#16a34a",
        },
        financiamento: {
          light: "#93c5fd",
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },
      },
    },
  },
  plugins: [],
};
