import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { errModel } from '@/store/types/error'
export const useError = defineStore('useErrorStore', () => {
  const router = useRouter()
  const errObj = ref<errModel>({
    errCode: 0,
    msg: ''
  })
  const setError = function (obj: errModel) {
    errObj.value = obj
    router.push({ path: '/common/error' })
  }
  return {
    errObj,
    setError
  }
})
