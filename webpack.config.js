const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

const config = __babel => {  
  return {
    mode: 'development',
    entry: './src/index', // Update this to your entry file
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: `[name].js`,
      chunkFilename: `[name].js`,
      // publicPath: './',
      assetModuleFilename: '[hash][ext]',
      // filename: 'index.js', // Output file name
      libraryTarget: 'commonjs2',
    },
    module: {
      defaultRules: [
        {
          type: "javascript/auto",
          resolve: {},
        },
        {
          test: /\.json$/i,
          type: "json",
        },
        // { test: /\.wasm$/, type: "webassembly/async" }
      ],
      rules: [
        {
          test: /\.wasm$/i,
          type: 'asset/resource',
          generator: {
            filename: '[name][ext]'
          }
        },
        { 
          test: /\.(c|m)?(ts|js)x?$/,
          use: [{loader: 'babel-loader'},],
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.ctsx', '.cjsx', '.cts', '.cjs', '.mjs', '.mts', ".wasm"], // Add other extensions you use
      modules: [ path.resolve(__dirname, "js"), "node_modules"]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "node_modules/yoga-wasm-web/dist/yoga.wasm", to: "yoga.wasm" },
        ],
      }),
      // new webpack.IgnorePlugin({resourceRegExp: /a$/}),
    ],
    experiments: {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      topLevelAwait: true,
      cacheUnaffected: true
    }
  };
}

exports.default = config;