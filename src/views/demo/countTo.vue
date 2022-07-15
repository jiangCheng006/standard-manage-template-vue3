<template>
  <div class="flex w-full h-200px items-center">
    <div class="w-1/3 text-center text-50px">
      <CountTo color="red" :end-val="10000" :decimals="0" />
    </div>
    <div class="w-1/3 text-center text-50px">
      <CountTo :end-val="2022" :decimals="2" />
    </div>
    <div class="w-1/3 text-center text-50px">
      <CountTo :end-val="2022" :decimals="0" :duration="2000" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CountTo from '@/components/CountTo/index.vue'
</script>
