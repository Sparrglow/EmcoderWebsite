<script setup lang="ts">
/**
 * FAQ 页 (规范 §3.1: /support/faq, §8.1 Radix Vue Headless 无障碍)
 */
import { useI18n } from 'vue-i18n'
import { getFaq } from '@/lib/content-loader'
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from 'radix-vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { t } = useI18n()
const categories = getFaq()
</script>

<template>
  <PageLayout>
    <PageHeader :title="t('faq.title')" />
    <section :class="$style.content">
      <div class="container container--narrow">
        <div v-for="category in categories" :key="category.id" :class="$style.category">
          <h2 :class="$style.categoryTitle">{{ t(category.titleKey) }}</h2>
          <AccordionRoot type="multiple" :class="$style.items">
            <AccordionItem
              v-for="(item, index) in category.items"
              :key="index"
              :value="item.questionKey"
              :class="$style.item"
            >
              <AccordionHeader :class="$style.questionHeader">
                <AccordionTrigger :class="$style.question">
                  <span>{{ t(item.questionKey) }}</span>
                  <BaseIcon
                    name="chevron-down"
                    :size="16"
                    :class="$style.chevron"
                  />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent :class="$style.answer">
                <p>{{ t(item.answerKey) }}</p>
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<style module lang="scss">
.content {
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
}

.category {
  margin-bottom: var(--spacing-2xl);
}

.categoryTitle {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.items {
  display: flex;
  flex-direction: column;
}

.item {
  border-bottom: 1px solid var(--color-border);
}

.questionHeader {
  margin: 0;
}

.question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-md) 0;
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.chevron {
  transition: transform var(--transition-fast);
}

/* Radix Vue 在展开项的 trigger 上添加 data-state="open" */
.question[data-state='open'] .chevron {
  transform: rotate(180deg);
}

.answer {
  overflow: hidden;
  padding: 0 0 var(--spacing-md);

  p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: var(--leading-relaxed);
  }
}
</style>
