import Path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

/**
 * 根路径组合当前路径
 * @param  {...any} path 路径
 * @returns String
 */
export const resolveRoot = (...path) => {
  return Path.resolve('.', ...path)
}

export default {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: resolveRoot('dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader', // url-loader具有file-loader全部功能，不同的是url-loader可以把资源转为base64
            options: {
              name: '[name].[contenthash:8].[ext]',
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'fonts',
              limit: 4096,
            },
          },
        ],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.scss', '.sass'],
    alias: {
      '@': resolveRoot('src'),
      '@components': resolveRoot('src/components'),
      '@pages': resolveRoot('src/pages'),
      '@assets': resolveRoot('src/assets'),
    },
  },
  externals: {
    axios: 'axios',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouterDOM',
    'react-router-dom': 'ReactRouterDOM',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          minChunks: 2,
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          name: 'vendors',
        },
        common: {
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          test: /[\\/]src[\\/]/,
          reuseExistingChunk: true,
          name: 'common',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['index'],
    }),
  ],
}
