
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { findUser, addUser } from "@/mock/users";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  console.log(token.value);
  const userInfo = ref(JSON.parse(localStorage.getItem("userInfo") || "null"));

  /** 更新用户信息（头像、简介等） */
  function updateUserInfo(updates) {
    if (userInfo.value) {
      Object.assign(userInfo.value, updates);
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
    }
  }

  const isLoggedIn = computed(() => !!token.value);

  // 登录：验证假数据
  function login(email, password) {
    const user = findUser(email, password);
    if (user) {
      const fakeToken = "fake-token-" + Date.now();
      token.value = fakeToken;
      userInfo.value = { name: user.name, email: user.email };
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
      return { success: true };
    }
    return { success: false, message: "邮箱或密码错误" };
  }

  // 注册：写入假数据并自动登录
  function register(name, email, password) {
    const result = addUser({ name, email, password });
    if (result.success) {
      return login(email, password);
    }
    return result;
  }

  function logout() {
    token.value = "";
    userInfo.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  }

  return { token, isLoggedIn, userInfo, login, logout, register, updateUserInfo };
});
