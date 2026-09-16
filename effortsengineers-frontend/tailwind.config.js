module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#1e40af",   // Deep blue for Admin
        brandIndigo: "#4f46e5", // Indigo for Client
        brandGray: "#f1f5f9",   // Light background
        brandAccent: "#f59e0b", // Accent (yellow/orange)
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
