const DEFAULT_USERS = [
  { email: 'test@example.com', password: '123456', name: '测试用户' },
  { email: 'admin@example.com', password: 'admin', name: '管理员' }
]

function getStoredUsers() {
  const stored = localStorage.getItem('mock_users')
  if (stored) return JSON.parse(stored)
  localStorage.setItem('mock_users', JSON.stringify(DEFAULT_USERS))
  return [...DEFAULT_USERS]
}

let userList = getStoredUsers()

export function findUser(email, password) {
  return userList.find(u => u.email === email && u.password === password)
}

export function addUser(user) {
  if (userList.find(u => u.email === user.email)) {
    return { success: false, message: '该邮箱已注册' }
  }
  userList.push(user)
  localStorage.setItem('mock_users', JSON.stringify(userList))
  return { success: true }
}