/**
 * 相应状态码枚举类
 */
export enum responseCodeEnum {
  SUCCESS = 200, // 成功
  UNAUTHENTICATED = 8302 // token过期，未登录等
  // 暂定其他的为失败
}
