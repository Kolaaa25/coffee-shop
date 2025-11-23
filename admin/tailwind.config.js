/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C190F',
          light: '#3D2817',
          dark: '#1A0F09',
        },
        brown: {
          DEFAULT: '#8B6F47',
          light: '#A67C52',
          dark: '#6B563A',
        },
        cream: {
          DEFAULT: '#F5E6D3',
          light: '#FAF3E8',
          dark: '#E8D5BB',
        },
      },
    },
  },
  plugins: [],
};
