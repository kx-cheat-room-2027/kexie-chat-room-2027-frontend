<template>
  <div class="profile-page">
    <!-- 移动端返回按钮 -->
    <button class="back-btn" @click="goBack">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      <span>返回</span>
    </button>

    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="user-content">
        <div class="avatar-section">
          <div class="avatar" @click="triggerFileInput">
            <img v-if="authStore.userInfo?.avatar" :src="authStore.userInfo.avatar" class="avatar-img" alt="avatar" />
            <span v-else class="avatar-icon">👤</span>
          </div>
          <input ref="fileInputRef" type="file" accept="image/*" style="display: none" @change="onFileChange" />
          <button class="edit-btn" @click="startEditBio">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
        </div>
        <div class="info-section">
          <h2 class="username">{{ authStore.userInfo?.name || '用户名' }}</h2>
          <div class="bio-wrapper">
            <p v-if="!editingBio" class="bio" @click="startEditBio">
              {{ authStore.userInfo?.bio || '这里是个人简介，点击编辑' }}
            </p>
            <div v-else class="bio-editor">
              <input
                ref="bioInputRef"
                v-model="bioDraft"
                class="bio-input"
                maxlength="100"
                @keyup.enter="saveBio"
                @keyup.escape="cancelEditBio"
                @blur="saveBio"
              />
              <span class="bio-hint">{{ bioDraft.length }}/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 账户设置 -->
    <div class="settings-wrapper">
      <div class="settings-section">
        <div class="section-title">账户设置</div>
        
        <div class="setting-item">
          <div class="icon-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffbc67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <span class="setting-text">语言设置</span>
          <span class="arrow">›</span>
        </div>

        <div class="setting-item">
          <div class="icon-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffbc67" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <span class="setting-text">通知设置</span>
          <span class="arrow">›</span>
        </div>

        <!-- 退出登录 -->
        <button class="logout-btn" @click="handleLogout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>退出登录</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// ========== 头像上传 ==========
const fileInputRef = ref(null)

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const avatarUrl = e.target.result
    authStore.updateUserInfo({ avatar: avatarUrl })
  }
  reader.readAsDataURL(file)
  // 重置 input，允许再次选择同一文件
  event.target.value = ''
}

// 个人简介编辑 
const editingBio = ref(false)
const bioDraft = ref('')
const bioInputRef = ref(null)

const startEditBio = () => {
  bioDraft.value = authStore.userInfo?.bio || ''
  editingBio.value = true
  nextTick(() => {
    bioInputRef.value?.focus()
  })
}

const saveBio = () => {
  if (editingBio.value) {
    authStore.updateUserInfo({ bio: bioDraft.value.trim() })
    editingBio.value = false
  }
}

const cancelEditBio = () => {
  editingBio.value = false
}

// 退出 / 返回
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const goBack = () => {
  router.push('/chat')
}
</script>

<style scoped>
.profile-page {
  width: 100%;
  height: 100%;
  background: #fff8f0;
  display: flex;
  flex-direction: column;
  padding: 32px 60px;
  gap: 0;
  box-sizing: border-box;
}

/* 移动端返回按钮 - PC端隐藏 */
.back-btn {
  display: none;
  align-self: flex-start;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #8b7b5e;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  transition: background 0.2s ease;
}
.back-btn:hover {
  background: rgba(139, 123, 94, 0.08);
}

/* 用户信息卡片 */
.user-card {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  height: 195px;
  background: linear-gradient(135deg, #ffefd5 0%, #f5ebe0 100%);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

.user-content {
  display: flex;
  gap: 24px;
  height: 100%;
  align-items: center;
}

.avatar-section {
  position: relative;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #e8e8e8;
  border: 3px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.avatar:hover {
  border-color: #ffbc67;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-icon {
  font-size: 40px;
}

.edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffbc67;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255, 188, 103, 0.4);
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.username {
  font-size: 24px;
  font-weight: 600;
  color: #5d4e37;
  margin: 0 0 8px 0;
}

.bio-wrapper {
  position: relative;
}

.bio {
  font-size: 14px;
  color: #8b7b5e;
  margin: 0;
  cursor: pointer;
  padding: 4px 8px;
  margin-left: -8px;
  border-radius: 8px;
  transition: background 0.2s ease;
}
.bio:hover {
  background: rgba(255, 188, 103, 0.1);
}

.bio-editor {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bio-input {
  font-size: 14px;
  color: #5d4e37;
  border: 2px solid #ffbc67;
  border-radius: 8px;
  padding: 4px 10px;
  width: 260px;
  outline: none;
  background: #fff;
}
.bio-input:focus {
  border-color: #da7a2d;
}

.bio-hint {
  font-size: 11px;
  color: #a4967f;
}

/* 设置区域容器 */
.settings-wrapper {
  padding-left: 210px;
  width: 100%;
  max-width: 1400px;
  margin: 40px auto 0 auto;
  box-sizing: border-box;
}

/* 移动端：settings-wrapper 居中 */
@media (max-width: 768px) {
  .settings-wrapper {
    padding-left: 0;
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}

.settings-section {
  width: 100%;
  max-width: 920px;
  min-width: 0;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #8b7b5e;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  width: 100%;
  max-width: 920px;
  height: 70px;
  background: #f0f1f1;
  border-radius: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
  box-shadow: inset 0 2px 15px rgba(0, 0, 0, 0.08);
}

.setting-item:hover {
  background: #f5f5f5;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.setting-text {
  flex: 1;
  font-size: 13px;
  color: #5d4e37;
  font-weight: 500;
}

.arrow {
  font-size: 30px;
  color: #cccccc5d;
  font-weight: 300;
}

/* 退出登录按钮 */
.logout-btn {
  width: 200px;
  padding: 14px 24px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #d46b6b 0%, #b84a4a 100%);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(212, 107, 107, 0.3);
  transition: opacity 0.3s ease;
  margin: 200px auto 0;
}

.logout-btn:hover {
  opacity: 0.9;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .profile-page {
    padding: 0;
    align-items: stretch;
  }

  /* 显示返回按钮 */
  .back-btn {
    display: flex;
    margin: 16px 16px 20px;
    width: fit-content;
  }

  .user-card {
    width: calc(100% - 32px);
    max-width: 100%;
    height: auto;
    padding: 24px;
    margin: 0 16px;
    background: transparent;
    box-shadow: none;
  }

  .user-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
  }

  .info-section {
    align-items: center;
  }

  .avatar-section {
    margin-bottom: 0;
  }

  .settings-wrapper {
    padding-left: 0;
    margin-top: 40px;
    justify-content: center;
  }

  .settings-section {
    width: calc(100% - 64px);
    max-width: 100%;
  }

  .setting-item {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 50px;
    padding: 12px 16px;
    border-radius: 20px;
  }

  .logout-btn {
    width: calc(100% - 32px);
    max-width: 300px;
    margin: 60px auto 0;
  }

  .user-card .avatar {
    width: 70px;
    height: 70px;
  }

  .user-card .avatar-icon {
    font-size: 32px;
  }

  .user-card .username {
    font-size: 20px;
  }
}
</style>