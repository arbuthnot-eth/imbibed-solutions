/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        accent: '#9223f5',
        secondary: '#00ffa3',
        tertiary: '#47b6ff',
        highlight: '#F2A900',
      },
      fontFamily: {
        robit: ['Robit', 'sans-serif'],
      },
      spacing: {
        '24': '24px',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px theme(colors.accent), 0 0 10px theme(colors.accent), 0 0 15px theme(colors.accent)',
          },
          '50%': {
            boxShadow: '0 0 10px theme(colors.accent), 0 0 20px theme(colors.accent), 0 0 30px theme(colors.accent)',
          },
        },
      },
    },
  },
  plugins: [],
} 