<template>
  <div class="upload-wrap">
    <a-upload
      v-model:file-list="fileList"
      :action="action"
      :list-type="listType"
      :multiple="multiple"
      :show-upload-list="showUploadList"
      :accept="accept"
      :data="uploadData"
      :headers="headers"
      :disabled="disabled"
      :max-count="limitFileNum"
      @remove="remove"
      @change="handleChange"
      @preview="handlePreview"
      :before-upload="beforeUpload"
      v-bind="$attrs"
    >
      <template #default v-if="fileList.length < limitFileNum">
        <icon icon="PlusOutlined" v-if="type === 'image'" />
        <icon icon="PlusOutlined" v-if="type === 'video'" />
        <a-button v-if="type === 'file'">上传</a-button>
      </template>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" v-if="props.type === 'image'" :src="previewImage" />
      <video alt="example" style="width: 100%" v-if="props.type === 'video'" :src="previewImage" controls></video>
    </a-modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Upload',
    inheritAttrs: false
  })
</script>
<script lang="ts" setup>
  import { computed, nextTick, PropType, ref, watch } from 'vue'
  import { message, UploadChangeParam, UploadProps } from 'ant-design-vue'
  import { isString } from '@/utils/is'
  import baseConfig from '@/config/base'
  import { propTypes } from '@/utils/propTypes'

  const emits = defineEmits(['getUploadData', 'update:value'])

  const props = defineProps({
    name: propTypes.string.def('file'),
    listType: propTypes.oneOf(['picture-card', 'text', 'picture']).def('picture-card'),
    showUploadList: propTypes.bool.def(true),
    multiple: propTypes.bool.def(false),
    disabled: propTypes.bool.def(false),
    placeholder: propTypes.string.def(''),
    maxSize: propTypes.number.def(2),
    limit: propTypes.number.def(1),
    type: propTypes.oneOf(['file', 'image', 'video']).def('image'),
    value: {
      type: [String, Array] as PropType<string | string[]>,
      required: true
    },
    accept: propTypes.string.def(''),
    uploadData: propTypes.object.def({}),
    headers: propTypes.object.def({}),
    width: {
      type: [String, Number] as PropType<string | number>,
      default: 100
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: 100
    }
  })

  const limitFileNum = computed(() => {
    return isString(props.value) ? 1 : props.limit
  })

  // 预览相关
  const previewVisible = ref<boolean>(false)
  const previewImage = ref<string | undefined>('')
  // 绑定的数据
  const fileList: any = ref([])
  // 请求地址
  const action = baseConfig.uploadUrl

  // 取消预览
  const handleCancel = () => {
    previewVisible.value = false
  }

  // 预览
  async function handlePreview(file: UploadProps['fileList'][number]) {
    const fileUrl = file.url || file.response.data.url
    if (props.type === 'file') {
      window.open(fileUrl)
    } else {
      previewImage.value = fileUrl
      previewVisible.value = true
    }
  }

  const imageCount = ref(0)
  // 暂时不加
  function beforeUpload(file: File, filelist: File[]) {
    imageCount.value = filelist.length
    const isLimitNum = filelist.length + fileList.value.length <= limitFileNum.value
    if (!isLimitNum) {
      message.warning(`上传文件总数不得超过${limitFileNum.value}个！`)
      fileList.value.splice((limitFileNum as any) - filelist.length)
      return false
    } else {
      return true
    }
  }
  // 上传状态改变
  function handleChange(info: UploadChangeParam) {
    // console.log(info.file.name)
    // emits('update:value', getFileUrlFromList(props.value, info.fileList))
    if (info.file.status === 'done') {
      imageCount.value--
      imageCount.value === 0 && emits('update:value', getFileUrlFromList(props.value, info.fileList))
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}上传失败！`)
      imageCount.value--
      imageCount.value === 0 && emits('update:value', getFileUrlFromList(props.value, info.fileList))
    }
  }

  // 删除
  function remove(file: any) {
    const index = fileList.value.findIndex((item: any) => item.uid === file.uid)
    fileList.value.splice(index, 1)
    emits('update:value', getFileUrlFromList(props.value, fileList.value))
    return false
  }
  // 获取fileList中的url
  function getFileUrlFromList(value: string | string[], fileList: any) {
    let urls: string[] | string = []
    urls = fileList
      .filter((file: any) => file.status === 'done')
      .map((file: any) => {
        return file.url || file.response.data.url
      })
    return isString(value) ? urls[0] || '' : urls
  }

  // 初始化fileList
  const setFileList = function (value: string | string[]) {
    const formatFileList: any[] = []
    if (isString(value)) {
      formatFileList.push({
        name: 'name',
        status: 'done',
        uid: '01',
        url: value
      })
    } else {
      value.forEach((url: string, i: number) => {
        formatFileList.push({
          name: 'name' + i,
          status: 'done',
          uid: '-' + (i + 1),
          url
        })
      })
    }
    return formatFileList
  }
  watch(
    () => props.value,
    (newValue, oldValue) => {
      fileList.value = newValue.length ? setFileList(newValue) : []
    },
    { immediate: true, deep: true }
  )

  const widthComputed = computed(() => {
    return props.width.toString().endsWith('px') ? props.width : props.width + 'px'
  })
  const heightComputed = computed(() => {
    return props.height.toString().endsWith('px') ? props.height : props.height + 'px'
  })
</script>
<style scoped lang="less">
  .upload-wrap {
    :deep(.ant-upload-select-picture-card i) {
      font-size: 32px;
      color: #999;
    }
    :deep(.ant-upload-select-picture-card .ant-upload-text) {
      margin-top: 8px;
      color: #666;
    }
    :deep(.ant-upload-list-picture-card .ant-upload-list-item) {
      width: v-bind(widthComputed);
      height: v-bind(heightComputed);
    }
    :deep(.ant-upload.ant-upload-select-picture-card) {
      width: v-bind(widthComputed);
      height: v-bind(heightComputed);
    }
    :deep(.ant-upload-list-picture-card-container) {
      width: v-bind(widthComputed);
      height: v-bind(heightComputed);
    }
  }
</style>
