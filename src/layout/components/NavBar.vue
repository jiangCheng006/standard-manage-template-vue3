<template>
  <div class="navbar">
    <div class="logo" @click="returnHome">
      <img src="@/assets/logo.svg" alt="" />
    </div>
    <a-dropdown>
      <a class="ant-dropdown-link flex items-center">
        <img class="avatar" src="https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto" alt="" />
        <span class="ant-dropdown-link"> Admin<icon icon="DownOutlined" style="margin-left: 6px" /> </span>
      </a>
      <template #overlay>
        <a-menu @click="onLogout">
          <a-menu-item key="Logout">
            <icon icon="LoginOutlined" />
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { useToken, useUserInfo } from '@/store/useUserInfo'
  import { useRouter } from 'vue-router'
  import { logout } from '@/api/login'
  const router = useRouter()
  const userInfoStore = useUserInfo()
  const tokenStore = useToken()
  // const permissionStore = usePermission()

  function returnHome() {
    router.push('/')
  }

  function onLogout() {
    logout()
    userInfoStore.clearUserInfo()
    tokenStore.clearToken()
    router.replace('/login')
  }
</script>

<style lang="less" scoped>
  .navbar {
    position: relative;
    display: flex;
    // flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;
    .logo {
      margin-left: 24px;
    }
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .ant-dropdown-link {
      color: #fff;
    }
  }
</style>
