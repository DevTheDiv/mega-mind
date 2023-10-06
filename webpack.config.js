const path = require('path');

const config = {
  mode: 'production',
  entry: './src/index.ts', // Update this to your entry file
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js', // Output file name
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.tsx'], // Add other extensions you use
  },
//   externals: [/node_modules/], // Exclude node_modules from bundling 
};

module.exports = config;