/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f5f5f5",
          200: "#e2e2e2",
        },
      },
      borderRadius: {
        none: "0",
        small: "4px",
        DEFAULT: "10px",
        medium: "12px",
        large: "16px",
        extra: "35px",
      },

      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        12: "48px",
        18: "72px",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
      },
      fontSize: {},
      boxShadow: {
        "3xl": "0px -4px 16px 0px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
