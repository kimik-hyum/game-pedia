const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: path.join(__dirname, 'index.web.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ],
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
        }
      },
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
      {
        test: /\.(js)?$/,
        include: [
          path.resolve(__dirname, 'node_modules/react-native-youtube-iframe'),
          path.resolve(__dirname, 'node_modules/react-native-webview'),
          path.resolve(__dirname, 'node_modules/native-base'),
          path.resolve(__dirname, 'node_modules/react-native-easy-grid'),
          path.resolve(__dirname, 'node_modules/react-native-drawer'),
          path.resolve(__dirname, 'node_modules/@react-native-picker'),
          path.resolve(__dirname, 'node_modules/@codler'),
          path.resolve(__dirname, 'node_modules/react-native-web'),
          path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
          path.resolve(__dirname, 'node_modules/react-native-ratings')
          
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ],
  },
  devServer: {
    host:'192.168.0.103',
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
  plugins: [HTMLWebpackPluginConfig],
}
