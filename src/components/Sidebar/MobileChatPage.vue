<template>
  <div class="mobile-chat-page">
    <div class="sidebar-header">
      <div class="header-top">
        <div class="logo">
          <span class="logo-text">ClayChat</span>
          <span class="logo-status">ACTIVE NOW</span>
        </div>
        <button class="user-avatar-btn" @click="toggleProfile">
          <div class="user-avatar">
            <img v-if="authStore.userInfo?.avatar" :src="authStore.userInfo.avatar" class="avatar-img" alt="avatar" />
            <span v-else class="avatar-icon">👤</span>
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

    <div class="session-list">
      <div 
        v-for="room in filteredRooms" 
        :key="room.id" 
        class="session-item"
        @click="selectRoom(room.id)"
      >
        <div class="session-avatar-wrapper">
          <img :src="room.avatar" class="session-avatar" alt="avatar" />
          <div v-if="room.unreadCount > 0" class="unread-badge">
            {{ room.unreadCount > 99 ? '99+' : room.unreadCount }}
          </div>
        </div>
        <div class="session-content">
          <div class="session-header">
            <span class="session-name">{{ room.name }}</span>
            <span class="session-time">{{ formatTime(room.lastTime) }}</span>
          </div>
          <p class="message-preview">{{ room.lastMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSessionList } from '@/api/chat'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const activeNav = ref('chatroom')

const navItems = [
  { id: 'chatroom', icon: '👥', text: '聊天室' },
  { id: 'friends', icon: '👤', text: '好友' }
]

const chatRooms = ref([])
const loading = ref(false)

const fetchSessionData = async () => {
  loading.value = true
  try {
    const res = await getSessionList()
    if (res.code === 0) {
      chatRooms.value = res.data
    }
  } catch (error) {
    console.error("获取会话列表失败:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSessionData()
})

const filteredRooms = computed(() => {
  if (activeNav.value === 'chatroom') {
    return chatRooms.value.filter(room => room.isGroup)
  } else {
    return chatRooms.value.filter(room => !room.isGroup)
  }
})

const formatTime = (timeStr) => {
  if (!timeStr) return ""
  let timestamp = Number(timeStr)
  if (isNaN(timestamp)) {
    return timeStr
  }
  if (timeStr.toString().length === 10) {
    timestamp *= 1000
  }
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return timeStr
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

const handleNavClick = (id) => {
  activeNav.value = id
}

const selectRoom = (roomId) => {
  // 移动端选中聊天室后，通常要跳转到聊天详情页面
  console.log("Mobile selected room:", roomId)
}

const toggleProfile = () => {
  if (route.path === '/chat/profile') {
    router.push('/chat')
  } else {
    router.push('/chat/profile')
  }
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
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.session-list {
  margin-top: 24px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.session-list::-webkit-scrollbar {
  width: 4px;
}
.session-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.session-item:hover {
  background: rgba(255, 255, 255, 0.4);
}

.session-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.session-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.unread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4d4f;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  height: 18px;
  min-width: 18px;
  line-height: 14px;
  border-radius: 9px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFEFD5;
}

.session-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-name {
  font-weight: 600;
  color: #5D4E37;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.session-time {
  font-size: 12px;
  color: #A4967F;
  flex-shrink: 0;
}

.message-preview {
  margin: 0;
  font-size: 13px;
  color: #8B7B5E;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
