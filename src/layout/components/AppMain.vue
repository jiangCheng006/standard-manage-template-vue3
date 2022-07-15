<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-slide" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #edf0f3;
  }
  .fixed-header + .app-main {
    padding-top: 50px;
  }
</style>
