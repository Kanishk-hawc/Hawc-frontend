// module.exports = {
//   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   darkMode: 'class', // or 'media' or 'class'
//   theme: {
//     extend: {
//       fontFamily: {
//         custom: ['"Segoe UI"', 'Roboto', 'sans-serif'],
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// };


// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], 
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem', // ✅ keeps spacing consistent
      },
    },
  },
  plugins: [],
};
