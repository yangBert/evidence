const proxy = require("http-proxy-middleware");

module.exports = function (app) {

    app.use(proxy("/api", {
        target: "http://192.168.1.13:80",
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/',     // rewrite path 实际代理访问的路径会去掉 api 前缀
        },
    }))
    app.use(proxy("/XYL", {
        target: "http://39.105.49.112:80",
        changeOrigin: true,
    }))


};

