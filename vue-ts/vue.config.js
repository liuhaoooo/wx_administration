module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://101.37.25.179:6000/api',
        // target: 'http://127.0.0.1:8848/api',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
