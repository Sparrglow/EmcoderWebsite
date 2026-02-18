<script setup lang="ts">
/**
 * 下载中心页 (规范 §3.1: /download)
 */
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import CodeExample from '@/components/content/CodeExample.vue'

const { t } = useI18n()
</script>

<template>
  <PageLayout>
    <PageHeader
      :title="t('download.title')"
      :subtitle="t('download.subtitle')"
    />
    <section :class="$style.content">
      <div class="container container--narrow">
        <div :class="$style.methods">
          <!-- pip 安装 -->
          <BaseCard>
            <div :class="$style.method">
              <div :class="$style.methodHeader">
                <BaseIcon name="download" :size="20" />
                <h3>{{ t('download.pip.title') }}</h3>
              </div>
              <CodeExample :code="t('download.pip.command')" language="bash" />
            </div>
          </BaseCard>

          <!-- 源码安装 -->
          <BaseCard>
            <div :class="$style.method">
              <div :class="$style.methodHeader">
                <BaseIcon name="code" :size="20" />
                <h3>{{ t('download.source.title') }}</h3>
              </div>
              <CodeExample :code="t('download.source.command')" language="bash" />
            </div>
          </BaseCard>

          <!-- 系统要求 -->
          <BaseCard>
            <div :class="$style.method">
              <div :class="$style.methodHeader">
                <BaseIcon name="cpu" :size="20" />
                <h3>{{ t('download.requirements.title') }}</h3>
              </div>
              <ul :class="$style.reqList">
                <li>{{ t('download.requirements.python') }}</li>
                <li>{{ t('download.requirements.os') }}</li>
              </ul>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<style module lang="scss">
.content {
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
}

.methods {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.method {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.methodHeader {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
  }
}

.reqList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-left: var(--spacing-lg);
  list-style: disc;

  li {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }
}
</style>
