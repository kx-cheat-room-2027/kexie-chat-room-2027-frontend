
import { ref, watch, unref } from "vue";
import { getChatRoom, updateRoomLastMessage } from "./chatRoom"

// 以 roomId 为 key 存储每个房间的聊天记录字典
const allMessages = {};

// 当前展示给组件的消息列表
const messages = ref([]);

export function useMessage(roomIdRef) {
  function loadMockData(roomId) {
    if (!allMessages[roomId]) {
      const roomInfo = getChatRoom(roomId);
      // 如果这个房间没有历史记录，就初始化一段假数据
      allMessages[roomId] = [
        {
          id: 1,
          content: "哈喽，这是初始化的测试消息！",
          self: false,
          time: "10:42AM",
          username: "小橘子",
        },
        {
          id: 2,
          content: roomInfo && roomInfo.lastMessage ? roomInfo.lastMessage : "你吃饭了吗？",
          self: true,
          time: "10:45AM",
          username: "我自己",
        }
      ];
    }
    // 将当前 messages 的引用指向对应房间的数组
    messages.value = allMessages[roomId];
  }

  // 核心修复点：监听路由上传入的 roomId，如果变了，就立刻重新加载并切换消息
  watch(
    () => unref(roomIdRef),
    (newRoomId) => {
      if (newRoomId) {
        loadMockData(newRoomId);
      }
    },
    { immediate: true } // 一上来就执行一次
  );

  function sendMessage(text) {
    const roomId = unref(roomIdRef);
    if (!roomId) return;
    
    const newMsg = {
      id: Date.now(),
      content: text,
      self: true,
      time: new Date().toLocaleTimeString(),
    };
    allMessages[roomId].push(newMsg);
    
    // 发送消息后，同时更新到侧边栏显示最新消息
    updateRoomLastMessage(roomId, newMsg);
  }

  function createNewMessage(text) {
    const roomId = unref(roomIdRef);
    if (!roomId) return;

    const newMsg = {
      id: Date.now(),
      content: text,
      self: false,
      username: "神秘人",
      time: new Date().toLocaleTimeString(),
    };
    allMessages[roomId].push(newMsg);

    // 接收消息后，也更新侧边栏
    updateRoomLastMessage(roomId, newMsg);
  }

  async function createHistoryMessages() {
    const roomId = unref(roomIdRef);
    if (!roomId) return [];

    const history = [
      {
        id: Date.now() + Math.random(),
        content: "这是更早的历史消息（Mock）",
        self: false,
        time: "09:00AM",
        username: "老李",
      }
    ];

    allMessages[roomId].unshift(...history);
    return history;
  }

  return {
    messages,
    sendMessage,
    createNewMessage,
    createHistoryMessages,
  };
}

