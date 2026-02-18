<script setup lang="ts">
/**
 * 根应用组件 (规范 §3.2 + §8.2)
 */
import { useTheme } from '@/composables/useTheme'

// 初始化主题
useTheme()
</script>

<template>
  <router-view />
</template>
