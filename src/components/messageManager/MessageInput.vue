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

const showEmoji = ref(false)
const emojis = [
  '😀','😃','😄','😁','😆','😅','😂','🤣',
  '😊','😇','🙂','🙃','😉','😌','😍','🥰','😘',
  '😗','😙','😚','😋','😛','😝','😜','🤪','🤨',
  '🧐','🤓','😎','🥸',
  '😭','🥲','😢','😥','😓','😞','😔','😟','😕',
  '🙁','☹️','😣','😖','😫','😩','🥺',
  '😡','😠','🤬','😤','😑','😐','😶',
  '👍','👎','👌','✌️','🤞','🤝','👏','🙌','🙏',
  '💪','🫶','🤙','☝️','👆','👇','👉','👈',
  '🤔','🫠','🤯','😵','😵‍💫','🫡','🤫','🤭',
  '👀','👋','🫵','🫴','🤲'
]
function emoji() {
  showEmoji.value = !showEmoji.value
}
function insertEmoji(e) {
  text.value += e
}
function show() {
  showEmoji.value = true
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.emoji-panel') &&
      !e.target.closest('button')) {
    showEmoji.value = false
  }
})
</script>

<template>
  <div class="input-wrapper">
    <div class="emoji-panel" v-if="showEmoji">
    <span
        v-for="e in emojis"
        :key="e"
        @click="insertEmoji(e)"
    >
      {{ e }}
    </span>
    </div>
    <div class="input">
      <button @click="add">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
              d="M11 5v6H5v2h6v6h2v-6h6v-2h-6V5z"
              fill="#fe9a1a"
          />
        </svg>
      </button>
      <button @click="show">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="9.5" fill="none" stroke="#fe9a1a" stroke-width="1.8"/>
          <circle cx="9" cy="10" r="1" fill="#fe9a1a"/>
          <circle cx="15" cy="10" r="1" fill="#fe9a1a"/>
          <path d="M8 14c1.5 2 6.5 2 8 0" fill="none" stroke="#fe9a1a" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <input
          v-model="text"
          placeholder="来唠嗑一会吧~"
          @keyup.enter="send"
      />
      <button class="sendBtn" @click="send">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M2 21L22 12L2 3l6 9-6 9z" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M8 12L20 12" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
.input {
  display: flex;
  padding: 10px;
  background: #fff8f0;
}

input {
  flex: 1;
  font-size: 80%;
  color: black;
  background: #f0f1f1;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
  height: 30px;
  width: 80%;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 20px;
  border: none;
}
input {
  transition: all 0.2s ease;
}
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #ffcc80;
}
button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #f5e7d6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

button:active {
  transform: scale(0.92);
}
.sendBtn {
  background: linear-gradient(135deg, #edb27e, #ec964d);
}
.emoji-panel {
  position: absolute;
  width: 220px;
  height: 180px;
  overflow-y: auto;
  bottom: 70px;
  left: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}
.emoji-panel span {
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  text-align: center;
  transition: 0.15s;
}
.emoji-panel span:hover {
  transform: scale(1.2);
}
.input-wrapper {
  position: relative;
}
::-webkit-scrollbar {
  width: 5px;
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