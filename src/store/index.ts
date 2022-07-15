import type { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
import piniaPluginCreator from '@/utils/piniaStoragePluginCreator'
// 将tokenStore中的数据存入sessionStorage中
// const piniaPlugin = piniaCreator('tokenStore', 'sessionStorage')
const piniaPlugin = piniaPluginCreator(['tokenStore', 'menuStore'], 'sessionStorage')

pinia.use(piniaPlugin)

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export { pinia }
