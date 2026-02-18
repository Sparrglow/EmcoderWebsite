<script setup lang="ts">
/**
 * 服务支持页 (规范 §3.1: /support)
 */
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { t } = useI18n()
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('support.title')"
      :subtitle="t('support.subtitle')"
    />
    <section :class="$style.content">
      <div class="container">
        <div :class="$style.grid">
          <router-link to="/support/faq" :class="$style.link">
            <BaseCard hoverable>
              <div :class="$style.item">
                <BaseIcon name="book-open" :size="24" />
                <h3>{{ t('faq.title') }}</h3>
              </div>
            </BaseCard>
          </router-link>
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

.link {
  text-decoration: none;
  color: inherit;
}

.item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);

  h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
  }
}
</style>
