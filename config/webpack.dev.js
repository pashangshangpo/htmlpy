import { merge } from 'webpack-merge'

import webpackCommon from './webpack.common'

export default merge(webpackCommon, {
  mode: 'development',
  devtool: 'eval-source-map',
  cache: true,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
})
