<template>
  <div class="mobile-chat-page">
    <div class="sidebar-header">
      <div class="header-top">
        <div class="logo">
          <span class="logo-text">ClayChat</span>
          <span class="logo-status">ACTIVE NOW</span>
        </div>
        <button class="user-avatar-btn">
          <div class="user-avatar">
            <span class="avatar-icon">👤</span>
          </div>
        </button>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <button 
        v-for="item in navItems" 
        :key="item.id"
        :class="['nav-item', { active: activeNav === item.id }]"
        @click="handleNavClick(item.id)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.text }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeNav = ref('chatroom')

const navItems = [
  { id: 'chatroom', icon: '👥', text: '聊天室' },
  { id: 'friends', icon: '👤', text: '好友' }
]

const handleNavClick = (id) => {
  activeNav.value = id
}
</script>

<style scoped>
.mobile-chat-page {
  min-height: 100vh;
  height: 100vh;
  background-color: #FFEFD5;
  display: flex;
  flex-direction: column;
  padding: clamp(20px, 4vw, 32px) clamp(16px, 3vw, 24px);
  width: 100%;
  position: relative;
}

.sidebar-header {
  margin-bottom: 30px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.logo {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #5D4E37;
  letter-spacing: -0.5px;
}

.logo-status {
  font-size: 10px;
  color: #8B7B5E;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.user-avatar-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E8DDC8 0%, #D4C9A8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
 
}

.avatar-icon {
  font-size: 20px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  width: 100%;
  max-width: 220px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #5D4E37;
  text-align: left;
}

.nav-item:hover {
  background: rgba(217, 158, 89, 0.2);
}

.nav-item.active {
  background: linear-gradient(135deg, #D99E59 0%, #C48843 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(217, 158, 89, 0.4);
}

.nav-icon {
  font-size: 18px;
}

.nav-text {
  font-weight: 500;
}
</style>
