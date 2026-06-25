/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8ec2ff",
          400: "#599fff",
          500: "#3478f6",
          600: "#225bdb",
          700: "#1d49b0",
          800: "#1e408c",
          900: "#1d3970",
        },
        accent: {
          400: "#ffb648",
          500: "#fa9d1c",
          600: "#dd8312",
        },
        ink: {
          900: "#0f172a",
          700: "#334155",
          500: "#64748b",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px -2px rgba(15, 23, 42, 0.08), 0 8px 24px -8px rgba(15, 23, 42, 0.08)",
        cardHover: "0 8px 30px -6px rgba(15, 23, 42, 0.18)",
      },
    },
  },
  plugins: [],
};
