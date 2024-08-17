/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    keyframes: {
      spp: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(40px)" },
      },

      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },

    animation: {
      fog: "spp  3.5s linear infinite alternate",
      spin: " spin 1s linear infinite",
    },
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1200px",
      },
      padding: {
        xl: "20px",
        "2xl": "0px",
      },
    },
    extend: {
      keyframes: {
        spp: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(40px)" },
        },
      },
      animation: {
        fog: "spp 1s ease infinite alternate",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        auto: "repeat(auto-fill, minmax(300px, 1fr))",

        // Complex site-specific column configuration
      },
      backgroundImage: {
        "hero-pattern": "url('./public/images/Group 193.png')",
      },
      height: {
        "custom-height": "calc(100vh - 90px)",
      },
      colors: {
        "primary-color": {
          DEFAULT: "#6B8A7A",
          100: "#6B8A7A",
        },
        "secondary-color": "#F2F2E9",
        grey: {
          DEFAULT: "#D9D9D9",
          100: "#D9D9D9",
        },
        beje: "#A2A085",
        "button-color": {
          DEFAULT: "#254336",
          100: "#254336",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
