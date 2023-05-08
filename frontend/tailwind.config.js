/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        w: 'width',
      },
      fontFamily: {
        scp: ['Source Code Pro', 'monospace'],
      },
      colors: {
        bamboo: '#2A9464',
        editor: '#263238',
      },
      keyframes: {
        progress: {
          '100%': {
            backgroundColor: 'rgb(20, 255, 226)',
            width: '100vw',
          },
        },
      },
    },
  },
  plugins: [],
};
