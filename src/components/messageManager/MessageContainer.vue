<!--主容器-->
<script setup>
<<<<<<< HEAD
import { onMounted, onUnmounted, computed } from 'vue'
=======
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ChatHeader from './ChatHeader.vue'
>>>>>>> 23333a7 (feat: 完善聊天交互与移动端适配)
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import { useChatStore } from '@/stores/chat'

<<<<<<< HEAD
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
=======
const route = useRoute()
const roomIdRef = computed(() => route.params.id)

const { messages, sendMessage } = useMessage(roomIdRef)
>>>>>>> 23333a7 (feat: 完善聊天交互与移动端适配)
</script>



<template>
  <div class="chat">
<<<<<<< HEAD
    <div class="header">
      <div>聊天室</div>
      <div class="ws-status" :class="{ connected: chatStore.isConnected }">
        {{ chatStore.isConnected ? '已连接' : '未连接' }}
      </div>
    </div>
=======
    <ChatHeader />
>>>>>>> 23333a7 (feat: 完善聊天交互与移动端适配)

    <MessageList />

    <MessageInput @send="handleSend" />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
<<<<<<< HEAD

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
=======
</style>
>>>>>>> 23333a7 (feat: 完善聊天交互与移动端适配)
