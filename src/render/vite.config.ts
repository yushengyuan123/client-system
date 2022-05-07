const vue = require('@vitejs/plugin-vue')
const VueJsx = require('@vitejs/plugin-vue-jsx')
const { defineConfig } = require('vite')
const path = require('path')

const viteConfig = defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        dir: path.join(__dirname, 'lib/main/dist')
      }
    }
  },
  plugins: [
    vue(),
    VueJsx(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '~': path.resolve(__dirname, './')
    }
  }
})

module.exports = viteConfig
