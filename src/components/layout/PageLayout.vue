<script setup lang="ts">
/**
 * 页面包裹布局组件 (规范 §3.2 + §4.1)
 * 统一的页面框架：Header + Content + Footer
 */
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>

<template>
  <div :class="$style.layout">
    <a href="#main-content" class="skip-link">
      {{ $t('a11y.skipToContent') }}
    </a>
    <SiteHeader />
    <main id="main-content" :class="$style.main" role="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style module lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}
</style>
