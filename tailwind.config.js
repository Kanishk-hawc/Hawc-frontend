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
      keyframes: {
        spinLoader: {
          "0%": { transform: "rotate(0deg)", borderTopWidth: "10px", borderTopColor: "#65c7f7" },
          "50%": { borderTopWidth: "5px", borderTopColor: "#a8e2ff" },
          "100%": { transform: "rotate(360deg)", borderTopWidth: "10px", borderTopColor: "#65c7f7" },
        },
      },
      animation: {
        spinLoader: "spinLoader 2s cubic-bezier(0.65, 0.05, 0.36, 1) infinite",
      },
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
