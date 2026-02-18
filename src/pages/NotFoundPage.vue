<script setup lang="ts">
/**
 * 404 页 (规范 §3.1 + §3.3)
 */
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <PageLayout>
    <div :class="$style.notFound">
      <h1 :class="$style.code">{{ t('notFound.title') }}</h1>
      <p :class="$style.message">{{ t('notFound.message') }}</p>
      <router-link to="/">
        <BaseButton variant="primary">{{ t('notFound.back') }}</BaseButton>
      </router-link>
    </div>
  </PageLayout>
</template>

<style module lang="scss">
.notFound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  min-height: 60vh;
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-md);

  a {
    text-decoration: none;
  }
}

.code {
  font-size: 6rem;
  font-family: var(--font-mono);
  font-weight: var(--font-weight-bold);
  color: var(--color-border);
  line-height: 1;
}

.message {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}
</style>
