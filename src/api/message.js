import request from '@/utiles/request'

export function sendMessage(data) {
  return request({
    url: '/message/send',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function getMessageList(pageNum = 1, pageSize = 20) {
  return request({
    url: '/message/list/desc',
    method: 'get',
    params: { pageNum, pageSize }
  })
}

export function uploadFile(messageId, file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/message/upload-file/${messageId}`,
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getImageUrl(minioName) {
  return request({
    url: `/message/url/image/${minioName}`,
    method: 'get'
  })
}

export function getFileUrl(minioName) {
  return request({
    url: `/message/url/file/${minioName}`,
    method: 'get'
  })
}
