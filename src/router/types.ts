import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name?: string
  meta?: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  fullPath?: string
}

interface RouteMeta extends Record<string | number | symbol, unknown> {
  // 显示菜单中的标题
  title?: string
  // Whether not to cache
  ignoreKeepAlive?: boolean
  // 菜单中的icon
  icon?: string
  // 隐藏菜单
  hidden?: boolean
  // 是否是外链
  isLink?: boolean
}
