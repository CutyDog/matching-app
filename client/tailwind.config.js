module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./graphql/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#171717",
        primary: {
          DEFAULT: "#2563eb", // blue-600
          light: "#3b82f6",  // blue-500
          dark: "#1e40af",   // blue-800
        },
        secondary: {
          DEFAULT: "#f59e42", // orange-400
          light: "#fbbf24",  // orange-300
          dark: "#b45309",   // orange-700
        },
        accent: {
          DEFAULT: "#10b981", // emerald-500
        },
        muted: {
          DEFAULT: "#f3f4f6",   // gray-100
        },
        error: {
          DEFAULT: "#ef4444", // red-500
        },
        success: {
          DEFAULT: "#22c55e", // green-500
        },
        info: {
          DEFAULT: "#0ea5e9", // sky-500
        },
      },
    },
  },
  plugins: [],
};