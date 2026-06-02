<!--消息列表-->
<script setup>
import { ref, computed, nextTick, inject, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import MessageItem from "./MessageItem.vue";
import { useChatStore } from "@/stores/chat";

// ─────────────── 保留：feature-chat-improvement（已注释）───────────────
// import { useMessage } from "@/mock/useMessage.js";
// import { ref, nextTick, onMounted } from "vue";

// ─────────────── 保留：23333a7（已注释）───────────────
// import { useMessage } from "@/mock/useMessage";
// const route = useRoute();
// const roomIdRef = computed(() => route.params.id);
// const isUserPanelOpen = inject('isUserPanelOpen', null);

const chatStore = useChatStore();
const messages = computed(() => chatStore.sortedMessages);

const messageList = ref(null);
const SCROLL_THRESHOLD = 100;
const loading = computed(() => chatStore.loading);
const noMoreHistory = ref(false);
const isAtBottom = ref(true);
const newMessageCount = ref(0);
const currentPage = ref(1);

// ─────────────── 保留：23333a7（已注释）───────────────
// const { messages, createHistoryMessages, createNewMessage } = useMessage(roomIdRef);

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
  
  // ─── 生效：HEAD ───
  if (el) {
    el.scrollTop = el.scrollHeight;
    newMessageCount.value = 0;
  }
  
  // ─── 保留：feature-chat-improvement 实现（已注释）───
  // if (!el) return;
  // el.scrollTop = el.scrollHeight;
  // newMessageCount.value = 0;
}

// ─────────────── 保留：feature-chat-improvement（已注释）───────────────
// // 进入页面自动滚动到底部
// onMounted(() => {
//   nextTick(() => {
//     scrollToBottom();
//   });
// });
// 
// // 发送消息后强制滚动到底部
// function sendMessageAndScroll(text) {
//   sendMessage(text);
//   nextTick(() => {
//     scrollToBottom();
//   });
// }
// 
// // 暴露给父组件调用
// defineExpose({
//   scrollToBottom,
//   sendMessageAndScroll,
//   receiveNewMessage,
// });

// ─── 生效：HEAD ───
onMounted(() => {
  nextTick(() => {
    scrollToBottom();
  });
});

// ─────────────── 保留：23333a7（已注释）───────────────
// // 解决手机端弹出版面再关闭后滑动不便的bug
// watch(() => isUserPanelOpen?.value, (val) => {
//   if (!val) {
//     nextTick(() => {
//       scrollToBottom();
//     });
//   }
// });
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