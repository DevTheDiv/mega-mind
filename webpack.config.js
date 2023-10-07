


let path = require('path');

// let __dirname = process.env.PWD || "";

const config = __babel => {  
  return {
    mode: 'production',
    entry: './src/index', // Update this to your entry file
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: `[name].js`,
      chunkFilename: `[name].js`,
      publicPath: '/'
      // filename: 'index.js', // Output file name
      // libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        { 
          test: /\.(c|m)?(ts|js)x?$/,
          use: [
            {loader: 'babel-loader'}, 
            // 'ts-loader'
          ],
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.ctsx', '.cjsx', '.cts', '.cjs', '.mjs', '.mts'], // Add other extensions you use
      // modules: [ path.resolve(__dirname, "js"), "node_modules"]
    }
  //   externals: [/node_modules/], // Exclude node_modules from bundling 
  };
}

exports.default = config;