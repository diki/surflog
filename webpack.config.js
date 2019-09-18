var path = require('path');

module.exports = {
  entry: {
    app: './src/entry.tsx',
    bg: ['@babel/polyfill', './src/background-script.ts'],
    content: ['@babel/polyfill', './src/content.js'],
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  output: {
    path: path.join(__dirname, 'builds/chrome/js'),
    filename: '[name].entry.js',
  },
  module: {
    loaders: [
      {
        test: /\.(ts|tsx|js)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
