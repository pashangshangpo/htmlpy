/*
 * @File: Cli 配置
 */

import webpackConfigDev from './config/webpack.dev'
import webpackConfigProd from './config/webpack.prod'

export default {
  dev: {
    webpackConfig: webpackConfigDev,
    devServer: {},
  },
  prod: {
    webpackConfig: webpackConfigProd,
  },
}
