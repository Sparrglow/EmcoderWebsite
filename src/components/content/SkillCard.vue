<script setup lang="ts">
/**
 * 技能平台卡片 (规范 §4.2)
 */
import { useI18n } from 'vue-i18n'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'

defineProps<{
  id: string
  status: string
  featured: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <router-link :to="`/skills/${id}`" :class="$style.link">
    <BaseCard hoverable>
      <div :class="$style.skill">
        <div :class="$style.top">
          <h3 :class="$style.title">{{ t(`skills.${id}.title`) }}</h3>
          <BaseBadge v-if="featured" variant="accent">Featured</BaseBadge>
          <BaseBadge :variant="status === 'stable' ? 'primary' : 'muted'">
            {{ status }}
          </BaseBadge>
        </div>
        <p :class="$style.desc">{{ t(`skills.${id}.desc`) }}</p>
        <div :class="$style.footer">
          <span :class="$style.more">
            {{ t('actions.learnMore') }}
            <BaseIcon name="chevron-right" :size="14" />
          </span>
        </div>
      </div>
    </BaseCard>
  </router-link>
</template>

<style module lang="scss">
.link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.skill {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.top {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  font-family: var(--font-mono);
}

.desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.footer {
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--color-border);
}

.more {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--text-sm);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}
</style>
