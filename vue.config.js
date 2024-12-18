const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist',
  lintOnSave: false,
  publicPath: './',
  devServer: {
    client: {
      overlay: false,
    },
  }
})
