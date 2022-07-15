import { AppRouteRecordRaw } from '@/router/types'

const route: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
    name: 'test1',
    component: () => import('@/layout/index.vue'),
    meta: { title: '测试1', icon: 'StepBackwardOutlined', permission: '1', hidden: false },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index.vue'),
        meta: { title: '页面测试1', icon: 'StepBackwardOutlined', permission: '1-1' }
      }
    ]
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('@/layout/index.vue'),
    meta: { title: '测试2', icon: 'StepBackwardOutlined', permission: '2' },
    children: [
      {
        path: 'page1',
        name: 'page1',
        component: () => import('@/views/login/index.vue'),
        meta: { title: '页面测试2', icon: 'StepBackwardOutlined', permission: '3' }
      },
      {
        path: 'page2',
        name: 'page2',
        component: () => import('@/views/login/index.vue'),
        meta: { title: '页面测试3', icon: 'StepBackwardOutlined', permission: '4' }
      }
    ]
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../../../layout/index.vue'),
    meta: { title: 'upload测试', icon: 'StepBackwardOutlined', permission: '2' },
    children: [
      {
        path: 'upload1',
        name: 'upload1',
        component: () => import('../../../views/index.vue'),
        meta: { title: 'upload测试', icon: 'StepBackwardOutlined', permission: '3' }
      }
    ]
  }
  // {
  //   path: '/login3',
  //   component: () => import('@/views/login.vue'),
  //   meta: { title: '测试3', icon: 'StepBackwardOutlined', name: 'login1' }
  // }
]

export default route
