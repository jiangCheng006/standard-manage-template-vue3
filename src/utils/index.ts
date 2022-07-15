import lodash from 'lodash'
import rules from './common/rules'
import { App, Plugin } from 'vue'
export function validPhone(phone: string | number): boolean {
  const reg = /^1[3-9]\d{9}/
  return reg.test(phone.toString())
}
/**
 *
 *
 * @param {number} lower
 * @param {number} upper
 * @param {boolean} floating
 * @return {*}  {number}
 * @description 产生一个包括 lower 与 upper 之间的数。 如果只提供一个参数返回一个0到提供数之间的数。 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。
 */
export function random(lower: number, upper: number, floating: boolean): number {
  return lodash.random(lower, upper, floating)
}

export function valid(type: string, value: any): boolean {
  const rule = lodash.find(rules, ['title', type])
  if (rule) {
    const reg: RegExp = rule.rule
    return reg.test(value.toString())
  } else {
    throw Error(`can't find ${type}'s rule`)
  }
}

/* 类型判断 */

/* 日期处理 */

/* 通用函数 */

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
