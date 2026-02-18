<script setup lang="ts">
/**
 * SVG 图标组件 (规范 §7.5: 线性极简图标 + SVG)
 * 使用 SVG path 确保高清，stroke 绘制线性图标
 */
const props = withDefaults(defineProps<{
  name: string
  size?: number
}>(), {
  size: 20,
})

/**
 * 图标路径映射 - SVG path 确保任意缩放锐利 (规范 §7.5)
 * stroke-based 线性图标，网格对齐
 */
const iconPaths: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1',
  'message-square': 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  cpu: 'M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2M19 9h2m-2 6h2M7 7h10v10H7z',
  'book-open': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  zap: 'M13 2L3 14h9l-1 10 10-12h-9l1-10z',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3',
  'shield-check': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  bug: 'M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0m-6 0h6m6 0h6M9 3v2m6-2v2M5 8l2 2m10-2l-2 2',
  upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5-5 5m5-5v12',
  terminal: 'M4 17l6-5-6-5m8 14h8',
  wifi: 'M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01',
  'refresh-cw': 'M23 4v6h-6M1 20v-6h6m16.49-3A10 10 0 005.07 5.44L1 10m22 4l-4.07 4.56A10 10 0 013.51 13',
  'hard-drive': 'M22 12H2m20 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6m20 0V6a2 2 0 00-2-2H4a2 2 0 00-2 2v6m16 3h.01M12 15h.01',
  sun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  moon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  globe: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 0c2.21 0 4-4.477 4-10S14.21 2 12 2 8 6.477 8 12s1.79 10 4 10zM2 12h20',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-right': 'M9 18l6-6-6-6',
  x: 'M18 6L6 18M6 6l12 12',
  menu: 'M4 6h16M4 12h16M4 18h16',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  'external-link': 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3',
  copy: 'M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2zm0 0a2 2 0 00-2 2v12a2 2 0 002 2h0',
  check: 'M20 6L9 17l-5-5',
}
</script>

<template>
  <svg
    :class="$style.icon"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="iconPaths[props.name] || iconPaths['code']" />
  </svg>
</template>

<style module lang="scss">
/* 规范 §7.5: 线性极简图标 */
.icon {
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
}
</style>
