// src/utils/device.js

/**
 * 判断当前设备是否为移动端
 * 返回 true = 移动端, false = PC端
 */
export function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  // 常见移动设备关键字
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}