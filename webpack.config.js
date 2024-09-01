const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 1834,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.mp3$/,
        use: ["file-loader"]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',"@babel/preset-react"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '25 + 5 Clock',
      filename: 'index.html',
      template: 'src/template.html'
    })
  ]
}

