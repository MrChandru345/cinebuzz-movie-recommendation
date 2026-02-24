/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff2c1f',
        secondary: '#6a11cb',
      },
      animation: {
        shine: 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(400%) skewX(-12deg)' },
        },
      },
    },
  },
  plugins: [],
}
