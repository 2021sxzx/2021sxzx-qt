const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WebpackBar = require('webpackbar')
const path = require('path')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  webpack: smp.wrap({
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        openAnalyzer: true, // 构建完打开浏览器
        reportFilename: path.resolve(__dirname, `analyzer/index.html`),
      }),
      new WebpackBar({
        profile: true,
        color: '#4FFF33',
      }),
      // 直接压缩成gzip，减小服务器压力
      new CompressionWebpackPlugin({
        test: /\.(js|css)$/,
        algorithm: 'gzip',
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
      // 还不如不分
      // webpackConfig.optimization.splitChunks = {
      //   chunks: 'all',
      //   maxInitialRequests: Infinity,
      //   minSize: 20000,
      //   maxSize: 200000,
      //   cacheGroups: {
      //     vendors: {
      //       name: 'vendors',
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: -10,
      //     },
      //     common: {
      //       name: 'common',
      //       priority: 0,
      //       minChunks: 3,
      //     },
      //   },
      // }
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
  }),
  babel: {
    plugins: [
      [
        // 按需引入antd样式文件
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
    ],
  },
}
