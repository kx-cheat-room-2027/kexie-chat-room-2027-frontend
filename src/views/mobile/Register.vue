<template>
  <div class="mobile-login-page">
    <div class="form-card">
      <h2 class="title">加入聊天室</h2>
      <p class="subtitle">创建你的账号</p>

      <div class="avatar-upload">
        <div class="avatar-circle">
         <img src="@/assets/register-avatar.svg" alt="Avatar" class="avatar-img"/>
         <div class="pen-icon" @click="uploadAvatar">
      <!-- 内嵌 SVG，圆形橙色背景 + 白色笔（和Figma一致） -->
      <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <!-- 橙色圆 -->
        <circle cx="14" cy="14" r="14" fill="#F6921E"/>
        <!-- 白色笔，参考你发的图比例 -->
        <path d="M19.3 8.7l-0.7-0.7c-0.2-0.2-0.5-0.2-0.7 0l-8.6 8.6v1.3h1.3l8.6-8.6c0.2-0.2 0.2-0.5 0-0.7zM17.9 7.3l1.8 1.8-1.3 1.3-1.8-1.8 1.3-1.3z" fill="white"/>
      </svg>
    </div>
        </div>
        <span>上传头像</span>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label>名称</label>
          <div class="input-wrapper">
          <img src="@/assets/register-name.svg" alt="Name"  class="input-icon"/>
          <input v-model="form.name" type="text" placeholder="输入你的名称" />
        </div>
        </div>

        <div class="form-item">
          <label>邮箱地址</label>
          <div class="input-wrapper">
          <img src="@/assets/register-email.svg" alt="Email" class="input-icon"/>
          <input v-model="form.email" type="email" placeholder="name@example.com" />
          </div>
        </div>

        <div class="form-item">
          <label>验证码</label>
            <div class="input-wrapper">
              <img src="@/assets/register-captcha.svg" alt="验证码" class="input-icon" />
          <input v-model="form.code" type="text" placeholder="输入验证码" />
        </div>
        </div>

        <div class="form-item">
          <label>设置密码</label>
           <div class="input-wrapper">
            <img src="@/assets/register-password.svg" alt="Password" class="input-icon" />
          <input v-model="form.password" type="password" placeholder="••••••••" />
        </div>
        </div>

        <div class="form-item">
          <label>确认密码</label>
          <div class="input-wrapper">
            <img src="@/assets/register-password.svg" alt="Password" class="input-icon" />
          <input v-model="form.confirmPassword" type="password" placeholder="••••••••" />
        </div>
       </div>
        <div class="privacy">
          <label>
            <input type="checkbox" v-model="form.agree" />
            我同意 <span class="link">隐私政策</span>
          </label>
        </div>

        <button type="submit" class="submit-btn">创建账号 →</button>
      </form>

      <p class="switch">
        已有账号？ <router-link to="/login">登录</router-link>
      </p>
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
const ready = ref(false)
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

const avatarImg = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
function uploadAvatar() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      avatarImg.value = URL.createObjectURL(file) // 预览头像
      console.log('上传头像文件:', file)
    }
  }
  input.click()
}
async function handleSubmit() {
  const res = authStore.login(form.email, form.password)
      if (res.success) {
        ElMessage.success('登录成功')
        router.push('/chat')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
}

</script>


<style scoped src="./register.css">
</style>