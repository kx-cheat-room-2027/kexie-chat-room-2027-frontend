/**
 * WebSocket 工具类
 * 封装 WebSocket 连接、心跳保活、断线重连、消息收发
 */

class WebSocketClient {
  constructor(url) {
    this.url = url
    this.ws = null
    this.reconnectTimer = null
    this.heartbeatTimer = null
    this.reconnectCount = 0
    this.maxReconnectCount = 5
    this.reconnectDelay = 3000
    this.heartbeatInterval = 20000
    this.isManualClose = false

    this.onMessage = null
    this.onOpen = null
    this.onClose = null
    this.onError = null
  }

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return
    }
    const token = localStorage.getItem('token') || ''
    const url = token ? `${this.url}?x-token=${token}` : this.url
    this.isManualClose = false
    console.log('[WS] 正在连接:', this.url)

    try {
      this.ws = new WebSocket(url)
    } catch (e) {
      console.error('[WS] 创建连接失败:', e)
      this.scheduleReconnect()
      return
    }

    this.ws.onopen = () => {
      console.log('[WS] 连接成功')
      this.reconnectCount = 0
      this.startHeartbeat()
      this.onOpen && this.onOpen()
    }

    this.ws.onmessage = (event) => {
      const data = event.data
      if (data === 'pong' || data === 'PING') return

      try {
        const message = JSON.parse(data)
        if (message.type === 'pong' || message.type === 'ping') return
        this.onMessage && this.onMessage(message)
      } catch (e) {
        console.warn('[WS] 解析消息失败:', e, data)
      }
    }

    this.ws.onclose = (event) => {
      console.log('[WS] 连接关闭:', event.code, event.reason)
      this.stopHeartbeat()
      this.onClose && this.onClose(event)
      if (!this.isManualClose) {
        this.scheduleReconnect()
      }
    }

    this.ws.onerror = (error) => {
      console.error('[WS] 连接错误:', error)
      this.onError && this.onError(error)
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = typeof data === 'string' ? data : JSON.stringify(data)
      this.ws.send(message)
    } else {
      console.warn('[WS] 连接未就绪，无法发送消息')
    }
  }

  startHeartbeat() {
    this.stopHeartbeat()
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'ping' })
    }, this.heartbeatInterval)
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  scheduleReconnect() {
    if (this.reconnectCount >= this.maxReconnectCount) {
      console.error('[WS] 已达最大重连次数')
      return
    }

    this.reconnectCount++
    const delay = this.reconnectDelay * this.reconnectCount
    console.log(`[WS] ${delay / 1000}s 后进行第 ${this.reconnectCount} 次重连...`)

    this.reconnectTimer = setTimeout(() => {
      this.connect()
    }, delay)
  }

  close() {
    this.isManualClose = true
    this.stopHeartbeat()
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN
  }
}

const WS_URL = `ws://localhost:9100/ws`

let wsInstance = null

export function getWebSocket() {
  if (!wsInstance) {
    wsInstance = new WebSocketClient(WS_URL)
  }
  return wsInstance
}

export default WebSocketClient
