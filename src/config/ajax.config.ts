interface AjaxConfigType {
  openFreeLogin: boolean // 非单点登录下,是否开启登录成功后实行免登录
  apiWhiteList: string[] // 请求白名单，在白名单中的api可以不带token
}

const ajaxConfig: AjaxConfigType = {
  openFreeLogin: false,
  apiWhiteList: ['/login']
}

export default ajaxConfig
