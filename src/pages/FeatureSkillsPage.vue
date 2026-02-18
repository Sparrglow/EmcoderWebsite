<script setup lang="ts">
/**
 * 技能系统详情页 (规范 §3.1: /features/skills)
 */
import { useI18n } from 'vue-i18n'
import { useSkillsList } from '@/composables/useSkill'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SkillCard from '@/components/content/SkillCard.vue'

const { t } = useI18n()
const { skills } = useSkillsList()

const breadcrumbs = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.features', path: '/features' },
  { label: 'features.skills.title' },
]
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('features.skills.title')"
      :subtitle="t('features.skills.desc')"
      :breadcrumb="breadcrumbs"
    />
    <section :class="$style.content">
      <div class="container">
        <p :class="$style.intro">{{ t('features.skills.intro') }}</p>
        <div :class="$style.grid">
          <SkillCard
            v-for="skill in skills"
            :key="skill.id"
            :id="skill.id"
            :status="skill.status"
            :featured="skill.featured"
          />
        </div>
        <p v-if="skills.length === 0" :class="$style.empty">
          {{ t('status.empty') }}
        </p>
      </div>
    </section>
  </PageLayout>
</template>

<style module lang="scss">
.content {
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
}

.intro {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
  max-width: 640px;
  line-height: var(--leading-relaxed);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--spacing-3xl) 0;
}
</style>
