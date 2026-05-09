<template>

  <router-view v-if="isAuthPage"/>

  <div v-else class="app-container">
    <!-- 移动端 -->
    <div v-if="isMobile" class="mobile-container">
      <MobileChatPage />
    </div>

    <!-- PC端 -->
    <div v-else class="desktop-container">
      <Sidebar />
      <!-- 聊天页面 -->
       <!-- ChatMiddle为zgq负责部分 -->
      <MessageContainer />
      <UserPanel />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar/Sidebar.vue'
import UserPanel from './components/Sidebar/UserPanel.vue'
import MobileChatPage from './components/Sidebar/MobileChatPage.vue'
import MessageContainer from './components/messageManager/MessageContainer.vue'
  
const route = useRoute()
const isAuthPage = computed(() => ['/login', '/register'].includes(route.path))

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

<style>
body {
  margin: 0;
  background: #fff8f0;
}
  
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* background-color: #f3f2f2; */
}

  
#app {
  height: 100%;
  width: 100%;
}
</style>

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

