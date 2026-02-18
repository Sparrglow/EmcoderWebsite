<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import PageLayout from '@/components/layout/PageLayout.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
// @ts-ignore
import zhContent from '@/content/docs/tutorial.zh.md?raw';
// @ts-ignore
import enContent from '@/content/docs/tutorial.en.md?raw';

const route = useRoute();
const { t, locale } = useI18n();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(anchor, {
  slugify: (s: string) => s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5\-]+/g, '')
});

const content = computed(() => {
  const raw = locale.value === 'zh' ? zhContent : enContent;
  return md.render(raw || `# ${t('pages.tutorial.title')}\n\n${t('pages.tutorial.contentNotFound')}`);
});

// Handle hash navigation after content render
watch(() => route.hash, (hash) => {
  if (hash) {
    nextTick(() => {
      const element = document.querySelector(decodeURIComponent(hash));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}, { immediate: true });

</script>

<template>
  <PageLayout>
    <PageHeader 
      :title="t('pages.tutorial.title')" 
      :subtitle="t('pages.tutorial.subtitle')"
    />
    <div class="container">
      <div :class="$style.markdownBody" v-html="content"></div>
    </div>
  </PageLayout>
</template>

<style module lang="scss">
.markdownBody {
  padding: var(--spacing-xl) 0;
  max-width: 800px;
  margin: 0 auto;
  color: var(--color-text);
  line-height: 1.6;

  /* Basic Markdown Styles */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.25;
    scroll-margin-top: 80px; /* Prevent header overlap */
  }

  h1 { font-size: 2em; border-bottom: 1px solid var(--color-border); padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid var(--color-border); padding-bottom: 0.3em; }
  h3 { font-size: 1.25em; }
  
  p { margin-bottom: 1em; }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
  
  ul, ol {
    margin-bottom: 1em;
    padding-left: 2em;
  }
  
  code {
    background: var(--color-surface);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 0.9em;
  }
  
  pre {
    background: var(--color-surface);
    padding: 1rem;
    overflow-x: auto;
    border: 1px solid var(--color-border);
    margin-bottom: 1em;
    
    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid var(--color-primary);
    padding-left: 1em;
    color: var(--color-text-muted);
    margin: 1em 0;
  }
  
  img {
    max-width: 100%;
    border: 1px solid var(--color-border);
  }
}
</style>
