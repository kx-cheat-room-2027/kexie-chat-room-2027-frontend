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
</style>