const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WebpackBar = require('webpackbar')
const path = require('path')

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        openAnalyzer: false, // 构建完打开浏览器
        reportFilename: path.resolve(__dirname, `analyzer/index.html`),
      }),
      new WebpackBar({
        profile: true,
        color: '#4FFF33',
      }),
    ],
    // 模块缓存，可以提升二次构建速度
    cache: {
      type: 'filesystem',
    },
    devServer: {
      hot: true,
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.externalsType = 'script'
      webpackConfig.externals = {
        mapvgl: [
          'https://cdn.jsdelivr.net/npm/mapvgl@1.0.0-beta.170/dist/mapvgl.min.js',
          'mapvgl',
        ],
        'mapvgl/dist/mapvgl.threelayers.min': [
          'https://cdn.jsdelivr.net/npm/mapvgl@1.0.0-beta.170/dist/mapvgl.threelayers.min.js',
          'mapvgl',
        ],
      }
      return webpackConfig
    },
  },
  babel: {
  },
}
