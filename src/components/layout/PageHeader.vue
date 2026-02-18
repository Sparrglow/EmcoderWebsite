<script setup lang="ts">
/**
 * 通用页面头部区域 (规范 §3.2)
 */

interface BreadcrumbItem {
  label: string
  path?: string
}

defineProps<{
  title: string
  subtitle?: string
  breadcrumb?: BreadcrumbItem[]
}>()
</script>

<template>
  <section :class="$style.header" class="pixel-bg">
    <div class="container">
      <!-- 面包屑 -->
      <nav
        v-if="breadcrumb && breadcrumb.length"
        :class="$style.breadcrumb"
        aria-label="Breadcrumb"
      >
        <ol :class="$style.breadcrumbList">
          <li
            v-for="(item, index) in breadcrumb"
            :key="index"
            :class="$style.breadcrumbItem"
          >
            <router-link
              v-if="item.path"
              :to="item.path"
              :class="$style.breadcrumbLink"
            >
              {{ item.label }}
            </router-link>
            <span v-else :class="$style.breadcrumbCurrent" aria-current="page">
              {{ item.label }}
            </span>
            <span
              v-if="index < breadcrumb.length - 1"
              :class="$style.breadcrumbSep"
              aria-hidden="true"
            >/</span>
          </li>
        </ol>
      </nav>

      <h1 :class="$style.title">{{ title }}</h1>
      <p v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style module lang="scss">
.header {
  padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  border-bottom: 1px solid var(--color-border);
}

.breadcrumb {
  margin-bottom: var(--spacing-md);
}

.breadcrumbList {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  list-style: none;
}

.breadcrumbItem {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.breadcrumbLink {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
  }
}

.breadcrumbCurrent {
  font-size: var(--text-sm);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.breadcrumbSep {
  font-size: var(--text-sm);
  color: var(--color-border);
}

.title {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--spacing-sm);

  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  max-width: 640px;
}
</style>
