import { App, createVNode } from 'vue'
import * as $Icon from '@ant-design/icons-vue'
import { upperFirst } from 'lodash-es'
// kebab-case 转 camelCase
function kebabCase2CamelCase(sName) {
  const reg = /-(.)/g
  // @ts-ignore
  return sName.replace(reg, (fullMatch, g1, index) => {
    if (index === 0) return g1
    return g1.toUpperCase()
  })
}
// camelCase 转 CamelCase
function translateIconType(iconType) {
  return upperFirst(kebabCase2CamelCase(iconType))
}

const Icon = (props: { icon: string }) => {
  const { icon } = props
  // @ts-ignore
  return createVNode($Icon[translateIconType(icon)])
}

export default {
  install(app: App) {
    app.component('Icon', Icon)
  }
}
