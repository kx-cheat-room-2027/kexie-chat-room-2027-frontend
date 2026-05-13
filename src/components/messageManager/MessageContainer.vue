<!--主容器-->
<script setup>
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import { useMessage } from '@/mock/useMessage.js'

const { messages, sendMessage } = useMessage()
</script>



<template>
  <div class="chat">
    <div class="header">
      <div>聊天室</div>
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
  height: 5%;
  font-weight: bold;
  background: #f5e7d6;
  align-items: center;
}

.header div {
  margin-left: 3%;
  color: #4e342e;
}
</style>