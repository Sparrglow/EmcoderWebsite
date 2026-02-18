import { createI18n } from 'vue-i18n'

// 中文翻译
import zhCommon from '@/locales/zh/common.json'
import zhNavigation from '@/locales/zh/navigation.json'
import zhFeatures from '@/locales/zh/features.json'
import zhSkills from '@/locales/zh/skills.json'
import zhPages from '@/locales/zh/pages.json'

// 英文翻译
import enCommon from '@/locales/en/common.json'
import enNavigation from '@/locales/en/navigation.json'
import enFeatures from '@/locales/en/features.json'
import enSkills from '@/locales/en/skills.json'
import enPages from '@/locales/en/pages.json'

/** 深度合并多个翻译文件为单一消息对象 */
function mergeMessages(...sources: Record<string, unknown>[]): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof result[key] === 'object' &&
        result[key] !== null
      ) {
        result[key] = mergeMessages(
          result[key] as Record<string, unknown>,
          value as Record<string, unknown>,
        )
      } else {
        result[key] = value
      }
    }
  }
  return result
}

const zhMessages = mergeMessages(zhCommon, zhNavigation, zhFeatures, zhSkills, zhPages)
const enMessages = mergeMessages(enCommon, enNavigation, enFeatures, enSkills, enPages)

/** 读取持久化的语言偏好，默认中文 */
function getPersistedLocale(): string {
  try {
    return localStorage.getItem('emcoder-locale') || 'zh'
  } catch {
    return 'zh'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const i18n = createI18n<false>({
  legacy: false,
  locale: getPersistedLocale(),
  fallbackLocale: 'zh',
  messages: {
    zh: zhMessages,
    en: enMessages,
  } as any,
})

export default i18n
