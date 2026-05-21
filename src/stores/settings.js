import { defineStore } from 'pinia'
import { ref } from 'vue'

/**

 * - 消息静音：由顶部导航栏 (ChatHeader) 触发开关，侧边栏 (Sidebar) 接收消息时读取该状态决定是否播放提示音。
*/
export const useSettingsStore = defineStore('settings', () => {
  // 是否开启消息静音 (false表示有声音，true表示静音)
  const isMuted = ref(false)
  
  // 切换静音状态的方法
  const toggleMute = () => {
    isMuted.value = !isMuted.value
  }
  
  return { isMuted, toggleMute }
})