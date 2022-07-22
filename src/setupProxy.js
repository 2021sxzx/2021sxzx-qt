const {createProxyMiddleware} = require('http-proxy-middleware')
const {searchApiURL, apiURL} = require('./config/config')

// setupProxy.js 介绍：https://www.cnblogs.com/spirit-ling/p/13327917.html，用于代理转发（跨域）请求
// setupProxy.js 只在 process.env.NODE_ENV === 'development' 的时候被调用，即只在开发环境使用。
// 服务端跨域请求的时候可以使用 Nginx 等解决方案。
module.exports = function (app) {
    app.use(
        '/searchApi',
        createProxyMiddleware({
            target: searchApiURL,
            // pathRewrite: {
            //     '^/searchApi': '' //remove /api
            // },
            changeOrigin: true,
            secure: true
        })
    )
    app.use(
        '/api',
        createProxyMiddleware({
            target: apiURL,
            changeOrigin: true,
            secure: true
        })
    )
};
