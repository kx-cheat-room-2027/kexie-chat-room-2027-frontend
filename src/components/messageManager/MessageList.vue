<!--消息列表-->
<script setup>
import MessageItem from "./MessageItem.vue";
import { useChatStore } from "@/stores/chat";
import { ref, nextTick, computed, onMounted } from "vue";

const chatStore = useChatStore();
const messages = computed(() => chatStore.sortedMessages);

const messageList = ref(null);
const SCROLL_THRESHOLD = 100;
const loading = computed(() => chatStore.loading);
const noMoreHistory = ref(false);
const isAtBottom = ref(true);
const newMessageCount = ref(0);
const currentPage = ref(1);

function onScroll() {
  if (!messageList.value) return;
  const el = messageList.value;
  if (messageList.value.scrollTop < SCROLL_THRESHOLD) {
    loadMoreHistory();
  }
  isAtBottom.value = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
}

async function loadMoreHistory() {
  if (loading.value || noMoreHistory.value) return;

  const prevScrollHeight = messageList.value.scrollHeight;

  currentPage.value++;
  const prevLength = messages.value.length;
  await chatStore.loadHistory(currentPage.value, 20);

  if (messages.value.length === prevLength) {
    noMoreHistory.value = true;
  } else {
    await nextTick();
    const newScrollHeight = messageList.value.scrollHeight;
    messageList.value.scrollTop += newScrollHeight - prevScrollHeight;
  }
}

function receiveNewMessage(msg) {
  if (isAtBottom.value) {
    nextTick(() => {
      scrollToBottom();
    });
  } else {
    newMessageCount.value++;
  }
}

function scrollToBottom() {
  const el = messageList.value;
  if (el) {
    el.scrollTop = el.scrollHeight;
    newMessageCount.value = 0;
  }
}

onMounted(() => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>

<template>
  <div v-if="loading && messages.length === 0" class="loading-top">加载中...</div>
  <div v-else-if="noMoreHistory && messages.length > 0" class="loading-top">没有更多消息</div>
  <div class="list" ref="messageList" @scroll="onScroll">
    <MessageItem v-for="msg in messages" :key="msg.id" :msg="msg" />
  </div>
  <div
    v-if="!isAtBottom && newMessageCount > 0"
    class="new-message-tip"
    @click="scrollToBottom"
  >
    {{ newMessageCount }} 条新消息
  </div>
</template>

<style scoped>
.list {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
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
.loading-top {
  text-align: center;
  padding: 10px;
  color: #999;
  font-size: 12px;
}
.new-message-tip {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #fe9a1a;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
}
</style>
