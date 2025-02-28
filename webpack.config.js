// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // Ponto de entrada da sua aplicação
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Pasta onde o bundle será gerado
  },
  resolve: {
    fallback: {
      "path": false,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "fs": false,
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url/"),
      "util":false,
    },
  },
};
