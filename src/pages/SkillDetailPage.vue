<script setup lang="ts">
/**
 * 技能详情页 (规范 §3.1: /skills/:id + §3.2 页面组件结构)
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSkillDetail } from '@/composables/useSkill'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSkeleton from '@/components/layout/PageSkeleton.vue'
import FeatureCard from '@/components/content/FeatureCard.vue'

const route = useRoute()
const { t } = useI18n()
const { skill, isLoading } = useSkillDetail(route.params.id as string)

const breadcrumbs = computed(() => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.skills'), path: '/skills' },
  { label: skill.value ? t(skill.value.meta.titleKey) : '...' },
])
</script>

<template>
  <PageLayout>
    <!-- 规范 §3.2: 加载骨架屏 -->
    <PageSkeleton v-if="isLoading" />

    <!-- 规范 §3.2: 404 处理 -->
    <template v-else-if="!skill">
      <PageHeader
        :title="t('status.notFound')"
        :subtitle="t('notFound.message')"
      />
    </template>

    <template v-else>
      <!-- Hero -->
      <PageHeader
        :title="t(skill.hero.titleKey)"
        :subtitle="t(skill.hero.subtitleKey)"
        :breadcrumb="breadcrumbs"
      />

      <!-- Features -->
      <section :class="$style.features">
        <div class="container">
          <div :class="$style.grid">
            <FeatureCard
              v-for="feature in skill.features"
              :key="feature.id"
              :data="feature"
            />
          </div>
        </div>
      </section>
    </template>
  </PageLayout>
</template>

<style module lang="scss">
.features {
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}
</style>
