import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getWebSocket } from '@/utiles/websocket'
import { sendMessage as apiSendMessage, getMessageList } from '@/api/message'

function getToken() {
  return localStorage.getItem('token') || ''
}

function isLoggedIn() {
  return !!getToken()
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isConnected = ref(false)
  const loading = ref(false)

  const sortedMessages = computed(() => {
    return [...messages.value].sort((a, b) => {
      return new Date(a.createTime) - new Date(b.createTime)
    })
  })

  let ws = null

  function connectWS() {
    if (!isLoggedIn()) {
      console.warn('[ChatStore] 未检测到 token')
      return
    }

    ws = getWebSocket()

    ws.onOpen = () => {
      isConnected.value = true
      console.log('[ChatStore] WebSocket 已连接')
    }

    ws.onMessage = (message) => {
      handleIncomingMessage(message)
    }

    ws.onClose = () => {
      isConnected.value = false
      console.log('[ChatStore] WebSocket 已断开')
    }

    ws.onError = (error) => {
      isConnected.value = false
      console.error('[ChatStore] WebSocket 错误:', error)
    }

    ws.connect()
  }

  function disconnectWS() {
    if (ws) {
      ws.close()
      ws = null
    }
    isConnected.value = false
  }

  function handleIncomingMessage(msg) {
    const formattedMsg = {
      id: msg.id || Date.now().toString(),
      content: msg.content || msg.msgContent?.content || '',
      type: msg.type || msg.msgContent?.type || 'text',
      self: false,
      username: msg.fromName || '未知用户',
      fromId: msg.fromId || '',
      time: formatTime(msg.createTime),
      createTime: msg.createTime,
      isShowTime: msg.isShowTime ?? true
    }

    const exists = messages.value.some(m => m.id === formattedMsg.id)
    if (!exists) {
      messages.value.push(formattedMsg)
    }
  }

  async function sendMessage(content) {
    if (!content || !content.trim()) return
    if (!isLoggedIn()) {
      console.warn('[ChatStore] 未登录')
      return
    }

    try {
      loading.value = true
      const res = await apiSendMessage({
        type: 'text',
        content: content.trim()
      })

      if (res.code === 0) {
          let userInfo = null
          try {
              userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null')
          } catch {}
        const msg = res.data
        const formattedMsg = {
          id: msg.id,
          content: msg.msgContent?.content || content,
          type: msg.msgContent?.type || 'text',
          self: true,
          username: msg.fromName || userInfo.name,
          fromId: msg.fromId || '',
          time: formatTime(msg.createTime),
          createTime: msg.createTime,
          isShowTime: msg.isShowTime ?? true
        }

        const exists = messages.value.some(m => m.id === formattedMsg.id)
        if (!exists) {
          messages.value.push(formattedMsg)
        }
      }
    } catch (error) {
      console.error('[ChatStore] 发送失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function loadHistory(pageNum = 1, pageSize = 20) {
    if (!isLoggedIn()) return

    try {
      loading.value = true
      const res = await getMessageList(pageNum, pageSize)

      if (res.code === 0 && res.data?.records) {
        let userInfo = null
        try {
          userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null')
        } catch {}

        const historyMsgs = res.data.records.map(msg => ({
          id: msg.id,
          content: msg.msgContent?.content || msg.content || '',
          type: msg.msgContent?.type || msg.type || 'text',
          self: userInfo ? msg.fromId === userInfo.id : false,
          username: msg.msgContent?.formUserName || '未知用户',
          fromId: msg.fromId || '',
          time: formatTime(msg.createTime),
          createTime: msg.createTime,
          isShowTime: msg.isShowTime ?? true
        }))

        historyMsgs.forEach(msg => {
          const exists = messages.value.some(m => m.id === msg.id)
          if (!exists) {
            messages.value.push(msg)
          }
        })
      }
    } catch (error) {
      console.error('[ChatStore] 加载历史失败:', error)
    } finally {
      loading.value = false
    }
  }

  function clearMessages() {
    messages.value = []
  }

  function formatTime(dateStr) {
    if (!dateStr) return new Date().toLocaleTimeString()
    try {
      return new Date(dateStr).toLocaleTimeString()
    } catch {
      return dateStr
    }
  }

  return {
    messages,
    sortedMessages,
    isConnected,
    loading,
    connectWS,
    disconnectWS,
    sendMessage,
    loadHistory,
    clearMessages
  }
})
