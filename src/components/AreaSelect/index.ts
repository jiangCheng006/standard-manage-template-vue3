import AreaSelect from './index.vue'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component('AreaSelect', AreaSelect)
  }
}
