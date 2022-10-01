/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx, .css}"
  ],
  theme: {
    fontFamily: {
      Inter: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif',
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
    },
    extend: {

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  darkMode:"class"
}
