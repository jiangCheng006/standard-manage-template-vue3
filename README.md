<h1 align="center">manager-system-pro-vue3</h1>

<p align="center">  
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.js" />
    <img src="https://img.shields.io/badge/-AntDesignVue3.x-11aaff" />
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
    <img src="https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white" />
    <img src="https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Prettier-ef9421?logo=Prettier&logoColor=white" alt="Prettier">
    <img src="https://img.shields.io/badge/-Scss-1D365D?logo=sass&logoColor=white" alt="Less">
    <img src="https://img.shields.io/badge/-Windi css-06B6D4?logo=Windi%20CSS&logoColor=white" alt="Windi css">
<p> 
> 本项目初衷是为了缓解公司内部，管理系统开发没有统一源头，各个项目在后台管理系统开发的时候重复引入，以及查找资料和库选型的时候消耗比较多的时间。本项目集合了项目常用的库以及常用组件封装。内置了一些公司内部子系统初始化的流程。



# 项目介绍

## 主要插件以及文档
1. vue3.2 [官方文档](https://v3.cn.vuejs.org/)
2. axios [官方文档](https://axios-http.com/zh/docs/intro)
3. vue-router 4.x [官方文档](https://router.vuejs.org/zh/introduction.html)
4. pinia [官方文档](https://pinia.vuejs.org/getting-started.html)
5. ant-design-vue 3.x [官方文档](https://next.antdv.com/components/overview-cn/)
6. vite [官方文档](https://cn.vitejs.dev/guide/)
7. windi css [官方文档](https://cn.windicss.org/guide/)

## 项目目录结构

````
```
├── src     
│    ├── api             // api接口文件   
│    ├── assets          // 静态文件   
│    ├── components      // 业务通用组件   
│    ├── config          // 配置文件
│    ├── directive       // 全局指令
│    ├── enums           // 枚举类
│    ├── hooks           // 全局hooks
│    ├── layout          // 布局文件
│    ├── router          // 路由文件   
│    ├── store           // 状态管理   
│    ├── style           // 公用样式以及reset样式   
│    ├── utils           // 工具类 
│    │   ├── is.ts                     // 类型判断工具函数
│    │   ├── piniaStoragePluginCreator // pinia持久化插件 
|    │   └── request                   // axios封装
│    ├── views           // 业务页面 
│    ├── App.vue         // vue模板入口   
│    ├── main.ts         // vue模板js
│    └── permission      // 鉴权
├── types                // .d.ts 全局类型定义   
├── windi.config.js      // windi全局配置   
├── tsconfig.json        // ts配置
└── vite.config.ts       // vite全局配置  
```
````

## vue3.2
1. 可使用` <script setup>` 代替setup()函数的方法开发组件

   ```vue
   <template>
   	<div>
           {{ name }}
       </div>
   <template>
       
   <script	setup lang='ts'>
   import { ref } from 'vue'
   const name = ref<string>('lishi')
   // 无需return name字段 模板中可直接使用
   </script>
   ```

2. 新增`<style> v-bind`

   ```vue
   <template>
     <button @click="color = color === 'red' ? 'green' : 'red'">
       Color is: {{ color }}
     </button>
   </template>
   
   <script setup lang='ts'>
   import { ref } from 'vue'
   const color = ref('red')
   </script>
   
   <style scoped>
   button {
     color: v-bind(color);
   }
   </style>
   ```

## axios

1. 本项目对`axios`进行了二次封装，通过导入`utils/request`方法暴露出api接口业务中调用

   ```typescript
   import request from '@/utils/request'
   import { loginForm, loginResult, sendSmsForm } from '@/api/types/login'
   
   enum Api {
      login: '/login'
   }
   // 完整书写模式
   export function login (data: loginForm) {
     return request<loginResult>({
       method: 'post',
       url: Api.login,
       data
     })
   }
   // 快捷书写模式
   export const loginFast = (data: loginForm) => request.post<loginResult>(Api.login, { data })
   ```

2. ```
   ├── api     
   │    ├── user         
   │    │   ├── index.ts   // 用户模块相关接口 
   │    │   └── types.ts   // 用户模块相关类型
   │    ├── module-A         
   │    │   ├── index.ts   // 模块A相关接口
   │    │   └── index.ts   // 模块A相关类型
   
   ```



## Router搭配权限检验生成动态路路由，并自动生成左侧菜单栏

1. 业务router可直接在 `router/asyncRoutes/modules` 中进行添加，后续无需进行任何处理，仅关注自身业务即可 。*建议按模块区分路由，后续即可通过文件名快速找到对应的模块*

2. 在项目初始化时会通过权限校验过程, 筛选当前角色的所有页面以及按钮权限, 并生成动态路由 *说明:可通过config/base.ts 中的 withPermission 开关权限系统*
3. 工作流程
   ![工作流程](http://lishiots.oss-cn-hangzhou.aliyuncs.com/webstatic/standard-manage-template/permission-flow.png)

      ```typescript
      router.beforeEach(async(to, from, next) => {
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
                accessedRoutes.forEach(route => {
                  router.addRoute(route)
                })
                next({ ...to, replace: true })
              } catch (error) {
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
      ```

5. 通过上述筛选以后的路由会自动生成左侧菜单栏， 具体生成逻辑可前往`layout/component/Aside/index`查看

## pinia下一代vuex的替代方案(搭配vue-tools使用)

1. why pinia

   1. **直观** 更加直观的数据管理，更利于后续的维护
   2. **类型检查** 更好的类型检查支持
   3. **拓展性** 更好的拓展性，可安装pinia插件辅助开发
   4. **更好的模块化支持** 在编写代码时各个模块之间没有耦合与冲突
   5. **轻量** pinia大小仅为1kb
   6. **vue-tools工具支持** vue-tools提供增强的 Vue 2 和 Vue 3 开发体验。

2.  定义store的两种方法

```typescript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

```typescript
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

3. 使用

   ```typescript
   import { useCounterStore } from '@/stores/counter'
   
   export default {
     setup() {
       const counter = useCounterStore()
   
       counter.count++
       // with autocompletion ✨
       counter.$patch({ count: counter.count + 1 })
       // or using an action instead
       counter.increment()
     },
   }
   ```

4. piniaStoragePluginCreator

   1. pinia持久化存储插件，在项目初始化时，可选择需要持久化存储的store

   2. 使用方法

      ```typescript
      import { createPinia } from 'pinia'
      
      const pinia = createPinia()
      import piniaPluginCreator from '@/utils/PiniaStoragePluginCreator'
      
      // 第一个参数为store id, 类型为string | string[], 传入单个的store id或者传入store id的数组
      // 第二个参数为存储类型'localstorage' | 'sessionStorage'， 默认值为 'localstorage'
      
      // 将tokenStore中的数据存入sessionStorage中
      const piniaPlugin = piniaCreator('tokenStore', 'sessionStorage')
      // const piniaPlugin = piniaPluginCreator(['tokenStore', 'menuStore'], 'sessionStorage')
      // const piniaPlugin = piniaCreator('tokenStore', 'localstorage')
      // const piniaPlugin = piniaPluginCreator(['tokenStore', 'menuStore'], 'localstorage')
      
      pinia.use(piniaPlugin)
      
      export default pinia
      ```

## TODO-LIST

- [ ] `commonForm `组件优化与使用文档
- [ ] `commonTable `组件优化与使用文档
- [x] `upload`上传组件优化
- [x] 引入`windi css`
- [x] 引入`eslint `+` prettier` 统一格式代码
- [x] 引入mock
- [x] 坐标拾取器组件
- [x] 省市区组件
- [x] 二维码组件


 
