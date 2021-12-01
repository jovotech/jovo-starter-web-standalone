module.exports = {
  parallel: false,
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  },
  transpileDependencies: ['@jovotech/client-web-vue2', '@jovotech/client-web'],
  publicPath: process.env.PUBLICPATH || '',
  css: {
    loaderOptions: {
      postcss: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        plugins: [
          require('postcss-import'),
          require('tailwindcss'),
          require('postcss-nested'),
          require('postcss-custom-properties'),
          require('autoprefixer'),
        ],
      },
    },
  },
};
