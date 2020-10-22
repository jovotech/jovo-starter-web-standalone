module.exports = {
  future: {
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      height: {
        '2/6': '33.333333%',
      },
    },
    boxShadow: {
      '2xl': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
    },
  },
  variants: {},
  plugins: [],
};
