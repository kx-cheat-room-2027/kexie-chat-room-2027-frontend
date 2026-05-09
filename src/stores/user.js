import { defineStore } from 'pinia'
import { login } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('user_token') || '',
    userInfo: JSON.parse(localStorage.getItem('user_info')) || {},
  }),
  actions: {
    async loginAction(form) {
      const res = await login(form)
      this.token = res.data.token
      this.userInfo = res.data.user

      localStorage.setItem('user_token', res.data.token)
      localStorage.setItem('user_info', JSON.stringify(res.data.user))

      return res
    },
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_info')
    }
  }
})
