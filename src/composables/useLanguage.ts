/**
 * 语言切换组合式函数 (规范 §6.1 + §6.4)
 */

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export interface LanguageConfig {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
}

const supportedLanguages: LanguageConfig[] = [
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: 'CN', rtl: false },
  { code: 'en', name: 'English', nativeName: 'English', flag: 'GB', rtl: false },
]

export function useLanguage() {
  const { locale } = useI18n()

  const currentLanguage = computed(() =>
    supportedLanguages.find(l => l.code === locale.value) || supportedLanguages[0],
  )

  function setLanguage(code: string): void {
    const lang = supportedLanguages.find(l => l.code === code)
    if (!lang) return
    locale.value = code
    document.documentElement.lang = code
    document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('emcoder-locale', code)
    } catch {
      // 忽略
    }
  }

  return {
    supportedLanguages,
    currentLanguage,
    setLanguage,
  }
}
