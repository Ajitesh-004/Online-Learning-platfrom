/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS and TS files in the src directory
  ],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 8s linear infinite', // Define the rotate animation
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
