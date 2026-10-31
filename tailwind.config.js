/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT.js";

export default withMT({
  content: ["./index.html", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      SairaStencil: "var(--SairaStencil)",
      Poppins: "var(--Poppins)",
      Inter: "var(--Inter)",
      Urbanist: "var(--Urbanist)",
      Roboto: "var(--Roboto)",
    },
    extend: {
      keyframes: {
        rotateBorder: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        cookieFadeIn: {
          "0%": { opacity: "0", transform: "translateY(-100px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
        "cookie-fade-in": "cookieFadeIn 0.3s ease-out",
      },
      colors: {
        mainBG: "var(--mainBG)",
        primaryWhite: "var(--primaryWhite)",
        secondaryColor: "var(--secondaryColor)",
        orange: "var(--orange)",
        footerBG: "var(--footerBG)",
        starColor: "var(--starColor)",
        thirdColor: "var(--thirdColor)",
        secondaryBg: "var(--secondaryBg)",
        additionalColor: "var(--additionalColor)",
        errorColor: "var(--errorColor)",
        cynicalBlack: "var(--cynicalBlack)",
        gravelFint: "var(--gravelFint)",
        borderColor: "var(--borderColor)",
      },
      container: {
        center: true,

        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "1rem",
          xl: "0rem",
          "2xl": "0rem",
        },
      },
      screens: {
        xs: "370px",
        xxs: "500px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1680px",
        "2xl": "1680px",
      },
    },
  },
  plugins: [],
});
