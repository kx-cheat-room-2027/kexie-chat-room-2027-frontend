<template>
 <div class="mobile-login-page">
    <div class="form-card">
      <!-- 顶部 Figma Liquid Droplet Icon -->
      <div class="avatar-circle">
        <img src="@/assets/liquid-icon.svg" alt="Liquid Icon" />
      </div>

      <!-- 标题 -->
      <h2 class="title">登录账号</h2>
      <p class="subtitle">欢迎来到聊天室</p>

      <!-- 登录表单 -->
            <form @submit.prevent="handleSubmit">
              <!-- 邮箱 -->
              <div class="form-item">
                <label>邮箱地址</label>
                <div class="input-wrapper">
                  <img src="@/assets/login-email.svg" class="input-icon" alt="" />
                  <input v-model="form.email" type="email" placeholder="name@example.com" />
                </div>
              </div>

              <!-- 忘记密码 -->
              <div class="forgot-container">
                <span class="forgot">忘记密码？</span>
              </div>

              <!-- 密码 -->
              <div class="form-item">
                <label>密码</label>
                <div class="input-wrapper">
                  <img src="@/assets/login-password.svg" class="input-icon" alt="" />
                  <input v-model="form.password" type="password" placeholder="••••••••" />
                </div>
              </div>

              <!-- 登录按钮 -->
              <button type="submit" class="submit-btn">登录 →</button>
            </form>

            <!-- 切换注册 -->
            <p class="switch">
              第一次使用聊天室？ <router-link to="/register">新建账号</router-link>
            </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/user'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

// import { login } from '@/api/user.js'   // 可直接调用你的 api
// import { useAuthStore } from '@/stores/auth.js'
// import { useRouter } from 'vue-router'

const form = reactive({
  email: "",
  password: ""
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
const handleSubmit = async () => {
   const res = authStore.login(form.email, form.password)
      if (res.success) {
        ElMessage.success('登录成功')
        router.push('/chat')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
}
</script>

<style scoped src="./login.css">
</style>

