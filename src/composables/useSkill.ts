/**
 * 技能数据组合式函数 (规范 §3.2 + §5.1)
 * 静态内容加载 + 响应式绑定
 */

import { ref, onMounted } from 'vue'
import {
  getSkillsIndex,
  getSkillDetail as loadSkillDetail,
  type SkillIndexEntry,
  type SkillDetail,
} from '@/lib/content-loader'

export function useSkillsList() {
  const skills = ref<SkillIndexEntry[]>([])

  onMounted(() => {
    skills.value = getSkillsIndex().sort((a, b) => a.order - b.order)
  })

  return { skills }
}

export function useSkillDetail(id: string) {
  const skill = ref<SkillDetail | null>(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    isLoading.value = true
    error.value = null
    try {
      skill.value = await loadSkillDetail(id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      isLoading.value = false
    }
  })

  return { skill, isLoading, error }
}
