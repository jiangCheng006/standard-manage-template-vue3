<template>
  <BasicUpload v-model:value="fileList" accept=".png" :multiple="true" :limit="10" />
</template>

<script setup lang="ts">
  import BasicUpload from '@/components/Upload/index.vue'
  import { ref } from 'vue'
  import { UploadProps } from 'ant-design-vue'

  const fileList = ref<UploadProps['fileList']>([])
</script>
