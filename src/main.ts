import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { registerGlobComp } from '@/components/registerGlobComp'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directive'
import 'ant-design-vue/dist/antd.css'
import '@/style/fade.less'
import './permission' // 处理权限相关逻辑
import 'virtual:windi.css'
import '@lishi/manage-components/lib/style.css'

function initApp() {
  const app = createApp(App)
  // 安装store
  setupStore(app)

  // 注册全局组件
  registerGlobComp(app)

  // 安装router
  setupRouter(app)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

initApp()
