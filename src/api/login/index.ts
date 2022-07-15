import request from '@/utils/request'
import { loginForm, loginResult, sendSmsForm } from './types'

enum Api {
  login = '/mock/login',
  userInfo = '/mock/userInfo',
  sendSms = '/mock/sendSms',
  logout = '/mock/logout'
}

export const login = (data: loginForm) => {
  return request.post<loginResult>(Api.login, { data })
}

export const logout = () => request.post(Api.logout)

export const sendSms = (data: sendSmsForm) => request.post(Api.sendSms, { data })

export const getUserInfo = () => request.post(Api.userInfo)
