<script setup lang="ts">
/**
 * AI Agent 功能详情页 (规范 §3.1: /features/agent)
 */
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { t } = useI18n()

const breadcrumbs = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.features', path: '/features' },
  { label: 'features.agent.title' },
]

const capabilities = [
  { icon: 'message-square', titleKey: 'features.agent.capabilities.chat.title', descKey: 'features.agent.capabilities.chat.desc' },
  { icon: 'code', titleKey: 'features.agent.capabilities.codegen.title', descKey: 'features.agent.capabilities.codegen.desc' },
  { icon: 'terminal', titleKey: 'features.agent.capabilities.cli.title', descKey: 'features.agent.capabilities.cli.desc' },
  { icon: 'cpu', titleKey: 'features.agent.capabilities.hardware.title', descKey: 'features.agent.capabilities.hardware.desc' },
]
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('features.agent.title')"
      :subtitle="t('features.agent.desc')"
      :breadcrumb="breadcrumbs"
    />
    <section :class="$style.content">
      <div class="container">
        <div :class="$style.grid">
          <div
            v-for="cap in capabilities"
            :key="cap.titleKey"
            :class="$style.card"
          >
            <div :class="$style.cardIcon">
              <BaseIcon :name="cap.icon" :size="24" />
            </div>
            <h3 :class="$style.cardTitle">{{ t(cap.titleKey) }}</h3>
            <p :class="$style.cardDesc">{{ t(cap.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<style module lang="scss">
.content {
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.card {
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  box-shadow: 2px 2px 0 0 var(--color-border);
  background: var(--color-surface);
}

.cardIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-primary);
}

.cardTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
}

.cardDesc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}
</style>
