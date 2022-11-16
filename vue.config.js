const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  outputDir: 'dist',
  productionSourceMap: false,
  publicPath: "/",
  configureWebpack: (config) => {
    //生产环境取消 console.log
    if (isProduction) {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
  chainWebpack: (config) => {
    //生产环境，开启js\css压缩
    if (isProduction) {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          algorithm: "gzip",
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        })
      );
    }
    config.plugin("html").tap((args) => {
      args[0].title = "用户中心";
      return args;
    });
  },
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint检查
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  //本地代理解决跨域问题
  devServer: {
    proxy: {
      //配置跨域
      "/api": {
        //配置跨域的名字
        target: process.env.VUE_APP_BASE_API,//跨域的地址
        // target: 'http://test-signaturecard.laxcensoft.com:19012',
        changOrigin: true, //是否跨域
        pathRewrite: {
          //当前的名字
          "^/api": "",
        },
      },
    },
  },
});
