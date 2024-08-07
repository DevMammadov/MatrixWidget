/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamely: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#f9d51a",
        },
        cyan: {
          100: "#eaeef4",
          200: "rgb(241, 242, 247)",
        },
        blue: {
          500: "#007bff",
        },
        gray: {
          100: "#f5f5f5",
          150: "#f2f2f2",
          200: "#e2e2e2",
          300: "#cdcdcd",
          400: "#aaaaaa",
          500: "#828282",
          600: "#444444",
          700: "#333333",
          1000: "#121212",
        },
        green: {
          500: "rgb(35, 168, 51)",
        },
      },
      borderRadius: {
        none: "0",
        tiny: "2px",
        small: "4px",
        DEFAULT: "10px",
        medium: "12px",
        large: "16px",
        huge: "20px",
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
        11: "44px",
        12: "48px",
        18: "72px",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
      },
      fontSize: {
        xs: "0.688rem", // ~11px
        sm: "0.75rem", // ~12px
        lg: "0.813rem", // ~13px
        xl: "0.875rem", // ~14px
        "2xl": "0.938rem", // ~15px
        base: "1rem", // ~16px
        "3xl": "1.125rem", // ~18px
        "4xl": "1.25rem", // ~20px
        "5xl": "1.5rem", // ~24px
        "6xl": "2.125rem", // ~34px
      },
      boxShadow: {
        "2xl": "0 12px 48px #0613333d",
        "3xl": "0px -4px 16px 0px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
