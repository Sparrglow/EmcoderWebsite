<script setup lang="ts">
/**
 * 基础卡片组件 (规范 §4.1 + §7.6 像素边框)
 */
withDefaults(defineProps<{
  hoverable?: boolean
}>(), {
  hoverable: false,
})
</script>

<template>
  <div
    :class="[
      $style.card,
      { [$style['card--hoverable']]: hoverable },
    ]"
  >
    <slot />
  </div>
</template>

<style module lang="scss">
/* 规范 §7.6: 像素边框卡片 */
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  box-shadow: 2px 2px 0 0 var(--color-border);
  padding: var(--spacing-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

[data-theme="dark"] .card {
  background: var(--color-surface);
}

.card--hoverable {
  cursor: pointer;

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 0 var(--color-border);
  }

  &:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 0 var(--color-border);
  }
}
</style>
