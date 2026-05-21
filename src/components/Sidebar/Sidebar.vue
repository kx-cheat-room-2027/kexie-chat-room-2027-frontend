<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="header-top">
        <div class="logo">
          <span class="logo-text">ClayChat</span>
          <span class="logo-status">ACTIVE NOW</span>
        </div>
        <button class="user-avatar-btn" @click="toggleProfile">
          <div class="user-avatar">
            <img v-if="authStore.userInfo?.avatar" :src="authStore.userInfo.avatar" class="avatar-img" alt="avatar" />
            <span v-else class="avatar-icon">👤</span>
          </div>
        </button>
      </div>
    </div>

    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.id"
        :class="['nav-item', { active: activeNav === item.id }]"
        @click="handleNavClick(item.id)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.text }}</span>
      </button>
    </nav>

    <div class="session-list">
      <div 
        v-for="room in filteredRooms" 
        :key="room.id" 
        class="session-item"
        @click="selectRoom(room)"
      >
        <div class="session-avatar-wrapper">
          <img :src="room.avatar" class="session-avatar" alt="avatar" />
          <div v-if="room.unreadCount > 0" class="unread-badge">
            {{ room.unreadCount > 99 ? '99+' : room.unreadCount }}
          </div>
        </div>
        <div class="session-content">
          <div class="session-header">
            <span class="session-name">{{ room.name }}</span>
            <span class="session-time">{{ formatTime(room.lastTime) }}</span>
          </div>
          <p class="message-preview">{{ room.lastMessage }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useSettingsStore } from "@/stores/settings";

async function getSessionList() {
  return [];
}

const emit = defineEmits(["navChange", "roomSelect"]);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const settingsStore = useSettingsStore();

const activeNav = ref("chatroom");

const navItems = [
  { id: "chatroom", icon: "👥", text: "聊天室" },
  { id: "friends", icon: "👤", text: "好友" },
];

const chatRooms = ref([]);
const loading = ref(false);

// 当前选中的房间ID
const currentRoomId = computed(() => {
  const id = parseInt(route.params.id, 10);
  return isNaN(id) ? null : id;
});

const fetchSessionData = async () => {
  loading.value = true;
  try {
    const res = await getSessionList();
    if (res.code === 0) {
      // 初始化时就进行排序
      chatRooms.value = res.data.sort((a, b) => Number(b.lastTime) - Number(a.lastTime));
    }
  } catch (error) {
    console.error("获取会话列表失败:", error);
  } finally {
    loading.value = false;
  }
};

// 播放提示音 (更柔和的双音铃声)
const playNotificationSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //铃声设置
    const playTone = (freq, startTime, duration, vol) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(vol, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = audioCtx.currentTime;
    // 提示音
    playTone(659.25, now, 0.2, 0.08); // E5
    playTone(783.99, now + 0.12, 0.4, 0.1); // G5
  } catch (e) {
    console.error("播放提示音失败", e);
  }
};

// 处理新消息的逻辑
const handleNewMessage = (newMessage) => {
  // 播放提示音
  if (!settingsStore.isMuted) {
    playNotificationSound();
  }

  const roomIndex = chatRooms.value.findIndex(room => room.id === newMessage.roomId);

  if (roomIndex !== -1) {
    // 情况1 & 2: 聊天室已存在
    const room = chatRooms.value[roomIndex];
    room.lastMessage = newMessage.content;
    room.lastTime = newMessage.timestamp;

    if (room.id === currentRoomId.value) {
      // 情况1: 正在看这个聊天室
      // 不增加未读数
    } else {
      // 情况2: 在看别的聊天室
      room.unreadCount = (room.unreadCount || 0) + 1;
    }
    
    // 将更新后的房间移到数组顶部
    chatRooms.value.splice(roomIndex, 1);
    chatRooms.value.unshift(room);

  } else {
    // 情况3: 收到一个全新的聊天
    // 注意：在实际应用中，这里需要通过API获取新房间的完整信息
    const newRoom = {
      id: newMessage.roomId,
      name: `新聊天室 ${newMessage.roomId}`,
      avatar: 'https://via.placeholder.com/42', // 默认头像
      lastMessage: newMessage.content,
      lastTime: newMessage.timestamp,
      unreadCount: 1,
      isGroup: true, // 假设是群聊
    };
    chatRooms.value.unshift(newRoom);
  }
};


onMounted(() => {
  fetchSessionData();
});

// 监听路由变化，当进入一个房间时，清空该房间的未读数
watch(currentRoomId, (newId, oldId) => {
  if (newId && newId !== oldId) {
    const room = chatRooms.value.find(r => r.id === newId);
    if (room && room.unreadCount > 0) {
      room.unreadCount = 0;
    }
  }
});

const sortedRooms = computed(() => {
  // chatRooms 数组现在总是保持排序状态，直接使用
  return chatRooms.value;
});

const filteredRooms = computed(() => {
  const roomsToFilter = sortedRooms.value;
  if (activeNav.value === "chatroom") {
    return roomsToFilter.filter(room => room.isGroup);
  } else {
    return roomsToFilter.filter(room => !room.isGroup);
  }
});

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  let timestamp = Number(timeStr);
  if (isNaN(timestamp)) {
    return timeStr; 
  }

  if (timeStr.toString().length === 10) {
    timestamp *= 1000;
  }
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timeStr;

  const now = new Date();
  const isToday = date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth() &&
                date.getDate() === now.getDate();

  if (isToday) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // 简单处理，显示月/日
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  }
};

const handleNavClick = (id) => {
  activeNav.value = id;
  emit("navChange", id);
};

const selectRoom = (room) => {
  if (room.unreadCount > 0) {
    room.unreadCount = 0;
  }
  emit("roomSelect", room.id);
  router.push(`/chat/${room.id}`);
};

const toggleProfile = () => {
  if (route.path === "/chat/profile") {
    router.push("/chat");
  } else {
    router.push("/chat/profile");
  }
};
</script>

<style scoped>
.sidebar {
  width: clamp(220px, 22vw, 320px);
  min-width: 220px;
  height: 100vh;
  background: #ffefd5;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.sidebar-header {
  margin-bottom: 30px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.logo {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #5d4e37;
  letter-spacing: -0.5px;
}

.logo-status {
  font-size: 10px;
  color: #8b7b5e;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.user-avatar-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E8DDC8 0%, #D4C9A8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-icon {
  font-size: 20px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  width: 100%;
  max-width: 220px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #5d4e37;
  text-align: left;
}

.nav-item:hover {
  background: rgba(217, 158, 89, 0.2);
}

.nav-item.active {
  background: linear-gradient(135deg, #ffbc67 0%, #da7a2d 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(217, 158, 89, 0.4);
}

.nav-icon {
  font-size: 18px;
}

.nav-text {
  font-weight: 500;
}

.session-list {
  margin-top: 24px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.session-list::-webkit-scrollbar {
  width: 4px;
}
.session-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.session-item:hover {
  background: rgba(255, 255, 255, 0.4);
}

.session-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.session-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.unread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4d4f;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  height: 18px;
  min-width: 18px;
  line-height: 14px;
  border-radius: 9px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffefd5;
}

.session-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-name {
  font-weight: 600;
  color: #5d4e37;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.session-time {
  font-size: 12px;
  color: #a4967f;
  flex-shrink: 0;
}

.message-preview {
  margin: 0;
  font-size: 13px;
  color: #8b7b5e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1200px) {
  .sidebar {
    width: clamp(220px, 24vw, 280px);
    padding: 24px 16px;
  }

  .nav-item {
    max-width: 180px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
    box-shadow: none;
    padding: 20px;
  }
}
</style>
