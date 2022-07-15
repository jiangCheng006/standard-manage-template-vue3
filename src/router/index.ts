import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import common from './common'
import { AppRouteRecordRaw } from '@/router/types'
const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index.vue'),
        meta: { title: '首页', icon: 'home' }
      },
      common
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[]
})
export default router

export function setupRouter(app: App<Element>) {
  app.use(router)
}
