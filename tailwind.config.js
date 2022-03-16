module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlack: '#0B0F1B',
      },
      fontFamily: {
        display: '"Fira Sans", Segoe UI, Roboto, Oxygen, sans-serif',
        body: '"Arvo", Segoe UI, Roboto, Oxygen, serif ',
      },
    },
  },
  plugins: [],
}
