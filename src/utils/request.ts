import axios, { Method, AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { message } from 'ant-design-vue'
import { responseCodeEnum } from '@/enums/httpEnum'

// object对象存放每次new CancelToken生成的方法
const source: any = {}
// 每次请求前都会把path放在此数组中，响应成功后清除此请求path
let requestList: string[] = []
// 定义取消方法
function cancelRequest(path: string, allCancel = false) {
  // 请求列表里存在此path，即发起重复请求，把之前的请求取消掉
  if (path && requestList.includes(path) && typeof source[path] === 'function') {
    source[path]('终止请求')
  } else if (!path && allCancel) {
    // allCancel为true则请求列表里的请求全部取消
    requestList.forEach((el) => {
      source[el]('批量终止请求')
    })
  }
}
// 对象转formData格式
function object2FormData(obj: any): FormData {
  const formData = new FormData()
  for (const k in obj) {
    formData.append(k, obj[k])
  }
  return formData
}
type optionsType = {
  url: string
  method?: Method
  data?: any
  isFormData?: boolean
  headers?: AxiosRequestHeaders
}

type fastOptionsType = Omit<optionsType, 'url' | 'method'>

const instance = axios.create({
  baseURL: '',
  timeout: 1000 * 10
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // if(ajaxConfig.apiWhiteList.includes(config.url as string)) {
  //   config.headers!['auth_token'] = 'token'
  // }
  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 获取请求的api
    const path = JSON.stringify(response.config.url)
    // 请求完成后，将此请求从请求列表中移除
    requestList = requestList.filter((item) => !path.includes(item))
    const statusCode = parseInt(response.data.code)
    // 成功
    if (statusCode === responseCodeEnum.SUCCESS) {
      return Promise.resolve(response)
      // 登录失效
    } else if (statusCode === responseCodeEnum.UNAUTHENTICATED) {
      message.error('登录过期,请重新登录')
      return Promise.reject(response)
      // 其他
    } else {
      message.error(response.data.message)
      return Promise.reject(response)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

async function request<T = any>(options: optionsType): Promise<BasicResult<T>> {
  if (requestList.length) {
    cancelRequest(options.url)
  }
  requestList.push(options.url)
  // 设置method默认值
  if (!options.method) {
    options.method = 'GET'
  }
  // 设置默认data数据
  const defaultData = {
    timestamp: new Date().getTime()
  }
  let formatData: FormData | Object = defaultData
  if (options.data) {
    formatData = { ...defaultData, ...options.data }
  }
  // 格式化formData
  if (options.isFormData) {
    formatData = object2FormData(formatData)
  }
  if (options.method.toUpperCase() === 'GET') {
    const { data } = await instance.request<BasicResult<T>>({
      url: options.url,
      method: options.method,
      params: formatData,
      cancelToken: new axios.CancelToken((c) => {
        source[options.url] = c
      })
    })
    return data
  } else {
    const { data } = await instance.request<BasicResult<T>>({
      url: options.url,
      method: options.method,
      data: formatData,
      cancelToken: new axios.CancelToken((c) => {
        source[options.url] = c
      })
    })
    return data
  }
}

request.get = function <T = any>(url: string, options: fastOptionsType = {}) {
  return request<T>({
    url,
    method: 'GET',
    ...options
  })
}

request.post = function <T = any>(url: string, options: fastOptionsType = {}) {
  return request<T>({
    url,
    method: 'POST',
    ...options
  })
}

request.put = function <T = any>(url: string, options: fastOptionsType = {}) {
  return request<T>({
    url,
    method: 'PUT',
    ...options
  })
}

request.delete = function <T = any>(url: string, options: fastOptionsType = {}) {
  return request<T>({
    url,
    method: 'DELETE',
    ...options
  })
}

export default request
