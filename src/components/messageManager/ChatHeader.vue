<template>
  <div class="chat-header">
    <div class="room-info">
      <h2 class="room-name">聊天室</h2>
    </div>
    <div class="header-actions">
      <button class="action-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>
      <button class="action-btn" @click="settingsStore.toggleMute" :title="settingsStore.isMuted ? '取消静音' : '开启静音'">
        <!-- 静音图标 -->
        <svg v-if="settingsStore.isMuted" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8"/><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><path d="M18 8a6 6 0 0 0-9.33-5"/><line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <!-- 提醒图标 -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </button>
      <button class="action-btn" @click="toggleUserPanel">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const isUserPanelOpen = inject('isUserPanelOpen')

const toggleUserPanel = () => {
  if (isUserPanelOpen) {
    isUserPanelOpen.value = !isUserPanelOpen.value
  }
}
</script>

<style scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: #f5e7d6;
  border-bottom: 1px solid #e9ddd0;
}

.room-info {
  display: flex;
  flex-direction: column;
}

.room-name {
  font-size: 20px;
  font-weight: 700;
  color: #4e342e;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  color: #8b7b5e;
  transition: color 0.3s ease;
}

.action-btn:hover {
  color: #5d4e37;
}

.action-btn svg {
  width: 22px;
  height: 22px;
}
</style>
