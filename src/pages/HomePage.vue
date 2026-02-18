<script setup lang="ts">
/**
 * 首页 (规范 §3.1: /)
 * 核心定位：3步内完成核心任务（规范 §1.1），展示产品价值与平台支持
 */
import { useI18n } from 'vue-i18n'
import { useSkillsList } from '@/composables/useSkill'
import PageLayout from '@/components/layout/PageLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import SkillCard from '@/components/content/SkillCard.vue'
import CodeExample from '@/components/content/CodeExample.vue'

const { t } = useI18n()
const { skills } = useSkillsList()

const highlights = [
  { id: 'smart', icon: 'cpu' },
  { id: 'safe', icon: 'shield-check' },
  { id: 'fast', icon: 'zap' },
  { id: 'open', icon: 'code' },
]
</script>

<template>
  <PageLayout>
    <!-- Hero Section -->
    <section :class="$style.hero">
      <div class="container">
        <div :class="$style.heroContent">
          <h1 :class="$style.heroTitle">{{ t('home.hero.title') }}</h1>
          <p :class="$style.heroSubtitle">{{ t('home.hero.subtitle') }}</p>
          <div :class="$style.heroActions">
            <router-link to="/chat">
              <BaseButton variant="primary" size="lg">
                <BaseIcon name="message-square" :size="18" />
                {{ t('home.hero.cta') }}
              </BaseButton>
            </router-link>
            <router-link to="/docs">
              <BaseButton variant="secondary" size="lg">
                <BaseIcon name="book-open" :size="18" />
                {{ t('home.hero.secondary') }}
              </BaseButton>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section :class="$style.section">
      <div class="container">
        <h2 :class="$style.sectionTitle">{{ t('home.highlights.title') }}</h2>
        <div :class="$style.highlightsGrid">
          <BaseCard v-for="item in highlights" :key="item.id">
            <div :class="$style.highlightItem">
              <div :class="$style.highlightIcon">
                <BaseIcon :name="item.icon" :size="24" />
              </div>
              <h3 :class="$style.highlightTitle">
                {{ t(`home.highlights.items.${item.id}.title`) }}
              </h3>
              <p :class="$style.highlightDesc">
                {{ t(`home.highlights.items.${item.id}.desc`) }}
              </p>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Platforms Section -->
    <section :class="[$style.section, $style.sectionAlt]">
      <div class="container">
        <h2 :class="$style.sectionTitle">{{ t('home.platforms.title') }}</h2>
        <p :class="$style.sectionDesc">{{ t('home.platforms.desc') }}</p>
        <div :class="$style.skillsGrid">
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

    <!-- CTA Section -->
    <section :class="$style.cta">
      <div class="container">
        <div :class="$style.ctaInner">
          <h2 :class="$style.ctaTitle">{{ t('home.cta.title') }}</h2>
          <p :class="$style.ctaDesc">{{ t('home.cta.desc') }}</p>
          <CodeExample
            :code="t('home.cta.install')"
            language="bash"
          />
          <div :class="$style.ctaActions">
            <router-link to="/docs">
              <BaseButton variant="primary">
                {{ t('home.cta.action') }}
              </BaseButton>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<style module lang="scss">
.hero {
  position: relative;
  border-bottom: 2px dashed var(--color-border);
  padding: 80px 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 20%, var(--color-primary-light) 0%, transparent 25%);
    opacity: 0.1;
    z-index: -1;
  }
}

.heroContent {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.heroTitle {
  font-size: var(--text-4xl);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  /* 修复：使用语义化 color-text 防止暗色模式看不清 */
  color: var(--color-text);
  
  /* 优化：文字阴影改为更细腻的 1px */
  text-shadow: 2px 2px 0 var(--color-background), 1px 1px 0 var(--color-text-muted);

  @media (min-width: 768px) {
    font-size: 4rem;
  }
}

.heroSubtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--spacing-xl);
}

.heroActions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;

  a {
    text-decoration: none;
  }
}

.section {
  padding: var(--spacing-3xl) 0;
}

.sectionAlt {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.sectionTitle {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.sectionDesc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.highlightsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-2xl);
}

.highlightItem {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.highlightIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  color: var(--color-white);
  background: var(--color-primary);
  border: 1px solid var(--color-primary-dark);
  box-shadow: 2px 2px 0 0 var(--color-primary-dark);
  margin-bottom: var(--spacing-sm);
}

.highlightTitle {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
}

.highlightDesc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.skillsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.cta {
  padding: var(--spacing-3xl) 0;
}

.ctaInner {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.ctaTitle {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
}

.ctaDesc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
}

.ctaActions {
  a {
    text-decoration: none;
  }
}
</style>
