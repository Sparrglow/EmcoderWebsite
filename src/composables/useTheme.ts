/**
 * 主题管理组合式函数 (规范 §7.3 暗色模式)
 */

import { ref, watch, onMounted } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'emcoder-theme'

const themeMode = ref<ThemeMode>('system')
const resolvedTheme = ref<'light' | 'dark'>('light')

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.setAttribute('data-theme', theme)
  resolvedTheme.value = theme
}

function resolveAndApply(): void {
  const resolved = themeMode.value === 'system' ? getSystemPreference() : themeMode.value
  applyTheme(resolved)
}

export function useTheme() {
  onMounted(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        themeMode.value = stored
      }
    } catch {
      // localStorage 不可用时忽略
    }

    resolveAndApply()

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (themeMode.value === 'system') {
        resolveAndApply()
      }
    })
  })

  watch(themeMode, (mode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // 忽略
    }
    resolveAndApply()
  })

  function setTheme(mode: ThemeMode): void {
    themeMode.value = mode
  }

  function toggleTheme(): void {
    const current = resolvedTheme.value
    themeMode.value = current === 'light' ? 'dark' : 'light'
  }

  return {
    themeMode,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }
}
