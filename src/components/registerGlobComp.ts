import type { App } from 'vue'
import Antd from 'ant-design-vue'
import Icon from './icon'
import upload from './Upload'
import RichText from './RichText'
import AreaSelect from './AreaSelect'
import GetLocation from './GetLocation'
import Table from './CommonTable/Table.vue'

export function registerGlobComp(app: App) {
  app.use(Antd).use(Icon).use(upload).use(RichText).use(AreaSelect).use(GetLocation)
  app.component('CommonTable', Table)
}
