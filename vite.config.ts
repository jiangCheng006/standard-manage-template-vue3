import { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import { viteMockServe } from 'vite-plugin-mock'

export default ({ command }: ConfigEnv): UserConfig => {
  /**
   * vite / vite dev / vite serve 的command的值为serve
   * vite build 的command的值为build
   */
  const isBuild = command === 'build'
  return {
    base: './',
    plugins: [
      vue(),
      vueJsx({}),
      WindiCSS(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild
      })
    ],
    resolve: {
      alias: {
        '@': join(__dirname, './src'),
        '#': join(__dirname, './types'),
        '~assets': join(__dirname, './src/assets')
      }
    },
    server: {
      proxy: {
        '/mock': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/mock/, '')
        },
        '/upload': {
          target: 'http://localhost:9108/fileUpload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/upload/, '')
        }
      }
    }
  }
}
