<template>
  <logo />
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light">
    <aside-menu-item v-for="item of permissionRoutes" :key="item.path" :item="item" :base-path="item.path" />
  </a-menu>
  <div class="toggle-collapsed">
    <a-button type="primary" style="margin-bottom: 16px" @click="settingStore.toggleCollapsed">
      <icon icon="MenuUnfoldOutlined" v-if="settingStore.collapsed" />
      <icon icon="MenuFoldOutlined" v-else />
    </a-button>
  </div>
</template>

<script setup lang="ts">
  import Logo from './logo.vue'
  import AsideMenuItem from './AsideMenuItem.vue'
  import { computed, onMounted, ref, watch } from 'vue'
  import { usePermission } from '@/store/usePermission' // 权限相关store
  import { useSetting } from '@/store/useSetting'
  import { useRoute } from 'vue-router'
  import { useMenu } from '@/store/useMenu'

  const settingStore = useSetting()
  const permissionStore = usePermission()

  const permissionRoutes = computed(() => {
    return permissionStore.getRoutes()
  })

  const selectedKeys = ref<string[]>([])
  const openKeys = ref<string[]>([])

  let route = useRoute()
  const menuStore = useMenu()
  onMounted(() => {
    console.log(route.path)
    const { openKeys: openKeysInit, selectedKeys: selectedKeysInit } = menuStore.getKeys()
    selectedKeys.value = selectedKeysInit
    openKeys.value = openKeysInit
    console.log(selectedKeys.value)
    console.log(openKeys.value)
  })
  watch(route, () => {
    menuStore.setKeys(openKeys.value, selectedKeys.value)
  })
</script>

<style lang="less" scoped>
  .layout-aside {
    height: 100vh;
    .layout-logo {
      background-color: #336699;
      color: #fff;
      padding: 0 !important;
    }
    .layout-menu {
      height: calc(100vh - 64px);
      background-color: #336699;
      display: inline;
    }
  }
  .toggle-collapsed {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
</style>
