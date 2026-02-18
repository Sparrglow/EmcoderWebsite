<script setup lang="ts">
/**
 * 网站顶部导航栏 (规范 §4.1 布局组件 + §8.1 Radix Vue + FocusTrap + 键盘 + §8.2 ARIA)
 */
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
} from 'radix-vue'
import { getNavigation } from '@/lib/content-loader'
import { useTheme } from '@/composables/useTheme'
import { useLanguage } from '@/composables/useLanguage'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { t } = useI18n()
const router = useRouter()
const navigation = getNavigation()
const { resolvedTheme, toggleTheme } = useTheme()
const { currentLanguage, setLanguage } = useLanguage()
const mobileMenuOpen = ref(false)

function handleNavClick(path: string): void {
  mobileMenuOpen.value = false
  router.push(path)
}

// 路由切换时关闭移动菜单
watch(() => router.currentRoute.value.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <header :class="$style.header">
    <div :class="$style.inner">
      <!-- Logo -->
      <router-link to="/" :class="$style.logo" aria-label="EmcoderCLI Home">
        <BaseIcon name="terminal" :size="24" :class="$style.logoIcon" />
        <span :class="$style.logoText">EmcoderCLI</span>
      </router-link>

      <!-- 主导航 (规范 §8.2) -->
      <nav :class="$style.nav" :aria-label="t('a11y.mainNav')">
        <ul :class="$style.navList" role="menubar">
          <li
            v-for="item in navigation.main"
            :key="item.id"
            role="none"
            :class="$style.navItem"
          >
            <router-link
              :to="item.path"
              role="menuitem"
              :class="[
                $style.navLink,
                { [$style['navLink--highlight']]: item.highlight },
              ]"
            >
              <BaseIcon :name="item.icon" :size="16" />
              <span>{{ t(item.labelKey) }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- 工具栏 -->
      <div :class="$style.toolbar">
        <!-- 语言切换 -->
        <button
          :class="$style.toolBtn"
          :aria-label="`Switch language (${currentLanguage.nativeName})`"
          @click="setLanguage(currentLanguage.code === 'zh' ? 'en' : 'zh')"
        >
          <BaseIcon name="globe" :size="18" />
          <span :class="$style.toolLabel">{{ currentLanguage.nativeName }}</span>
        </button>

        <!-- 主题切换 -->
        <button
          :class="$style.toolBtn"
          :aria-label="resolvedTheme === 'light' ? t('theme.dark') : t('theme.light')"
          @click="toggleTheme()"
        >
          <BaseIcon :name="resolvedTheme === 'light' ? 'moon' : 'sun'" :size="18" />
        </button>

        <!-- 移动端菜单 (Radix Vue Dialog, 规范 §8.1 焦点陷阱) -->
        <DialogRoot v-model:open="mobileMenuOpen">
          <button
            :class="[$style.toolBtn, $style.menuToggle]"
            :aria-label="mobileMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <BaseIcon :name="mobileMenuOpen ? 'x' : 'menu'" :size="20" />
          </button>
          <DialogPortal>
            <DialogOverlay :class="$style.overlay" />
            <DialogContent :class="$style.mobileNav" :aria-label="t('a11y.mainNav')">
              <DialogTitle class="sr-only">{{ t('a11y.mainNav') }}</DialogTitle>
              <div :class="$style.mobileNavHeader">
                <DialogClose :class="$style.toolBtn" :aria-label="t('a11y.closeMenu')">
                  <BaseIcon name="x" :size="20" />
                </DialogClose>
              </div>
              <nav :aria-label="t('a11y.mainNav')">
                <ul :class="$style.mobileNavList">
                  <li v-for="item in navigation.main" :key="item.id">
                    <button
                      :class="$style.mobileNavLink"
                      @click="handleNavClick(item.path)"
                    >
                      <BaseIcon :name="item.icon" :size="18" />
                      <span>{{ t(item.labelKey) }}</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </div>

  </header>
</template>

<style module lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  height: 56px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px; /* Slightly increased gap for icon */
  text-decoration: none;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  font-size: var(--text-lg);
}

.logoIcon {
  color: var(--color-primary);
}

/* Removed logoMark styles as they are no longer used */

.logoText {
  font-family: var(--font-mono);
  color: var(--color-text);
}

.nav {
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
}

.navList {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  list-style: none;
}

.navItem {
  list-style: none;
}

.navLink {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 6px 12px;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text);
  }

  &.router-link-active {
    color: var(--color-primary);
  }
}

.navLink--highlight {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-primary);
  box-shadow: 1px 1px 0 0 var(--color-primary-dark);

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 0 var(--color-primary-dark);
  }
}

.toolbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.toolBtn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 6px 8px;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.toolLabel {
  display: none;

  @media (min-width: 768px) {
    display: inline;
  }
}

.menuToggle {
  display: flex;

  @media (min-width: 768px) {
    display: none;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;

  @media (min-width: 768px) {
    display: none;
  }
}

.mobileNav {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  max-width: 80vw;
  background: var(--color-background);
  border-left: 1px solid var(--color-border);
  box-shadow: -4px 0 0 0 var(--color-border);
  z-index: 201;
  padding: var(--spacing-md);
  overflow-y: auto;

  @media (min-width: 768px) {
    display: none;
  }
}

.mobileNavHeader {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-md);
}

.mobileNavList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  list-style: none;
}

.mobileNavLink {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--text-base);
  color: var(--color-text);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--color-surface);
  }
}
</style>
