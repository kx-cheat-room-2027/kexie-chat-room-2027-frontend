// import { createRouter, createWebHistory } from 'vue-router'
// import Login from '../views/Login.vue'
// import Register from '../views/Register.vue'

// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', component: Login },
//   { path: '/register', component: Register },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// export default router

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/ChatView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/chat",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 需要登录但没登录 → 去登录页
  console.log("路由守卫：", to.path, "需要登录？", to.meta.requiresAuth, "已登录？", authStore.isLoggedIn);
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/login");
  }
  // 已登录但去登录/注册页 → 去首页
  else if (
    (to.path === "/login" || to.path === "/register") &&
    authStore.isLoggedIn
  ) {
    next("/chat");
  } else {
    next();
  }
});

export default router;
