<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <slot v-bind="data || {}"></slot>
    </template>
  </Button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AButton',
    inheritAttrs: false
  })
</script>
<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { Button } from 'ant-design-vue'
  import { buttonProps } from './props'
  import { useAttrs } from '@/hooks/useAttrs'

  const props = defineProps(buttonProps)
  // get component class
  const attrs = useAttrs({ excludeDefaultKeys: false })
  const getButtonClass = computed(() => {
    const { color, disabled } = props
    return [
      {
        [`ant-btn-${color}`]: !!color,
        [`is-disabled`]: disabled
      }
    ]
  })

  // get inherit binding value
  const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>
