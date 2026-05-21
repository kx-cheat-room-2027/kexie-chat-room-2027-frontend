<template>
  <!-- 登录/注册页：裸路由视图，无布局 -->
  <router-view v-if="isAuthPage" />

  <!-- 其他页面：用 MainLayout 包裹 -->
  <MainLayout v-else>
    <router-view />
  </MainLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute()

// 判断当前是否在登录注册页
const isAuthPage = computed(() => {
  return ['/login', '/register'].includes(route.path)
})
</script>