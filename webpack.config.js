const path = require('path');

module.exports = {
  entry: './src/main.js', // Entry point for your app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'production', // Ensures optimized output for production
};
