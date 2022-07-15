<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="layout-header">
      <!--<nav-bar />-->
      <nav-top user-name="Admin" />
    </a-layout-header>
    <a-layout>
      <side-bar-menu :routers="permissionRoutes" theme="light" :collapsed="setting.collapsed" :handle-click-item="changePage" />
      <a-layout-content class="layout-main">
        <div class="test"></div>
        <app-main />
      </a-layout-content>
    </a-layout>

    <!-- <a-layout class="layout-right"> -->

    <!--<a-layout-footer>Footer</a-layout-footer>-->
    <!-- </a-layout> -->
  </a-layout>
</template>

<script lang="ts" setup>
  import AppMain from './components/AppMain.vue'
  // import NavBar from './components/NavBar.vue'
  import { useSetting } from '@/store/useSetting'
  import { SideBarMenu, NavTop } from '@lishi/manage-components'
  import { computed } from 'vue'
  import { usePermission } from '@/store/usePermission'
  import { useRouter } from 'vue-router'

  const permissionStore = usePermission()
  const permissionRoutes = computed(() => {
    return permissionStore.getRoutes()
  })

  console.log(permissionRoutes)

  const setting = useSetting()
  const router = useRouter()

  function changePage(path: string) {
    console.log(path)
    router.push(path)
  }
</script>

<style lang="less" scoped>
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #f5f5f5;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    background-color: #f5f5f5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.5);
  }
  .layout-wrapper {
    min-height: 100vh;
    .layout-header {
      width: 100%;
      padding: 0;
      //background-color: #218bff;
      //box-shadow: rgb(0 21 41 / 8%) 0 1px 4px;
    }
    .layout-main {
      height: calc(100vh - 64px - 48px);
      margin: 24px;
      overflow-y: auto;
      background: #fff;
      box-shadow: 0px 3px 12px 12px rgba(216, 215, 215, 0.1);
      border-radius: 8px;
      padding: 10px;
      box-sizing: border-box;
    }
    .ant-layout-sider {
      background: #fff;
    }
  }
</style>
