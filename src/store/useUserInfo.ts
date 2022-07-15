import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo as getUserInfoApi } from '@/api/login'
import { isEmpty } from '@/utils/is'

export const useUserInfo = defineStore('userInfoStore', () => {
  const userInfo = ref({})

  const hasUserInfo = function (): boolean {
    return !isEmpty(userInfo.value)
  }

  const setUserInfo = function (userInfoData: Object) {
    userInfo.value = userInfoData
  }

  const getUserInfo = function (): Promise<any> {
    return new Promise((resolve) => {
      if (!hasUserInfo()) {
        getUserInfoApi().then((res) => {
          setUserInfo(res.data)
          resolve(res.data)
        })
      } else {
        resolve(userInfo.value)
      }
    })
  }

  const clearUserInfo = function () {
    userInfo.value = {}
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    hasUserInfo,
    clearUserInfo
  }
})

export const useToken = defineStore('tokenStore', () => {
  const token = ref('')

  const setToken = function (tokenData: string) {
    token.value = tokenData
  }

  const getToken = function (): string {
    return token.value
  }

  const clearToken = function () {
    token.value = ''
  }

  return {
    token,
    setToken,
    getToken,
    clearToken
  }
})
