<template>
  <div class="app-container">
    <!-- 移动端 -->
    <div v-if="isMobile && route.path === '/chat'" class="mobile-container">
      <MobileChatPage />
    </div>
    <div v-else-if="isMobile && route.path !== '/chat'" class="mobile-chat-detail-container">
      <slot />
      <UserPanel v-if="isUserPanelOpen" />
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
const selectedUser = ref({ name: "用户名" })

const openUserPanel = (user) => {
  // 再次点击相同头像时，就关闭该面板
  if (isUserPanelOpen.value && selectedUser.value.name === user.name) {
    isUserPanelOpen.value = false
  } else {
    selectedUser.value = user
    isUserPanelOpen.value = true
  }
}

provide('isUserPanelOpen', isUserPanelOpen)
provide('selectedUser', selectedUser)
provide('openUserPanel', openUserPanel)

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
  flex: 1;           
  overflow: hidden;  
  display: flex;
  flex-direction: column;
}
.mobile-container {
  height: 100vh;
  overflow-y: auto;
}

.mobile-chat-detail-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff8f0;
  position: relative;
}
</style>