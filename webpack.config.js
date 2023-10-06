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
        test: /\.ts$/, // Assuming TypeScript files
        use: 'ts-loader', // You'll need to have ts-loader installed
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', ".json"], // Add other extensions you use
  },
//   externals: [/node_modules/], // Exclude node_modules from bundling 
};

module.exports = config;