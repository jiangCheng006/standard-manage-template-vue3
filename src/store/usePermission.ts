import { defineStore } from 'pinia'
import { ref } from 'vue'
import asyncRoutes from '@/router/asyncRoutes'
import { cloneDeep } from 'lodash-es'
import errorPage from '@/router/errorPage'
import baseConfig from '@/config/base'

/**
 * 递归筛选路由(通过本地路由的meta中permission与接口获取的路由列表比对)
 * @param {Array} userRoutes 用户路由权限
 * @param {Array} asyncRoutes 全局权限路由
 * @return {Array} filterRoutes 筛选后的路由
 */
function recursionRouter(userRoutes: any[], asyncRoutes: any[]) {
  const filterRoutes: any[] = []
  if (!asyncRoutes) asyncRoutes = []
  asyncRoutes.forEach((asyncRoute) => {
    userRoutes.forEach((userRoute) => {
      if (asyncRoute.meta && userRoute.code === asyncRoute.meta.permission) {
        if (userRoute.children && userRoute.children.length > 0) {
          asyncRoute.children = recursionRouter(userRoute.children, asyncRoute.children)
        }
        filterRoutes.push(asyncRoute)
      }
    })
  })
  return filterRoutes
}

function filerButtonPermission(userRouters: any[]) {
  const buttonPermission: any[] = []
  userRouters.forEach((router) => {
    // 1：菜单 2：按钮
    if (router.isMenu === '2') {
      buttonPermission.push(router.permission)
    }
    if (router.children && router.children.length > 0) {
      buttonPermission.push(...filerButtonPermission(router.children))
    }
  })
  return buttonPermission
}

export const usePermission = defineStore('permissionStore', () => {
  // 所有需要判断权限的route
  // const allAsyncRoutes = asyncRoutes
  // 用户权限route(接口获取)
  // const userRoute = ref([])
  // 对比后获得的route
  const routes = ref<any[]>([])
  // 按钮权限列表
  const buttonPermission = ref<string[]>([])

  const generateButtonPermission = function (userRoutes: any[]) {
    buttonPermission.value = filerButtonPermission(userRoutes)
  }

  const generateRoutes = function (userRoutes: any[] = []): any[] {
    let accessedRoutes: any = []
    if (baseConfig.withPermission) {
      accessedRoutes = recursionRouter(userRoutes, cloneDeep(asyncRoutes))
      // 筛选按钮级别权限
      generateButtonPermission(userRoutes)
    } else {
      accessedRoutes = userRoutes
    }
    // 筛选完成后添加通配符使位置的路由跳转至404页面
    accessedRoutes.push(...errorPage)
    return accessedRoutes
  }
  function setRoutes(routesPayload: any) {
    routes.value = routesPayload
  }
  function getRoutes() {
    return routes.value
  }
  return {
    routes,
    buttonPermission,
    generateRoutes,
    setRoutes,
    getRoutes
  }
})
