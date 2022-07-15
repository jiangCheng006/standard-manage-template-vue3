/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App, Directive, DirectiveBinding } from 'vue'

import { usePermission } from '@/store/usePermission'

function isAuth(el: Element, binding: any) {
  const permissionStore = usePermission()
  if (el.parentNode!.hasChildNodes() && [permissionStore.buttonPermission].includes(binding.value)) {
    el.parentNode!.removeChild(el)
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding)
}

const authDirective: Directive = {
  mounted
}

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective)
}

export default authDirective
