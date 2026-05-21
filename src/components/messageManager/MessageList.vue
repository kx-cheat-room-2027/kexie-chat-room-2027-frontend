<!--消息列表-->
<script setup>
import MessageItem from "./MessageItem.vue";
import { useMessage } from "@/mock/useMessage";
import { ref, nextTick } from "vue";

const messageList = ref(null);
const SCROLL_THRESHOLD = 100;
const loading = ref(false);
const noMoreHistory = ref(false);
const isAtBottom = ref(true);
const newMessageCount = ref(0);
const { messages, createHistoryMessages, createNewMessage, sendMessage } =
  useMessage();

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

  loading.value = true;

  const prevScrollHeight = messageList.value.scrollHeight;

  const historyMessages = await createHistoryMessages();

  if (historyMessages.length === 0) {
    noMoreHistory.value = true;
  } else {
    messages.value.unshift(...historyMessages);

    await nextTick();

    const newScrollHeight = messageList.value.scrollHeight;

    messageList.value.scrollTop += newScrollHeight - prevScrollHeight;
  }

  loading.value = false;
}

function receiveNewMessage(text) {
  createNewMessage(text);
  if (isAtBottom.value) {
    nextTick(() => {
      scrollToBottom();
    });
  } else {
    newMessageCount.value++;
  }
}

async function fetchHistoryMessages() {
  // 模拟接口返回数据，真实项目替换成接口请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: Date.now(), text: "历史消息" }]);
    }, 500);
  });
}

function scrollToBottom() {
  const el = messageList.value;
  el.scrollTop = el.scrollHeight;
  newMessageCount.value = 0;
}
</script>

<template>
  <div v-if="loading" class="loading-top">加载中...</div>
  <div v-else-if="noMoreHistory" class="loading-top">没有更多消息</div>
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
</style>
