<template>
  <div class="blank">
    <img src="@/assets/common/error.png" alt="" />
    <p class="tip">错误码：{{ _useError.errObj.errCode }}，错误信息：{{ _useError.errObj.msg }}</p>
    <div class="btnDiv"><a @click="back">返回上级</a>&nbsp;&nbsp; </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useError } from '@/store/useError'
  const router = useRouter()
  const _useError = useError()
  const back = () => {
    router.back()
  }
</script>

<style lang="less" scoped>
  .blank {
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin: 15% auto;
    .tip {
      margin-top: 15px;
      text-align: center;
    }
    .btnDiv {
      margin: 15px auto;
      font-size: 16px;
      overflow: hidden;
      width: 145px;
    }
  }
</style>
