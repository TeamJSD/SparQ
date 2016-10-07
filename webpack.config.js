module.exports = {
  entry: "./client/components/app.jsx",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  devServer: {
    inline: true,
    contentBase: './client',
    port: 8100,
    proxy: {
      '/authorize': {
        target: 'http://localhost:3000/authorize',
        secure: false
      },
      '/login': {
        target: 'http://localhost:3000/login',
        secure: false
      },
      '/data': {
        target: 'http://localhost:3000/data',
        secure: false
      },
      '/createdb': {
        target: 'http://localhost:3000/createdb',
        secure: false
      }
    }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "url-loader" },
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