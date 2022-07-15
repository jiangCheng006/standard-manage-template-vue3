/**
 * 整合 modules 下的路由
 * modules 下的路由文件需要通过 export default 导出类型为 AppRouteRecordRaw 的对象或者数组
 */
import { isArray } from '@/utils/is'

const allRoutes: any[] = []
const modules = import.meta.globEager('./modules/*.(ts|js)')
// 获取项目文件路径

if (Object.keys(modules).length > 0) {
  for (const path in modules) {
    const route = modules[path].default
    if (!route) {
      console.error(
        `[router error] load module error: 
         ${path} must export default AppRouteRecordRaw or AppRouteRecordRaw[] router`
      )
      continue
    }
    const pushRoute = isArray(route) ? route : [route]
    allRoutes.push(...pushRoute)
  }
}
export default allRoutes
