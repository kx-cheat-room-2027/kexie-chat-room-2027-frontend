<template>
  <aside class="user-panel">
    <div class="panel-header">
      <div class="user-avatar-large">
        <span class="avatar-icon">👤</span>
      </div>
      <div class="user-info">
        <h3 class="user-title">{{ user.name }}</h3>
      </div>
    </div>
    
    <div class="panel-section">
      <div class="section-title">聊天设置</div>
      
      <div class="setting-item">
        <div class="setting-icon">🔔</div>
        <span class="setting-label">消息提醒</span>
        <button 
          :class="['toggle-btn', { active: settings.notifications }]"
          @click="settings.notifications = !settings.notifications">
          <span class="toggle-track"></span>
          <span class="toggle-thumb"></span>
        </button>
      </div>
      
      <div class="setting-item">
        <div class="setting-icon">🚫</div>
        <span class="setting-label">加入黑名单</span>
        <button 
          :class="['toggle-btn', { active: settings.blocked }]"
          @click="settings.blocked = !settings.blocked">
          <span class="toggle-track"></span>
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { reactive } from 'vue'

const user = {
  name: '用户名'
}

const settings = reactive({
  notifications: true,
  blocked: false
})
</script>

<style scoped>
.user-panel {
  width: clamp(220px, 20vw, 300px);
  min-width: 220px;
  height: 100vh;
  background: #FFEFD5;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.panel-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.user-avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #E8DDC8;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar-icon {
  font-size: 40px;
  color: #B5A88E;
}

.avatar-camera {
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #E8DDC8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #B5A88E;
}

.user-info {
  text-align: center;
}

.user-title {
  font-size: 18px;
  font-weight: 600;
  color: #5D4E37;
  margin-bottom: 2px;
}

.panel-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #8B7B5E;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.setting-icon {
  font-size: 16px;
  opacity: 0.6;
}

.setting-label {
  flex: 1;
  font-size: 14px;
  color: #5D4E37;
  font-weight: 500;
}

.toggle-btn {
  width: 50px;
  height: 28px;
  border-radius: 14px;
  background: #D4C9A8;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 0 3px;
}

.toggle-btn.active {
  background: #D99E59;
}

.toggle-track {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 14px;
}

.toggle-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  position: relative;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.toggle-btn.active .toggle-thumb {
  transform: translateX(22px);
}

@media (max-width: 1200px) {
  .user-panel {
    width: clamp(220px, 22vw, 260px);
    padding: 24px 16px;
  }
}

@media (max-width: 768px) {
  .user-panel {
    width: 100%;
    height: calc(100vh - 60px);
    padding: 20px;
    box-shadow: none;
  }
}
</style>
