<template>
  <div class="login">
    <div class="card">
      <div class="container">
        <div class="login-head">
          <span class="pas-login title" :class="{ active: active === 'admin' }" @click="loginMethodChange('admin')">账号密码登录</span>
          <span class="phone-login title" :class="{ active: active === 'phone' }" @click="loginMethodChange('phone')">手机号登录</span>
        </div>
        <div class="form">
          <a-form :model="loginState" :rules="rules" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item name="userName">
              <a-input v-model:value="loginState.userName" placeholder="请输入账号">
                <template #prefix>
                  <user-outlined type="user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password v-model:value="loginState.password" placeholder="请输入密码" autocomplete="off">
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input-password>
            </a-form-item>
            <!--<a-form-item name="verificationCode">-->
            <!--  <div class="verify">-->
            <!--    <a-input v-model:value="loginState.verificationCode" placeholder="请输入验证码" class="verificationCode">-->
            <!--      <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>-->
            <!--    </a-input>-->
            <!--    <img class="img" @click="uploadAuthcodeUrl" :src="authcodeUrl" title="换一批" />-->
            <!--  </div>-->
            <!--</a-form-item>-->
            <a-form-item>
              <a-button class="login-btn" block type="primary" html-type="submit">登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { login } from '@/api/login'
  import { message } from 'ant-design-vue'
  import { useToken } from '@/store/useUserInfo'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const rules: any = {
    userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }

  // 选中

  const active: any = ref('admin')
  // 切换登录方式
  const loginMethodChange = (val: string) => {
    active.value = val
  }
  // 验证码接口地址
  const authcodeUrl: any = ref('/back/sso/verifyCode')

  // 更新验证码图片
  const uploadAuthcodeUrl = () => {
    authcodeUrl.value = '/back/sso/verifyCode?rnd=' + new Date().getTime()
  }

  // 登录相关信息
  const loginState = reactive({
    userName: '',
    password: '',
    verificationCode: ''
  })

  // 数据验证成功
  const onFinish = async (val: any) => {
    try {
      const result = await login({
        username: val.userName,
        password: val.password
        // verifyCode: val.verificationCode
      })
      // 设置token
      const tokenStore: any = useToken()
      tokenStore.setToken(result.data.token)
      message.success('登录成功')
      await router.push('/')
    } catch (error) {
      uploadAuthcodeUrl()
      // @ts-ignore
      message.error(error)
    }
  }

  // 数据验证失败
  const onFinishFailed = () => {
    uploadAuthcodeUrl()
  }
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background: url('../../assets/login/bg.jpg');
    background-size: cover;
    .card {
      min-width: 320px;
      border-radius: 5px;
      height: 310px;
      background: white;
      position: absolute;
      top: calc(50% - 200px);
      right: 20%;
      padding: 20px;
      .container {
        width: 100%;
        .login-head {
          display: flex;
          width: 90%;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 20px;
          .title {
            cursor: pointer;
          }
          .active {
            color: #72a0fd;
            font-size: 18px;
            font-weight: 600;
          }
        }
        .verificationCode {
          width: 150px;
        }
        .verify {
          display: flex;
          justify-content: space-between;
          .img {
            height: 32px;
            cursor: pointer;
          }
        }
        .login-btn {
          border-radius: 15px;
        }
      }
    }
  }
</style>
