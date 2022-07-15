import RichText from './index.vue'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component('RichText', RichText)
  }
}
