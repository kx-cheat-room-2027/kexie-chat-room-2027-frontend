<!--主容器-->
<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

const messages = computed(() => chatStore.sortedMessages)

function handleSend(text) {
  chatStore.sendMessage(text)
}

onMounted(() => {
  chatStore.connectWS()
  chatStore.loadHistory()
})

onUnmounted(() => {
  chatStore.disconnectWS()
})
</script>



<template>
  <div class="chat">
    <div class="header">
      <div>聊天室</div>
      <div class="ws-status" :class="{ connected: chatStore.isConnected }">
        {{ chatStore.isConnected ? '已连接' : '未连接' }}
      </div>
    </div>

    <MessageList :messages="messages" />

    <MessageInput @send="handleSend" />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  height: 5%;
  font-weight: bold;
  background: #f5e7d6;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;
}

.header div:first-child {
  margin-left: 3%;
  color: #4e342e;
}

.ws-status {
  font-size: 12px;
  font-weight: normal;
  padding: 2px 8px;
  border-radius: 10px;
  background: #ffcc80;
  color: #666;
}

.ws-status.connected {
  background: #a5d6a7;
  color: #2e7d32;
}
</style>
