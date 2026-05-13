// src/mock/chatRooms.js
import { ref } from 'vue'

/** 响应式聊天室数组 */
const chatRooms = ref([])

/** 初始化 mock 数据 */
export function loadMockData() {
    chatRooms.value = [
        // 群聊
        {
            id: '001',
            name: '大厅',
            avatar: '我是头像.jpg',
            lastMessage: '厉害2333333',
            lastTime: '1654684846',
            unreadCount: 2,
            isGroup: true,
            members: ['张三', '李四']
        },
        {
            id: '002',
            name: '聊天室2号',
            avatar: '我是头像.jpg',
            lastMessage: '何意味？？',
            lastTime: '641468468541',
            unreadCount: 5,
            isGroup: true,
            members: ['张四', '李三']
        },
        {
            id: '003',
            name: '聊天室3号',
            avatar: '我是头像.jpg',
            lastMessage: '阿瓦达挖法二发额发',
            lastTime: '15641685151',
            unreadCount: 2,
            isGroup: true,
            members: ['阿达', '李四发']
        },
        // 朋友
        {
            id: '004',
            name: '朋友',
            avatar: '我是头像.jpg',
            lastMessage: '你吃饭了吗',
            lastTime: '114514',
            unreadCount: 1,
            isGroup: false,
            members: null
        },
        {
            id: '005',
            name: '朋友2',
            avatar: '我是头像.jpg',
            lastMessage: '你晚上吃饭了吗',
            lastTime: '114514',
            unreadCount: 1,
            isGroup: false,
            members: null
        }
    ]
}

/** 返回排序后的聊天室数组（按 lastTime 降序） */
export function getChatRooms() {
    return chatRooms.value.slice().sort((a, b) => b.lastTime - a.lastTime)
}

/** 返回单个聊天室 */
export function getChatRoom(roomId) {
    return chatRooms.value.find(room => room.id === roomId)
}

/** 更新最后消息和时间 */
export function updateRoomLastMessage(roomId, message) {
    const room = getChatRoom(roomId)
    if (room) {
        room.lastMessage = message.content
        room.lastTime = message.timestamp || new Date().getTime().toString()
    }
}

/** 未读 +1 */
export function increaseUnread(roomId) {
    const room = getChatRoom(roomId)
    if (room) {
        room.unreadCount = (room.unreadCount || 0) + 1
    }
}

/** 清空未读 */
export function clearUnread(roomId) {
    const room = getChatRoom(roomId)
    if (room) {
        room.unreadCount = 0
    }
}

// 初始化数据
loadMockData()