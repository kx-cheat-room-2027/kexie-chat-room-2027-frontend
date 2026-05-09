<template>
  <div class="page">
    <div class="container">
      <!-- 左侧插画卡片 -->
      <div class="card illustration-card">
        <div class="card-top">
          <h1 class="title">聊天室</h1>
          <p class="subtitle">
            体验为清晰而设计的沟通方式，专为有意义的人际连接而打造的聊天室。
          </p>
        </div>
        <div class="illustration-wrap">
          <img src="../assets/login-figure.jpg" alt="插画" class="illustration-img" />
        </div>
      </div>

      <!-- 右侧表单卡片 -->
      <div class="card form-card">
        <div class="header">
          <h2 class="header-title">欢迎回来</h2>
          <p class="header-sub">请输入您的信息</p>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="form"
          label-position="top"
          hide-required-asterisk
          @submit.prevent="handleSubmit"
        >
          <el-form-item prop="email" class="field">
            <template #label>
              <label class="custom-label">邮箱地址</label>
            </template>
            <el-input
              v-model="form.email"
              type="email"
              placeholder="name@company.com"
              class="custom-el-input"
            >
              <template #prefix>
                <el-icon><MessageIcon /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" class="field">
            <template #label>
              <label class="custom-label">密码</label>
            </template>
            <el-input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="custom-el-input"
              show-password
            >
              <template #prefix>
                <el-icon><LockIcon /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <div class="options">
            <label class="remember">
              <input type="checkbox" v-model="form.remember" />
              <span class="checkmark"></span>
              <span class="remember-text">记住我</span>
            </label>
            <a href="#" class="forgot">忘记密码？</a>
          </div>

          <button type="submit" class="submit-btn" @click="handleSubmit">登录</button>

          <p class="switch">
            没有账户？ <router-link to="/register">创建账号</router-link>
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/user'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const MessageIcon = Message
const LockIcon = Lock

const formRef = ref(null)

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

// async function handleSubmit() {
//   if (!formRef.value) return

//   await formRef.value.validate(async (valid, fields) => {
//     if (valid) {
//       ElMessage.success('登录成功')
//       console.log('登录信息：', form)
//       // TODO: 调用登录API
//       try {
//         const res = await login({
//           account:form.email,
//           password:form.password
//         })
//         if(res.code === 0) {
//           ElMessage.success('登录成功')
//           localStorage.setItem('user_token', res.data.token)
//           router.push('/chat')
//         }
//       } catch (error) {
//         ElMessage.error(error.message)
//       }
//     } else {
//       ElMessage.error('请检查表单输入')
//       console.log('验证失败:', fields)
//     }
//   })
// }

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      const res = authStore.login(form.email, form.password)
      if (res.success) {
        ElMessage.success('登录成功')
        router.push('/chat')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
    }
  })
}
</script>
<style scoped src="./login.css"></style>
