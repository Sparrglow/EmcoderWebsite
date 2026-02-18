<script setup lang="ts">
/**
 * 代码示例组件 (规范 §10.3)
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/components/base/BaseIcon.vue'

const props = withDefaults(defineProps<{
  code: string
  language?: string
  filename?: string
  showCopy?: boolean
}>(), {
  language: 'bash',
  showCopy: true,
})

const { t } = useI18n()
const copied = ref(false)

async function handleCopy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // 降级处理
  }
}
</script>

<template>
  <div :class="$style.codeExample">
    <div :class="$style.header">
      <span v-if="filename" :class="$style.filename">{{ filename }}</span>
      <span v-else :class="$style.lang">{{ language }}</span>
      <button
        v-if="showCopy"
        :class="$style.copyBtn"
        :aria-label="copied ? t('actions.copied') : t('actions.copy')"
        @click="handleCopy"
      >
        <BaseIcon :name="copied ? 'check' : 'copy'" :size="14" />
        <span>{{ copied ? t('actions.copied') : t('actions.copy') }}</span>
      </button>
    </div>
    <pre :class="$style.pre"><code>{{ code }}</code></pre>
  </div>
</template>

<style module lang="scss">
.codeExample {
  border: 1px solid var(--color-border);
  box-shadow: 2px 2px 0 0 var(--color-border);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.filename,
.lang {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

.copyBtn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 4px 8px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text);
  }
}

.pre {
  margin: 0;
  padding: var(--spacing-md);
  background: var(--color-background);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  overflow-x: auto;
  border: none;
  box-shadow: none;

  code {
    background: transparent;
    padding: 0;
    border: none;
  }
}
</style>
