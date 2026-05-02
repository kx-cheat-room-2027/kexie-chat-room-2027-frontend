<!--输入框-->
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['send'])
const text = ref('')

function send() {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<template>
  <div class="input">
    <input
        v-model="text"
        placeholder="Type a message..."
        @keyup.enter="send"
    />
    <button @click="send">➤</button>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  padding: 10px;
  background: #ddd;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: none;
}

button {
  margin-left: 10px;
  border-radius: 50%;
  width: 40px;
}
</style>