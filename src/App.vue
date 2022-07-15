<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  const locale = zhCN
</script>

<style>
  @import './style/reset.css';
  @import './style/ant.less';
</style>
