<template>
  <div class="app-container">
    <!-- 移动端 -->
    <div v-if="isMobile && !isProfilePage" class="mobile-container">
      <MobileChatPage />
    </div>
    <div v-else-if="isMobile && isProfilePage" class="mobile-profile-container">
      <slot />
    </div>

    <!-- PC端 -->
    <div v-else class="desktop-container">
      <Sidebar />
      
      <!-- 中间内容区：占据剩余宽度 -->
      <div class="main-content">
        <slot />
      </div>
      <UserPanel v-if="isUserPanelOpen && route.path !== '/chat/profile'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import { useRoute } from 'vue-router'
import { MobileChatPage, Sidebar, UserPanel } from '@/components/Sidebar'

const route = useRoute()
const isMobile = ref(false)
const isUserPanelOpen = ref(false)

provide('isUserPanelOpen', isUserPanelOpen)

const isProfilePage = computed(() => route.path === '/chat/profile')

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

.mobile-profile-container {
  height: 100vh;
  overflow-y: auto;
  background: #fff8f0;
}
</style>