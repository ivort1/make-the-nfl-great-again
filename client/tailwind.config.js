/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Roboto Mono"],
    },
    extend: {
      boxShadow: {
        mobileNav: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
        statsCard: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'
      },
      backdropFilter: ['hover', 'focus'], // Add hover and focus variants
    },
  },
  plugins: [],
}