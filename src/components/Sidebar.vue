<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-text">ClayChat</span>
        <span class="logo-status">ACTIVE NOW</span>
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
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['navChange'])

const activeNav = ref('chatroom')

const navItems = [
  { id: 'chatroom', icon: '👥', text: '聊天室' },
  { id: 'friends', icon: '👤', text: '好友' }
]

const handleNavClick = (id) => {
  activeNav.value = id
  emit('navChange', id)
}
</script>

<style scoped>
.sidebar {
  width: clamp(220px, 22vw, 320px);
  min-width: 220px;
  height: 100vh;
  background: #FFEFD5;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.sidebar-header {
  margin-bottom: 30px;
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

@media (max-width: 1200px) {
  .sidebar {
    width: clamp(220px, 24vw, 280px);
    padding: 24px 16px;
  }

  .nav-item {
    max-width: 180px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
    box-shadow: none;
    padding: 20px;
  }
}
</style>
