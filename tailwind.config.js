/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        shaded: "hsl(var(--shaded))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        "Poppins-100": ["Poppins-Thin", "sans-serif"],
        "Poppins-200": ["Poppins-ExtraLight", "sans-serif"],
        "Poppins-300": ["Poppins-Light", "sans-serif"],
        "Poppins-400": ["Poppins-Regular", "sans-serif"],
        "Poppins-500": ["Poppins-Medium", "sans-serif"],
        "Poppins-600": ["Poppins-SemiBold", "sans-serif"],
        "Poppins-700": ["Poppins-Bold", "sans-serif"],
        "Poppins-800": ["Poppins-ExtraBold", "sans-serif"],
        "Poppins-900": ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
