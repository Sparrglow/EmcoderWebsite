<script setup lang="ts">
/**
 * 页面加载骨架屏 (规范 §3.2)
 */
</script>

<template>
  <div :class="$style.skeleton" role="status" :aria-label="$t('status.loading')">
    <div :class="$style.block" style="width: 60%; height: 32px;" />
    <div :class="$style.block" style="width: 80%; height: 16px;" />
    <div :class="$style.block" style="width: 40%; height: 16px;" />
    <div :class="$style.grid">
      <div v-for="i in 3" :key="i" :class="$style.card" />
    </div>
  </div>
</template>

<style module lang="scss">
.skeleton {
  padding: var(--spacing-3xl) var(--spacing-md);
  max-width: var(--max-width-content);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.block {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  animation: pulse 1.5s ease-in-out infinite;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.card {
  height: 200px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
