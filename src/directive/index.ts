/**
 * 配置并注册全局指令
 */
import type { App } from 'vue'
import { setupPermissionDirective } from './permission'

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app)
  /* 增加其他安装全局指令方法 */
}
