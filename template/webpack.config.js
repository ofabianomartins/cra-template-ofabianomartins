const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')

const srcDir        = path.join(__dirname,'./src')
const distDir       = path.join(__dirname,'./build')
const entry         = path.join(srcDir, 'index.jsx' )
const srcHtmlLayout = path.join(srcDir, 'index.html')
const srcStyles     = path.join(srcDir, './styles')
const srcComponents = path.join(srcDir, './components')
const scssIncludes  = []

module.exports = {
	mode: "development",
  target: 'web',
  entry,
  output: {
    filename: 'bundle.js',
    path: distDir
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [ 'node_modules', srcDir ],
    alias: {
      Components:   srcComponents,
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: srcHtmlLayout,
      chunksSortMode: 'none'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css'
    }),
    new CopyPlugin([
      { from: './public/', to: 'assets/' },
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // Modular Styles
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
          },
          { loader: 'postcss-loader' }
        ],
        exclude: [srcStyles],
        include: [srcDir]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: scssIncludes
              }
            }
          }
        ],
        exclude: [srcStyles],
        include: [srcDir]
      },
      // Global Styles
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader'],
        include: [srcStyles]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          { loader: 'sass-loader',
            options: { sassOptions: { includePaths: scssIncludes } }
          }
        ],
        include: [srcStyles]
      },
      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: { name: "fonts/[name].[ext]" }
      },
      // Files
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        loader: "file-loader",
        options: { name: "static/[name].[ext]" }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8084,
    hot: true,
    inline: true
  }
}
