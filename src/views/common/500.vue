<template>
  <div class="blank">
    <img src="@/assets/common/500.png" alt="" />
    <p class="tip">服务器出现异常，请联系管理员</p>
    <div class="btnDiv"><a @click="back">返回上级</a>&nbsp;&nbsp; </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
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
