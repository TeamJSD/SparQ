module.exports = {
  entry: "./client/components/app.jsx",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  devServer: {
    inline: true,
    contentBase: './client',
    port: 8100
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};