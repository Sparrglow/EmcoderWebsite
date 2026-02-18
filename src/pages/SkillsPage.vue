<script setup lang="ts">
/**
 * 支持平台列表页 (规范 §3.1: /skills)
 */
import { useI18n } from 'vue-i18n'
import { useSkillsList } from '@/composables/useSkill'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SkillCard from '@/components/content/SkillCard.vue'

const { t } = useI18n()
const { skills } = useSkillsList()
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('skills.title')"
      :subtitle="t('skills.subtitle')"
    />
    <section :class="$style.content">
      <div class="container">
        <div :class="$style.grid">
          <SkillCard
            v-for="skill in skills"
            :key="skill.id"
            :id="skill.id"
            :status="skill.status"
            :featured="skill.featured"
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
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: var(--spacing-lg);
}
</style>
