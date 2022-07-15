import { AppRouteRecordRaw } from '@/router/types'
import Layout from '@/layout/index.vue'
import SecondaryLayout from '@/layout/secondary.vue'

const route: AppRouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    component: Layout,
    meta: { title: 'demo', icon: 'StepBackwardOutlined', hidden: false },
    children: [
      {
        path: '/demo/qrcode',
        redirect: '/demo/qrcode/index',
        name: 'DemoQrcode',
        component: SecondaryLayout,
        meta: { title: '二维码示例', icon: 'StepBackwardOutlined', hidden: false },
        children: [
          {
            path: '/demo/qrcode/index',
            name: 'DemoQrcodeIndex',
            component: () => import('@/views/demo/qrcode.vue'),
            meta: { title: '二维码示例', icon: 'StepBackwardOutlined' }
          }
        ]
      },
      {
        path: '/demo/countTo',
        redirect: '/demo/countTo/index',
        name: 'DemoCountTo',
        component: SecondaryLayout,
        meta: { title: 'CountTo', icon: 'StepBackwardOutlined', hidden: false },
        children: [
          {
            path: '/demo/countTo/index',
            name: 'DemoCountToIndex',
            component: () => import('@/views/demo/countTo.vue'),
            meta: { title: 'CountTo', icon: 'StepBackwardOutlined' }
          }
        ]
      },
      {
        path: '/demo/upload',
        redirect: '/demo/upload/index',
        name: 'DemoUpload',
        component: SecondaryLayout,
        meta: { title: '上传示例', icon: 'StepBackwardOutlined', hidden: false },
        children: [
          {
            path: '/demo/upload/index',
            name: 'DemoUploadIndex',
            component: () => import('@/views/demo/upload.vue'),
            meta: { title: '上传示例', icon: 'StepBackwardOutlined' }
          }
        ]
      }
    ]
  }
]

export default route
