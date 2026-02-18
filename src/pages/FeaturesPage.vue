<script setup lang="ts">
/**
 * 功能特性页 (规范 §3.1: /features)
 */
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import FeatureCard from '@/components/content/FeatureCard.vue'

const { t } = useI18n()

const features = [
  { id: 'agent', icon: 'cpu', titleKey: 'features.agent.title', descriptionKey: 'features.agent.desc' },
  { id: 'codeGen', icon: 'code', titleKey: 'features.codeGen.title', descriptionKey: 'features.codeGen.desc' },
  { id: 'projectMgmt', icon: 'terminal', titleKey: 'features.projectMgmt.title', descriptionKey: 'features.projectMgmt.desc' },
  { id: 'flash', icon: 'upload', titleKey: 'features.flash.title', descriptionKey: 'features.flash.desc' },
  { id: 'debug', icon: 'bug', titleKey: 'features.debug.title', descriptionKey: 'features.debug.desc' },
  { id: 'serial', icon: 'terminal', titleKey: 'features.serial.title', descriptionKey: 'features.serial.desc' },
]
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('features.title')"
      :subtitle="t('features.subtitle')"
    />
    <section :class="$style.content">
      <div class="container">
        <div :class="$style.grid">
          <FeatureCard
            v-for="feature in features"
            :key="feature.id"
            :data="feature"
          />
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}
</style>
