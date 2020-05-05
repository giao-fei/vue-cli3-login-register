module.exports = {
  devServer: {
    open: true, // 配置自动启动浏览器
    // host: 'localhost',
    port: '8081',
    // 设置代理 devServer.proxy 可以是一个指向开发环境 API 服务器的字符串
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 域名 这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:8080
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': '' // // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      }
    }
  }

}