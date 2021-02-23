const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'https://food-1300857246.cos.ap-chengdu.myqcloud.com' : '/', //改成存储桶的外链地址主路径
    productionSourceMap:false,
    configureWebpack: config => {
            if (process.env.NODE_ENV === 'production') {
              return {
                plugins: [
                  new CompressionPlugin({
                    test: /\.(js|css)$/,// 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false, // 不删除源文件
                  })
                ]
              }
            }
          }
}