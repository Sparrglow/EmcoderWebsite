<script setup lang="ts">
/**
 * 基础 Badge 组件 (规范 §4.1)
 */
withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'accent' | 'muted'
}>(), {
  variant: 'default',
})
</script>

<template>
  <span :class="[$style.badge, $style[`badge--${variant}`]]">
    <slot />
  </span>
</template>

<style module lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  /* 优化：使用 var(--shadow-pixel) 统一阴影大小 */
  box-shadow: var(--shadow-pixel);
}

.badge--default {
  color: var(--color-text);
  background: var(--color-surface);
  border-color: var(--color-border);
}

.badge--primary {
  color: var(--color-white);
  background: var(--color-primary);
  border-color: var(--color-primary-dark);
}

.badge--accent {
  color: var(--color-white);
  background: var(--color-accent);
  border-color: var(--color-accent-dark);
}

.badge--muted {
  color: var(--color-text-muted);
  background: var(--color-surface);
  border-color: var(--color-border);
}
</style>
