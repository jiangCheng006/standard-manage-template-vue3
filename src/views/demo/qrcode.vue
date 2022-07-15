<template>
  <div class="flex">
    <basic-qrcode :qrcode-string="str" width="200" height="200" />
    <basic-qrcode :qrcode-string="str" width="200" height="200" explain="二维码说明" />
  </div>
</template>

<script setup lang="ts">
  import BasicQrcode from '@/components/Qrcode/qrcode.vue'
  import { ref } from 'vue'
  const str = ref('')

  str.value = 'this is test qrcode string'
</script>
