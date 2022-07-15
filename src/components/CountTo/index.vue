<template>
  <span :style="{ color }">{{ value }}</span>
</template>

<script setup lang="ts">
  import { TransitionPresets, useTransition } from '@vueuse/core'
  import { isNumber } from '@/utils/is'
  import { computed, onMounted, ref, unref, watch } from 'vue'
  import { propTypes } from '@/utils/propTypes'
  const props = defineProps({
    startVal: propTypes.number.def(0),
    endVal: propTypes.number.def(2022),
    duration: propTypes.number.def(1000),
    autoplay: propTypes.bool.def(true),
    decimals: propTypes.number.def(1),
    prefix: propTypes.string.def(''),
    suffix: propTypes.string.def(''),
    separator: propTypes.string.def(','),
    decimal: propTypes.string.def('.'),
    color: propTypes.string.def('#000'),
    useEasing: propTypes.bool.def(true),
    transition: propTypes.oneOf(Object.keys(TransitionPresets)).def('linear')
  })
  const emit = defineEmits(['started', 'finished'])
  const source = ref(props.startVal)
  let outputValue = useTransition(source)
  const value = computed(() => formatNumber(unref(outputValue)))
  watch([() => props.startVal, () => props.endVal], () => {
    if (props.autoplay) {
      start()
    }
  })
  onMounted(() => {
    props.autoplay && start()
  })
  function start() {
    run()
    source.value = props.endVal
  }
  function reset() {
    source.value = props.startVal
    run()
  }
  function run() {
    outputValue = useTransition(source, {
      duration: props.duration,
      onFinished: () => emit('finished'),
      onStarted: () => emit('started'),
      transition: TransitionPresets[props.transition]
    })
  }
  function formatNumber(num: number | string) {
    if (!num && num !== 0) {
      return ''
    }
    const { decimals, decimal, separator, suffix, prefix } = props
    num = Number(num).toFixed(decimals)
    num += ''
    const x = num.split('.')
    let x1 = x[0]
    const x2 = x.length > 1 ? decimal + x[1] : ''
    const rgx = /(\d+)(\d{3})/
    if (separator && !isNumber(separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, `$1${separator}$2`)
      }
    }
    return prefix + x1 + x2 + suffix
  }
</script>
