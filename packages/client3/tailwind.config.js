/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["Kumbh Sans", ...defaultTheme.fontFamily.sans],
      serif: ["Anek Telugu", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        theme: {
          primary: "#506559",
          dark: "#2D3433",
          light: "#F3EEE9",
          accent1: "#CDFC51",
          accent2: "#7BF8AF",
          accent3: "#D9644A",
          accent4: "#95628A",
        },
        dark: {
          50: "#909090",
          70: "#646464",
          80: "#4D4D4D",
          90: "#373737",
          100: "#212121",
        },
        light: {
          1: "#DEDEDE",
          2: "#E9E9E9",
          3: "#F4F4F4",
          4: "#FDFDFD",
        },
        green: {
          50: "#506559",
          80: "#343E3B",
          90: "#2D3433",
          100: "#171918",
        },
        state: {
          error: "#EB5757",
          process: "#2D64F5",
          success: "#3A783C",
        },
        transparent: "transparent",
        current: "currentColor",
      },
      keyframes: {
        "background-oscillate": {
          "0%": { "background-position": "0 50%" },
          "25%": { "background-position": "50 50%" },
          "50%": { "background-position": "100% 50%" },
          "75%": { "background-position": "50% 50%" },
          "100%": { "background-position": "0 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "background-oscillate-slow": "background-oscillate 4s ease-in infinite",
        marquee: "marquee 60s linear infinite",
      },
      backgroundImage: {
        "sunrise-01":
          "linear-gradient(180deg, rgba(29,50,95,1) 0%, rgba(118,95,148,1) 50%, rgba(248,224,206,1) 100%)",
        "sunrise-02":
          "linear-gradient(180deg, rgba(209, 118, 115, 0) 17.71%, #D17673 100%),linear-gradient(0deg, #1D325F, #1D325F)",
        afternoon:
          "linear-gradient(180deg, rgba(222, 248, 253, 0) 18.75%, #A9D9E3 100%),linear-gradient(0deg, #7BA3D0, #7BA3D0)",
        "sunset-01":
          "linear-gradient(180deg, rgba(231, 182, 145, 0) 19.27%, #FED9BD 100%),linear-gradient(0deg, #7BA3D0, #7BA3D0)",
        "sunset-02":
          "linear-gradient(180deg, rgba(160, 190, 223, 0) 16.67%, #FBECBD 100%),linear-gradient(0deg, #E99390, #E99390)",
      },
      spacing: {
        15: "3.75rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
