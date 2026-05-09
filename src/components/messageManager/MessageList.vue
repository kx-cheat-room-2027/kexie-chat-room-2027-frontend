<!--消息列表-->
<script setup>
import MessageItem from './MessageItem.vue'

defineProps({
  messages: Array
})
</script>

<template>
  <div class="list">
  <MessageItem
        v-for="msg in messages"
        :key="msg.id"
        :msg="msg"
    />
  </div>
</template>

<style scoped>
.list {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #fe9a1a;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #e88910;
}
</style>