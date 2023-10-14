const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const ReplaceInSrcWebpackPlugin = require('replace-in-src-webpack-plugin');

const config = __babel => {  
  return {
    // node: {
    //   __filename: true,
    //   __dirname: true,
    // },
    mode: "production",
    entry: "./output/js/index.js",
    target: "node",
    output: {
      path: path.resolve(__dirname, "output", "bundled"),
      publicPath: './',
      chunkFormat: "commonjs",
      assetModuleFilename: 'assets/[hash]/[name][ext]'
    },
    module: {
      parser: {
        javascript : { importMeta: false }
      },
      defaultRules: [
        "...",
        {
          test: /\.wasm$/i,
          use: "null-loader"
        }
      ],
      rules: [
        // By default the wasm files fail to load with file-loader probably because the lib is esm only in mind
        {
          test : /\.js$/,
          loader: 'string-replace-loader',
          include: [path.resolve("node_modules/yoga-wasm-web/dist/node.js")],
          options: {
            search: 'import.meta.url',
            replace: '__filename',
            flags: 'g'
          }
        },
        // we are going to inline json assets into the bundle
        {
          test: /node_modules\/cfonts\/.+\.json/,
          include: [path.resolve("node_modules/cfonts/")],
          type: 'asset/inline',
          // loader: "file-loader",
          // type: 'javascript/auto',
          // options: {
          //   name: 'assets/[hash]/[name].[ext]'
          // }        
        }
      ]
    },
    plugins: [
      // new ReplaceInSrcWebpackPlugin([
      //   {
      //     dir: 'node_modules/yoga-wasm-web/dist',
      //     files: ['node.js'],
      //     rules: [
      //       {
      //         search: '(import.meta.url)',
      //         replace: '(__filename ? __filename : i)',
      //       }
      //     ]
      //   }
      // ]),
      new CopyPlugin({
        patterns: [
          { from: "node_modules/yoga-wasm-web/dist/yoga.wasm", to: "[name][ext]" },
        ],
      }),
      
    ],
    resolve: {
      // extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.txt', '.wasm', '.json'],
      // modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    // experiments: {
    //   syncWebAssembly: true,
    //   asyncWebAssembly: true
    // }
  };
}

exports.default = config;