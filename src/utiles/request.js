import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('user_token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      ElMessage.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service