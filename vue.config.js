const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')


module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/viewer/'
    : '/',

  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: {
      output: {
        libraryExport: 'default'
      },
  

    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new ErrorOverlayPlugin(),
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
          process: 'process/browser',
      }),
  ],
  devtool: 'cheap-module-source-map',
    resolve: {
      extensions: [ '.ts', '.js' ],

      fallback: {
        "url": false,
        "path": require.resolve("path-browserify"),            // "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer"),
            "http": require.resolve("stream-http"),
            "os": require.resolve("os-browserify/browser"),
            "zlib": require.resolve("browserify-zlib"),
            "stream": require.resolve("stream-browserify"),
            "https": require.resolve("https-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "assert": require.resolve("assert/"),
            "fs": false,
            "child_process": false,
            "tls": false,
            "net": false
        }
      }
    
    },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: true,
      enableBridge: false
    }
  }
}
  
)
