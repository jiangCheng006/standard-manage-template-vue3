<template>
  <template v-if="!item.meta?.hidden">
    <template v-if="filterChildLength > 0">
      <a-sub-menu v-if="filterChildLength > 1" :key="item.path">
        <template #icon v-if="item.meta && item.meta.icon">
          <icon :icon="item.meta.icon" />
        </template>
        <template #title>{{ item.meta.title }}</template>
        <aside-menu-item v-for="child of item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" />
      </a-sub-menu>

      <template v-else>
        <aside-menu-item :key="onlyOneChildInfo.path" :item="onlyOneChildInfo" :base-path="resolvePath(onlyOneChildInfo.path)" />
      </template>
    </template>

    <a-menu-item v-else :key="item.path" @click="changePage(basePath)">
      <template #icon v-if="item.meta && item.meta.icon">
        <icon :icon="item.meta.icon" />
      </template>
      {{ item.meta.title }}
    </a-menu-item>
  </template>
</template>
<script lang="ts">
  export default {
    name: 'AsideMenuItem'
  }
</script>
<script setup lang="ts">
  import { computed, ComputedRef } from 'vue'
  import { useRouter } from 'vue-router'
  import path from 'path-browserify'
  import { AppRouteRecordRaw } from '@/router/types'
  const router = useRouter()
  const props = defineProps({
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  })

  const filterChildLength: ComputedRef<number> = computed(() => {
    // 可见的子集的长度
    let showChildrenLength = 0
    const children = props.item.children
    if (children && children.length) {
      showChildrenLength = children.filter((child: any) => !child.meta.hidden).length
    }
    return showChildrenLength
  })
  // 获取当只有一个子集或者一个状态不为hidden的子集
  const onlyOneChildInfo: ComputedRef<AppRouteRecordRaw> = computed(() => {
    return props.item.children.filter((child: any) => !child.meta.hidden)[0]
  })

  function changePage(path: string) {
    if (isExternal(path)) {
      window.location.href = path
    } else {
      router.push(path)
    }
  }
  function isExternal(path: string) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
  function resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(props.basePath)) {
      return props.basePath
    }
    return path.resolve(props.basePath, routePath)
  }
</script>

<style></style>
