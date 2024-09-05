/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      ddin: ['D-DIN', 'sans-serif'],
    },
    screens: {
      xs: '400px',
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#3D3D3D',
      white: '#FFFFFF',
      red: '#FF6666',
      blue: '#4E46DD',
      skyblue: '#C9D4FC',
      gray: {
        100: '#F3F4F6',
        200: '#D9D9DE',
        300: '#747483',
      },
    },
    extend: {},
  },
  plugins: [],
};
