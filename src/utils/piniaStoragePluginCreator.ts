/**
 * pinia本地存储插件
 */
import { PiniaPlugin, PiniaPluginContext } from 'pinia'
import { watch } from 'vue'

type storageType = 'localStorage' | 'sessionStorage'
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * pinia本地存储插件生成器
 * @param storeIdList 需要进行本地存储的 storeId[]
 * @param storageType 本地存储类型
 * @return PiniaStoragePlugin
 */
function PiniaStoragePluginCreator(storeIdList: string[], storageType?: storageType): PiniaPlugin
/**
 * pinia本地存储插件生成器
 * @param storeId 需要进行本地存储的 storeId
 * @param storageType 本地存储类型
 * @return PiniaStoragePlugin
 */
function PiniaStoragePluginCreator(storeId: string, storageType?: storageType): PiniaPlugin
function PiniaStoragePluginCreator(value: string | string[], storageType: storageType = 'localStorage'): PiniaPlugin {
  if (isString(value)) {
    return function (ctx: PiniaPluginContext) {
      const { $id, $state } = ctx.store
      if ($id === value) {
        ctx.store.$state = JSON.parse(window[storageType].getItem($id) as any)
        watch(
          $state,
          () => {
            window[storageType].setItem($id, JSON.stringify($state))
          },
          { deep: true }
        )
      }
    }
  } else {
    return function (ctx: PiniaPluginContext) {
      const { $id, $state } = ctx.store
      const length = value.length
      for (let i = 0; i < length; i++) {
        if ($id === value[i]) {
          ctx.store.$state = JSON.parse(window[storageType].getItem($id) as any)
          watch(
            $state,
            () => {
              window[storageType].setItem($id, JSON.stringify($state))
            },
            { deep: true }
          )
        }
      }
    }
  }
}

export default PiniaStoragePluginCreator
