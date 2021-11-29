import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { merge } from 'webpack-merge'
import { ESBuildMinifyPlugin } from 'esbuild-loader'

import webpackCommon from './webpack.common'

// css和sass公共loader
const cssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer'],
      },
    },
  },
]

export default merge(webpackCommon, {
  mode: 'production',
  devtool: 'source-map',
  target: 'browserslist',
  performance: {
    hints: 'error',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [...cssLoaders],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...cssLoaders, 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
  ],
})
