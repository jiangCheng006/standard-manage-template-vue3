import { AppRouteRecordRaw } from '@/router/types'

const errorPageRoutes: AppRouteRecordRaw[] = [
  {
    path: '/:w+',
    name: '*',
    redirect: '/common/404',
    meta: { hidden: true, title: '404' }
  }
]

export default errorPageRoutes
