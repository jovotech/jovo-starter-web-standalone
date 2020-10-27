const plugin = require('tailwindcss/plugin');
const selectorParser = require('postcss-selector-parser');

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
  variants: ['dark'], // TODO: don't enable variant globally (increases file size)
  plugins: [
    plugin(function({ addVariant, theme, e, prefix }) {
      const darkSelector = theme('darkSelector', '.mode-dark');

      addVariant('dark', ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `dark${separator}${sel.value}`;
              sel.parent.insertBefore(sel, selectorParser().astSync(prefix(`${darkSelector} `)));
            });
          }).processSync(selector);
        });
      });
    }),
  ],
};
