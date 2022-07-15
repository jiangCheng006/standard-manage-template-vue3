// 获取权限逻辑
import { useUserInfo, useToken } from '@/store/useUserInfo' // 用户信息相关store
import { usePermission } from '@/store/usePermission' // 权限相关store
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import baseConfig from '@/config/base'
import asyncRoutes from '@/router/asyncRoutes'

NProgress.configure({ showSpinner: false }) // NProgress Configuration 关闭右上角loading

const whiteList = ['/login', '/common/404', '/common/error', '/common/500'] // 无需进行重定向的白名单
// @ts-ignore
router.beforeEach(async (to, from, next) => {
  const userInfoStore = useUserInfo()
  const permissionStore = usePermission()
  const tokenStore = useToken()
  NProgress.start()
  // 获取用户token
  const hasToken = tokenStore.getToken()
  // 如果有token
  if (hasToken) {
    // 有token前往login页面 直接重定向至首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = userInfoStore.hasUserInfo()
      if (hasGetUserInfo) {
        next()
        NProgress.done()
      } else {
        try {
          const permissions: any[] = await userInfoStore.getUserInfo()
          const accessedRoutes = permissionStore.generateRoutes(baseConfig.withPermission ? permissions : asyncRoutes)
          permissionStore.setRoutes(accessedRoutes)
          accessedRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 用户没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 当前跳转页面在白名单中
      next()
      NProgress.done()
    } else {
      // 用户没有token以及跳转页面不在白名单 前往登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 跳转页面后关闭进度条
  NProgress.done()
})
