module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: '#001529',
        buttonColor: '#1890ff',
        primary: 'rgb(209, 213, 219)',
        myGray: '#f0f2f5',
      },
      minWidth: {
        32: '32px',
      },
    },
  },
  variants: {
    extend: {
      fontSize: ['hover', 'focus'],
    },
  },
  plugins: [],
}
