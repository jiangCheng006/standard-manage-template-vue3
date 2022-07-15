import { defineStore } from 'pinia'
import { ref, unref } from 'vue'

export const useMenu = defineStore('menuStore', () => {
  const openKeysRef = ref<string[]>([])
  const selectedKeysRef = ref<string[]>([])
  function setKeys(openKeys: string[], selectedKeys: string[]) {
    openKeysRef.value = openKeys
    selectedKeysRef.value = selectedKeys
  }

  function getKeys() {
    return {
      openKeys: unref(openKeysRef),
      selectedKeys: unref(selectedKeysRef)
    }
  }

  return {
    setKeys,
    getKeys,
    openKeysRef,
    selectedKeysRef
  }
})
