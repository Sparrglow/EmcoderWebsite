/**
 * 内容加载器 - 构建时加载 JSON 内容配置 (规范 §2.3)
 * 所有内容通过静态 import 加载，不依赖运行时 API
 */

import metaData from '@/content/meta.json'
import navigationData from '@/content/navigation.json'
import skillsIndex from '@/content/skills/index.json'
import faqData from '@/content/faq.json'

// 技能详情按需导入
const skillModules: Record<string, () => Promise<unknown>> = {
  stm32: () => import('@/content/skills/stm32.json'),
  esp32: () => import('@/content/skills/esp32.json'),
}

export interface SiteMeta {
  site: {
    name: string
    version: string
    tagline: Record<string, string>
    description: Record<string, string>
  }
  brand: {
    logo: string
    logoDark: string
    favicon: string
    primaryColor: string
    accentColor: string
  }
  links: {
    github: string
    documentation: string
    discord: string
  }
}

export interface NavItem {
  id: string
  labelKey: string
  path: string
  icon: string
  highlight?: boolean
  external?: boolean
}

export interface FooterGroup {
  groupKey: string
  links: Array<{
    labelKey: string
    path: string
    external?: boolean
  }>
}

export interface NavigationConfig {
  main: NavItem[]
  footer: FooterGroup[]
}

export interface SkillIndexEntry {
  id: string
  status: string
  featured: boolean
  order: number
}

export interface SkillFeature {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
}

export interface SkillDetail {
  id: string
  meta: {
    titleKey: string
    descriptionKey: string
  }
  hero: {
    titleKey: string
    subtitleKey: string
    image: string
  }
  features: SkillFeature[]
}

export interface FaqItem {
  questionKey: string
  answerKey: string
}

export interface FaqCategory {
  id: string
  titleKey: string
  items: FaqItem[]
}

export function getMeta(): SiteMeta {
  return metaData as SiteMeta
}

export function getNavigation(): NavigationConfig {
  return navigationData as NavigationConfig
}

export function getSkillsIndex(): SkillIndexEntry[] {
  return (skillsIndex as { skills: SkillIndexEntry[] }).skills
}

export async function getSkillDetail(id: string): Promise<SkillDetail | null> {
  const loader = skillModules[id]
  if (!loader) return null
  try {
    const mod = await loader() as { default: SkillDetail }
    return mod.default
  } catch {
    return null
  }
}

export function getFaq(): FaqCategory[] {
  return (faqData as { categories: FaqCategory[] }).categories
}
