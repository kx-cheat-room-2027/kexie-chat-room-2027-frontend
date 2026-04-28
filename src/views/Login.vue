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
          <img src="../assets/001.jpg" alt="插画" class="illustration-img" />
        </div>
      </div>

      <!-- 右侧表单卡片 -->
      <div class="card form-card">
        <div class="header">
          <h2 class="header-title">欢迎回来</h2>
          <p class="header-sub">请输入您的信息</p>
        </div>

        <div class="form">
          <div class="field">
            <label>邮箱地址</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
              </span>
              <input type="email" placeholder="name@company.com" v-model="form.email" />
            </div>
          </div>

          <div class="field">
            <label>密码</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input type="password" placeholder="••••••••" v-model="form.password" />
            </div>
          </div>

          <div class="options">
            <label class="remember">
              <input type="checkbox" v-model="form.remember" />
              <span class="checkmark"></span>
              <span class="remember-text">记住我</span>
            </label>
            <a href="#" class="forgot">忘记密码？</a>
          </div>

          <button class="submit-btn" @click="handleLogin">登录</button>

          <p class="switch">
            没有账户？ <router-link to="/register">创建账号</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

function handleLogin() {
  console.log('登录信息：', form)
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F9F6F1;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.container {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  padding: 24px;
  margin: 0;
}

.card {
  border-radius: 32px;
  background: #fdf8f0;
}

/* 左侧插画卡片 */
.illustration-card {
  flex: 1;
  padding: 48px 44px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow:
    8px 8px 28px rgba(139, 115, 85, 0.1),
    -3px -3px 12px rgba(255, 255, 255, 0.7),
    inset 1px 1px 2px rgba(255, 255, 255, 0.9);
}

.card-top {
  width: 100%;
}

.title {
  font-size: 36px;
  font-weight: 800;
  color: #4A3728;
  margin-bottom: 14px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-align: left;
}

.subtitle {
  font-size: 14px;
  color: #7a6f64;
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 340px;
  text-align: left;
}

.illustration-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.illustration-img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 24px;
  box-shadow:
    inset 2px 2px 6px rgba(139, 115, 85, 0.08),
    4px 4px 16px rgba(139, 115, 85, 0.1);
  object-fit: cover;
}

/* 右侧表单卡片 */
.form-card {
  flex: 1;
  max-width: 480px;
  padding: 44px 48px 36px;
  display: flex;
  flex-direction: column;
  box-shadow:
    8px 8px 28px rgba(139, 115, 85, 0.1),
    -3px -3px 12px rgba(255, 255, 255, 0.7),
    inset 1px 1px 2px rgba(255, 255, 255, 0.9);
}

.header {
  margin-bottom: 28px;
  width: 100%;
}

.header-title {
  font-size: 26px;
  font-weight: 700;
  color: #4A3728;
  margin-bottom: 6px;
  text-align: left;
}

.header-sub {
  font-size: 13px;
  color: #9a8e80;
  text-align: left;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.field label {
  font-size: 12px;
  font-weight: 500;
  color: #7a6f64;
  padding-left: 4px;
  text-align: left;
}

/* Neumorphic 输入框 */
.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0ebe3;
  border-radius: 14px;
  padding: 0 16px;
  height: 48px;
  width: 100%;
  box-shadow:
    inset 3px 3px 6px rgba(166, 153, 135, 0.2),
    inset -3px -3px 6px rgba(255, 255, 255, 0.8);
  transition: box-shadow 0.25s ease;
}

.input-wrap:focus-within {
  box-shadow:
    inset 4px 4px 8px rgba(166, 153, 135, 0.25),
    inset -4px -4px 8px rgba(255, 255, 255, 0.9),
    0 0 0 2px rgba(212, 163, 115, 0.2);
}

.input-icon {
  display: flex;
  align-items: center;
  color: #b8a898;
  flex-shrink: 0;
}

.input-wrap input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #4a4036;
}

.input-wrap input::placeholder {
  color: #b8a898;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -2px;
  width: 100%;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.remember input {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  background: #f0ebe3;
  box-shadow:
    inset 2px 2px 4px rgba(166, 153, 135, 0.2),
    inset -2px -2px 4px rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remember input:checked + .checkmark {
  background: linear-gradient(135deg, #e8a87c 0%, #d4a373 100%);
  box-shadow: 0 2px 6px rgba(212, 163, 115, 0.3);
}

.remember input:checked + .checkmark::after {
  content: '';
  width: 5px;
  height: 8px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
}

.remember-text {
  font-size: 13px;
  color: #7a6f64;
}

.forgot {
  font-size: 13px;
  color: #c4843c;
  text-decoration: none;
  font-weight: 600;
}

.forgot:hover {
  text-decoration: underline;
}

/* Claymorphism 按钮 */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  margin-top: 4px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(145deg, #e8a87c 0%, #c4843c 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    4px 4px 12px rgba(196, 132, 60, 0.35),
    -2px -2px 8px rgba(255, 255, 255, 0.5),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3);
  transition: all 0.25s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    6px 6px 18px rgba(196, 132, 60, 0.45),
    -2px -2px 8px rgba(255, 255, 255, 0.5),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow:
    2px 2px 6px rgba(196, 132, 60, 0.3),
    inset 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.switch {
  text-align: center;
  font-size: 13px;
  color: #9a8e80;
  margin-top: 4px;
  width: 100%;
}

.switch a {
  color: #c4843c;
  font-weight: 700;
  text-decoration: none;
}

.switch a:hover {
  text-decoration: underline;
}

/* 响应式 */
@media (max-width: 900px) {
  .page {
    min-height: 100vh;
    padding: 24px 0;
    overflow-y: auto;
  }

  .container {
    flex-direction: column;
    align-items: center;
  }

  .illustration-card {
      max-width: 480px;
      width: 100%;
      padding: 32px 28px 24px;
    }

    .form-card {
      max-width: 480px;
      width: 100%;
      padding: 32px 28px 24px;
    }

  .title {
    font-size: 28px;
  }
}
</style>
