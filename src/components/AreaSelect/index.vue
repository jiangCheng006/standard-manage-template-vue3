<template>
  <a-cascader :value="value" v-bind="$attrs" :options="areaData.data" placeholder="请选择" @change="handleChange" />
</template>

<script setup lang="ts">
  import areaData from '@/utils/area.json'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const props = defineProps({
    value: {
      type: Array,
      required: true
    }
  })

  const emits = defineEmits(['update:value'])

  function handleChange(e: string[]) {
    emits('update:value', e)
  }
</script>
