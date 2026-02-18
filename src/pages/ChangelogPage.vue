<script setup lang="ts">
/**
 * 更新日志页 (规范 §3.1: /changelog)
 */
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'

const { t } = useI18n()
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('changelog.title')"
      :subtitle="t('changelog.subtitle')"
    />
    <section :class="$style.content">
      <div class="container container--narrow">
        <p :class="$style.empty">{{ t('status.empty') }}</p>
      </div>
    </section>
  </PageLayout>
</template>

<style module lang="scss">
.content {
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
}

.empty {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--spacing-3xl) 0;
}
</style>
