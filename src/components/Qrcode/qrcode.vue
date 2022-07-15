<template>
  <div :style="qrcodeStyle">
    <img v-if="qrcodeString" class="w-full h-full" :src="qrcodeUrl" alt="qrcode" />
    <div v-if="explain" class="w-full text-center truncate px-2">{{ explain }}</div>
  </div>
</template>

<script setup lang="ts">
  import QrCode from 'qrcode'
  import { computed, PropType, ref, watch } from 'vue'
  import { isNumber } from '@/utils/is'

  const props = defineProps({
    qrcodeString: {
      type: String as PropType<string>,
      required: true
    },
    explain: {
      type: String as PropType<string>,
      default: ''
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 100
    },
    height: {
      type: [Number, String] as PropType<number | string>,
      default: 100
    }
  })

  watch(
    () => props.qrcodeString,
    (newVal) => {
      createQrcode(newVal as string)
    },
    { immediate: true }
  )

  const qrcodeUrl = ref('')
  function createQrcode(qrcodeStr: string) {
    if (qrcodeStr) {
      QrCode.toDataURL(qrcodeStr)
        .then((url) => {
          qrcodeUrl.value = url
          console.log(url)
        })
        .catch((err) => {
          console.error('create qrcode error:', err)
        })
    }
  }

  function getQrcodeSize() {
    const style = {
      width: '0px',
      height: '0px'
    }
    style.width = isNumber(props.width) || !props.width.endsWith('px') ? props.width + 'px' : props.width
    style.height = isNumber(props.height) || !props.height.endsWith('px') ? props.height + 'px' : props.height
    return style
  }

  const qrcodeStyle = computed(() => getQrcodeSize())
</script>
