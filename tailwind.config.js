module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // Sesuaikan dengan struktur src
  ],
  theme: {
    extend: {
      keyframes: {
        moveClouds: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(200px)' }
        },
        twinkleStars: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        moveClouds: 'moveClouds 30s linear infinite',
        twinkleStars: 'twinkleStars 2s infinite ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}
