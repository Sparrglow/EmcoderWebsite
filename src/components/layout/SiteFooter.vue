<script setup lang="ts">
/**
 * 网站底部 (规范 §4.1 布局组件 + §8.2 ARIA)
 */
import { useI18n } from 'vue-i18n'
import { getNavigation } from '@/lib/content-loader'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { t } = useI18n()
const navigation = getNavigation()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer :class="$style.footer">
    <div :class="$style.inner">
      <!-- Footer 导航分组 -->
      <div :class="$style.groups">
        <div
          v-for="group in navigation.footer"
          :key="group.groupKey"
          :class="$style.group"
        >
          <h3 :class="$style.groupTitle">{{ t(group.groupKey) }}</h3>
          <ul :class="$style.groupList">
            <li v-for="link in group.links" :key="link.labelKey">
              <a
                v-if="(link as any).external"
                :href="link.path"
                :class="$style.footerLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ t(link.labelKey) }}
                <BaseIcon name="external-link" :size="12" />
              </a>
              <router-link
                v-else
                :to="link.path"
                :class="$style.footerLink"
              >
                {{ t(link.labelKey) }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权 -->
      <div :class="$style.bottom">
        <p :class="$style.copyright">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style module lang="scss">
.footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-background);
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
}

.inner {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.groupTitle {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.groupList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  list-style: none;
}

.footerLink {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-primary);
  }
}

.bottom {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.copyright {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
}
</style>
