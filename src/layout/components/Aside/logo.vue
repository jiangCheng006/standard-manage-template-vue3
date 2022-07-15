<template>
  <div class="contain">
    <span class="systemName" v-show="!setting.collapsed">{{ baseInfo.title }}</span>
    <!-- <div class="logo" v-show="setting.collapsed">
        <img src="@/assets/logo.svg" alt="">
      </div> -->
  </div>
</template>

<script setup lang="ts">
  import baseInfo from '@/config/base'
  import { useSetting } from '@/store/useSetting'
  const setting = useSetting()
</script>

<style lang="less" scoped>
  .contain {
    margin: 12px 0 10px 0;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      color: #000;
      padding: 0 10px;
      height: 64px;
      overflow: hidden;
    }
    .systemName {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      margin: 0 0 25px 24px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
