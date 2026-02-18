<script setup lang="ts">
/**
 * 基础按钮组件 (规范 §4.1 + §7.9 按钮样式 + §8.1 键盘)
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="[
      $style.btn,
      $style[`btn--${variant}`],
      $style[`btn--${size}`],
      { [$style['btn--loading']]: loading },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    @keydown.enter.prevent="$emit('click', $event as unknown as MouseEvent)"
    @keydown.space.prevent="$emit('click', $event as unknown as MouseEvent)"
  >
    <span v-if="loading" :class="$style.spinner" role="status" aria-live="polite">
      <span class="sr-only">{{ $t('status.loading') }}</span>
    </span>
    <slot />
  </button>
</template>

<style module lang="scss">
/* 规范 §7.9: 像素描边风格按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-family: var(--font-sans);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

/* 规范 §7.9: 主按钮 - 像素描边 */
.btn--primary {
  color: var(--color-white);
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 2px 2px 0 0 var(--color-primary-dark);

  &:hover:not(:disabled) {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 0 var(--color-primary-dark);
  }

  &:active:not(:disabled) {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 0 var(--color-primary-dark);
  }
}

.btn--secondary {
  color: var(--color-text);
  background: var(--color-surface);
  border-color: var(--color-border);
  box-shadow: 2px 2px 0 0 var(--color-border);

  &:hover:not(:disabled) {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 0 var(--color-border);
  }

  &:active:not(:disabled) {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 0 var(--color-border);
  }
}

.btn--ghost {
  color: var(--color-text-muted);
  background: transparent;
  border-color: transparent;

  &:hover:not(:disabled) {
    color: var(--color-text);
    background: var(--color-surface);
  }
}

.btn--sm {
  padding: 6px 12px;
  font-size: var(--text-sm);
}

.btn--md {
  padding: 10px 20px;
  font-size: var(--text-sm);
}

.btn--lg {
  padding: 14px 28px;
  font-size: var(--text-base);
}

.btn--loading {
  position: relative;
  color: transparent;
}

.spinner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: spin 0.6s linear infinite;
  color: var(--color-white);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
