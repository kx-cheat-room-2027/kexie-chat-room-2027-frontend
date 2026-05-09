<template>
  <div class="page">
    <div class="container">
      <!-- 左侧卡片 -->
      <div class="card illustration-card">
        <div class="card-top">
          <h1 class="title">将设想变为现实</h1>
          <p class="subtitle">
            体验一种像面对面交流一样自然的沟通工具，塑造你的空间，邀请你的伙伴。
          </p>
          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span class="feature-text">实时互动</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span class="feature-text">隐私保护</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧表单卡片 -->
      <div class="card form-card">
        <div class="avatar-upload">
          <div class="avatar-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div class="avatar-edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <span class="avatar-label">上传头像</span>
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
          <el-form-item prop="name" class="field">
            <template #label>
              <label class="custom-label">名称</label>
            </template>
            <el-input
              v-model="form.name"
              type="text"
              placeholder="输入你的名称"
              class="custom-el-input"
            >
              <template #prefix>
                <el-icon><UserIcon /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="email" class="field">
            <template #label>
              <label class="custom-label">邮箱地址</label>
            </template>
            <el-input
              v-model="form.email"
              type="email"
              placeholder="john@fluid.com"
              class="custom-el-input"
            >
              <template #prefix>
                <el-icon><MessageIcon /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="code" class="field">
            <template #label>
              <label class="custom-label">验证码</label>
            </template>
            <el-input
              v-model="form.code"
              type="text"
              placeholder="输入验证码"
              class="custom-el-input"
            >
              <template #prefix>
                <el-icon><KeyIcon /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" class="field">
            <template #label>
              <label class="custom-label">设置密码</label>
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

          <el-form-item prop="confirmPassword" class="field">
            <template #label>
              <label class="custom-label">确认密码</label>
            </template>
            <el-input
              v-model="form.confirmPassword"
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

          <button type="submit" class="submit-btn" @click="handleSubmit">
            创建账号
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <p class="switch">
            已经有账号了？ <router-link to="/login">登录</router-link>
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Message, Key, Lock } from '@element-plus/icons-vue'
import { register } from '@/api/user'
import router from '@/router'

const UserIcon = User
const MessageIcon = Message
const KeyIcon = Key
const LockIcon = Lock

const formRef = ref(null)

const form = reactive({
  name: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称长度2-20个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

async function handleSubmit() {
  if (!formRef.value) return

  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      ElMessage.success('注册成功')
      console.log('注册信息：', form)
      // TODO: 调用注册API
      try {
        const res = await register(form)
        if(res.code === 0) {
          ElMessage.success('注册成功')
          router.push('/login')
        }
      } catch (error) {
        ElMessage.error(error.message)
      }
    } else {
      ElMessage.error('请检查表单输入')
      console.log('验证失败:', fields)
    }
  })
}
</script>
<style scoped src="./register.css"></style>
