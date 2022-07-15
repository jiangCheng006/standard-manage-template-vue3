export default {
  path: 'common',
  name: 'common',
  component: () => import('@/views/common/main.vue'),
  meta: { title: 'common' },
  children: [
    {
      path: '404',
      name: '404',
      component: () => import('@/views/common/404.vue'),
      meta: { title: '404' }
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/views/common/500.vue'),
      meta: { title: '500' }
    },
    {
      path: 'error',
      name: 'error',
      component: () => import('@/views/common/error.vue'),
      meta: { title: 'error' }
    }
  ]
}
