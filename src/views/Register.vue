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

        <div class="form">
          <div class="field">
            <label>名称</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input type="text" placeholder="输入你的名称" v-model="form.name" />
            </div>
          </div>

          <div class="field">
            <label>邮箱地址</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
              </span>
              <input type="email" placeholder="john@fluid.com" v-model="form.email" />
            </div>
          </div>

          <div class="field">
            <label>验证码</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <input type="text" placeholder="输入验证码" v-model="form.code" />
            </div>
          </div>

          <div class="field">
            <label>设置密码</label>
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

          <div class="field">
            <label>确认密码</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input type="password" placeholder="••••••••" v-model="form.confirmPassword" />
            </div>
          </div>

          <button class="submit-btn" @click="handleRegister">
            创建账号
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <p class="switch">
            已经有账号了？ <router-link to="/login">登录</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
})

function handleRegister() {
  console.log('注册信息：', form)
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
  max-width: 1000px;
  width: 100%;
  padding: 24px;
  margin: 0;
}

.card {
  border-radius: 32px;
  background: #fdf8f0;
}

/* 左侧卡片 */
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
  margin-top: 60px;
  color: #4A3728;
  margin-bottom: 35px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-align: left;
}

.subtitle {
  font-size: 14px;
  color: #7a6f64;
  line-height: 1.7;
  margin-bottom: 68px;
  max-width: 360px;
  text-align: left;
}

/* 特性标签 */
.features {
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: 100%;
  justify-content: flex-start;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: #f0ebe3;
  border-radius: 16px;
  box-shadow:
    3px 3px 8px rgba(166, 153, 135, 0.15),
    -2px -2px 6px rgba(255, 255, 255, 0.7),
    inset 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(145deg, #e8a87c 0%, #c4843c 100%);
  border-radius: 10px;
  color: #fff;
  box-shadow:
    2px 2px 6px rgba(196, 132, 60, 0.25),
    -1px -1px 3px rgba(255, 255, 255, 0.5);
}

.feature-text {
  font-size: 13px;
  font-weight: 600;
  color: #5a5046;
}

/* 右侧表单卡片 */
.form-card {
  flex: 1;
  max-width: 480px;
  padding: 32px 40px 36px;
  display: flex;
  flex-direction: column;
  box-shadow:
    8px 8px 28px rgba(139, 115, 85, 0.1),
    -3px -3px 12px rgba(255, 255, 255, 0.7),
    inset 1px 1px 2px rgba(255, 255, 255, 0.9);
}

/* 头像上传 */
.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  align-self: center;
}

.avatar-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f0ebe3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b8a898;
  box-shadow:
    4px 4px 10px rgba(166, 153, 135, 0.2),
    -3px -3px 8px rgba(255, 255, 255, 0.8),
    inset 1px 1px 2px rgba(255, 255, 255, 0.9);
}

.avatar-edit {
  position: absolute;
  top: 50px;
  right: calc(50% - 40px);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(145deg, #e8a87c 0%, #c4843c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  box-shadow:
    2px 2px 6px rgba(196, 132, 60, 0.35),
    -1px -1px 3px rgba(255, 255, 255, 0.4);
}

.avatar-label {
  margin-top: 10px;
  font-size: 12px;
  color: #9a8e80;
  font-weight: 500;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  height: 44px;
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

/* Claymorphism 按钮 */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  margin-top: 6px;
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
      padding: 28px 28px 24px;
    }

  .title {
    font-size: 28px;
  }

  .features {
    margin-top: 20px;
  }
}
</style>
