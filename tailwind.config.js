const tw_clrs = require('proto-tailwindcss-clrs');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  variants: {},
  plugins: [
    tw_clrs({
      map: {
        bada55: '#bada55',
        slate: '#708090',
        slate4: '#4e5964',
        white: '#ffffff',
      },
    }),
  ],
};
