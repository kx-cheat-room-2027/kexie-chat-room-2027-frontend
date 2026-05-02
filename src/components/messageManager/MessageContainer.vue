<!--主容器-->
<script setup>
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import { useMessage } from './useMessage'

const { messages, sendMessage } = useMessage()
</script>

<template>
  <div class="chat">
    <div class="header">
      <p>聊天室</p>
    </div>

    <MessageList :messages="messages" />

    <MessageInput @send="sendMessage" />
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
  padding: 16px;
  font-weight: bold;
  background: #f5e7d6;
}
.header p {
  align-self: start;
  color: #48302b;
}
</style>