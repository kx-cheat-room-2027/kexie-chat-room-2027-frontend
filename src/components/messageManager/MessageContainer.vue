<!--主容器-->
<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import { useChatStore } from '@/stores/chat'

// ─────────────── 保留：23333a7 分支代码（已注释）───────────────
// import { useRoute } from 'vue-router'
// import ChatHeader from './ChatHeader.vue'
// const route = useRoute()
// const roomIdRef = computed(() => route.params.id)
// const { messages: roomMessages, sendMessage: roomSend } = useMessage(roomIdRef)

// ─────────────── 保留：feature-chat-improvement / main 代码（已注释）───────────────
// import { useMessage } from '@/mock/useMessage.js'
// import { ref, nextTick } from 'vue'
// const { messages: mockMessages, sendMessage: mockSend } = useMessage()
// const msgListRef = ref(null)
// function handleSendMock(text) {
//   mockSend(text)
//   nextTick(() => {
//     msgListRef.value?.scrollToBottom()
//   })
// }

// ─────────────── 当前生效：HEAD（WebSocket）───────────────
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
    <!-- 保留：23333a7 的 ChatHeader（已注释）
    <ChatHeader />
    -->

    <!-- 生效：HEAD 的原生 header + WebSocket 状态 -->
    <div class="header">
      <div>聊天室</div>
      <div class="ws-status" :class="{ connected: chatStore.isConnected }">
        {{ chatStore.isConnected ? '已连接' : '未连接' }}
      </div>
    </div>

    <!-- 保留：feature-chat-improvement 的 MessageList（已注释）
    <MessageList ref="msgListRef" :messages="messages" />
    -->
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