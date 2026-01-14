/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#feec25",
          dark: "#f7df00"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "Inter", "sans-serif"]
      },
      boxShadow: {
        lift: "0 20px 40px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: [typography]
};
