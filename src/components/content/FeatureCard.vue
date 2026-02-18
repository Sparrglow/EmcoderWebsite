<script setup lang="ts">
/**
 * 功能特性卡片 (规范 §4.2 内容组件，i18n Key 驱动)
 */
import { useI18n } from 'vue-i18n'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'

interface FeatureData {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
}

defineProps<{
  data: FeatureData
}>()

const { t } = useI18n()
</script>

<template>
  <BaseCard hoverable>
    <div :class="$style.feature">
      <div :class="$style.iconWrap">
        <BaseIcon :name="data.icon" :size="24" />
      </div>
      <h3 :class="$style.title">{{ t(data.titleKey) }}</h3>
      <p :class="$style.desc">{{ t(data.descriptionKey) }}</p>
    </div>
  </BaseCard>
</template>

<style module lang="scss">
.feature {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.iconWrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: var(--color-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-primary);
  box-shadow: 2px 2px 0 0 var(--color-primary-light);
  margin-bottom: var(--spacing-sm);
  transition: all var(--transition-fast);

  /* Hover 效果：图标背景变色 */
  .feature:hover & {
    background: var(--color-primary);
    color: var(--color-white);
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 0 var(--color-primary-dark);
  }
}

.title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  /* 标题字体用 Mono 更有极客感 */
  font-family: var(--font-mono); 
  letter-spacing: -0.02em;
}

.desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}
</style>
