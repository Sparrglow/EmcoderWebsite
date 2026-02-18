<script setup lang="ts">
/**
 * 文档中心页 (规范 §3.1: /docs)
 */
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { t } = useI18n()

const docSections = [
  {
    id: 'getting-started',
    icon: 'zap',
    titleKey: 'docs.gettingStarted.title',
    descKey: 'docs.gettingStarted.desc',
    path: '/docs/getting-started',
  },
  {
    id: 'tutorial',
    icon: 'book-open',
    titleKey: 'docs.tutorial.title',
    descKey: 'docs.tutorial.desc',
    path: '/docs/tutorial',
  },
  {
    id: 'api',
    icon: 'code',
    titleKey: 'docs.api.title',
    descKey: 'docs.api.desc',
    path: '/docs/api',
  },
]
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('docs.title')"
      :subtitle="t('docs.subtitle')"
    />
    <section :class="$style.content">
      <div class="container">
        <div :class="$style.grid">
          <router-link
            v-for="section in docSections"
            :key="section.id"
            :to="section.path"
            :class="$style.link"
          >
            <BaseCard hoverable>
              <div :class="$style.item">
                <div :class="$style.icon">
                  <BaseIcon :name="section.icon" :size="24" />
                </div>
                <h3 :class="$style.title">{{ t(section.titleKey) }}</h3>
                <p :class="$style.desc">{{ t(section.descKey) }}</p>
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.link {
  text-decoration: none;
  color: inherit;
}

.item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  box-shadow: 1px 1px 0 0 var(--color-border);
}

.title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
}

.desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}
</style>
