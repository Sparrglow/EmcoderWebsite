/**
 * 路由配置 (规范 §3.1 + §3.3)
 * 路由懒加载实现路由级代码分割
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
    meta: { titleKey: 'nav.home' },
  },
  {
    path: '/chat',
    component: () => import('@/pages/ChatPage.vue'),
    meta: { titleKey: 'nav.chat' },
  },
  {
    path: '/features',
    component: () => import('@/pages/FeaturesPage.vue'),
    meta: { titleKey: 'nav.features' },
  },
  {
    path: '/features/agent',
    component: () => import('@/pages/FeatureAgentPage.vue'),
    meta: { titleKey: 'features.agent.title' },
  },
  {
    path: '/features/skills',
    component: () => import('@/pages/FeatureSkillsPage.vue'),
    meta: { titleKey: 'features.skills.title' },
  },
  {
    path: '/skills',
    component: () => import('@/pages/SkillsPage.vue'),
    meta: { titleKey: 'nav.skills' },
  },
  {
    path: '/skills/:id',
    component: () => import('@/pages/SkillDetailPage.vue'),
    meta: { preload: true },
  },
  {
    path: '/docs',
    component: () => import('@/pages/DocsPage.vue'),
    meta: { titleKey: 'nav.docs' },
  },
  {
    path: '/docs/tutorial',
    component: () => import('@/pages/docs/TutorialPage.vue'),
    meta: { titleKey: 'docs.tutorial' },
  },
  {
    path: '/download',
    component: () => import('@/pages/DownloadPage.vue'),
    meta: { titleKey: 'nav.download' },
  },
  {
    path: '/changelog',
    component: () => import('@/pages/ChangelogPage.vue'),
    meta: { titleKey: 'nav.changelog' },
  },
  {
    path: '/support',
    component: () => import('@/pages/SupportPage.vue'),
    meta: { titleKey: 'support.title' },
  },
  {
    path: '/support/faq',
    component: () => import('@/pages/FaqPage.vue'),
    meta: { titleKey: 'faq.title' },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { titleKey: 'status.notFound' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
