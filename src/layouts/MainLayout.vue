<template>
  <div class="app-container">
    <!-- 移动端 -->
    <div v-if="isMobile" class="mobile-container">
      <MobileChatPage />
    </div>

    <!-- PC端 -->
    <div v-else class="desktop-container">
      <Sidebar />
      
      <!-- 中间内容区：占据剩余宽度 -->
      <div class="main-content">
        <slot />
      </div>
      
      <UserPanel />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MobileChatPage from '@/components/Sidebar/MobileChatPage.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import UserPanel from '@/components/Sidebar/UserPanel.vue'

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.desktop-container {
  display: flex;
  height: 100vh;
}
.main-content {
  flex: 1;           /* 占据 Sidebar 和 UserPanel 之间的剩余宽度 */
  overflow: hidden;  /* 防止内部 100vh 撑出滚动条 */
  display: flex;
  flex-direction: column;
}
.mobile-container {
  height: 100vh;
  overflow-y: auto;
}
</style>