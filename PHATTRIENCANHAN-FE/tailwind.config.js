/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003d71', // Muted Orange
        secondary: '#f8f9fa', // Very light gray/off-white
        accent: '#e9ecef', // Light gray
      },
    },
  },
  plugins: [],
} 