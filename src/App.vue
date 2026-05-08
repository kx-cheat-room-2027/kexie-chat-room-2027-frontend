<template>
  <div class="app-container">
    <!-- 移动端 -->
    <div v-if="isMobile" class="mobile-container">
      <MobileChatPage />
    </div>

    <!-- PC端 -->
    <div v-else class="desktop-container">
      <Sidebar />
      <!-- 聊天页面 -->
       <!-- ChatMiddle为zgq负责部分 -->
      <ChatMiddle />
      <UserPanel />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import UserPanel from './components/UserPanel.vue'
import ChatMiddle from './components/ChatMiddle.vue'
import MobileChatPage from './components/MobileChatPage.vue'

const mobileQuery = window.matchMedia('(max-width: 768px)')
const isMobile = ref(mobileQuery.matches)

const checkMobile = () => {
  isMobile.value = mobileQuery.matches
}

onMounted(() => {
  checkMobile()
  mobileQuery.addEventListener('change', checkMobile)
})

onUnmounted(() => {
  mobileQuery.removeEventListener('change', checkMobile)
})
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.desktop-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.mobile-container {
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
</style>
