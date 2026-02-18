<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const progress = ref(0);
let interval: number | null = null;
const statusText = ref('');
const steps = [
  'analyzing',
  'processing',
  'generating'
];

onMounted(() => {
  let stepIndex = 0;
  statusText.value = steps[0];
  
  // Simulate progress
  interval = window.setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 5;
      if (progress.value > 100) progress.value = 100; // Cap at 100, but keep running gently to simulate 'still working'
    } else {
        progress.value = 0; // Loop for visual effect if it takes too long
    }
    
    // Cycle text based on progress or time
    if (progress.value > 30 && stepIndex === 0) {
      stepIndex = 1;
      statusText.value = steps[1];
    } else if (progress.value > 70 && stepIndex === 1) {
      stepIndex = 2;
      statusText.value = steps[2];
    }
  }, 100);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div :class="$style.thinkingIndicator">
    <div :class="$style.header">
      <span :class="$style.icon">⚡</span>
      <span :class="$style.text">EMCODER_AI {{ (progress).toFixed(0) }}%</span>
    </div>
    
    <div :class="$style.track">
      <div 
        :class="$style.bar" 
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    
    <div :class="$style.status">
      <span :class="$style.statusText">> {{ statusText }}...</span>
      <span :class="$style.cursor">_</span>
    </div>
  </div>
</template>

<style module lang="scss">
.thinkingIndicator {
  display: flex;
  flex-direction: column;
  gap: 8px; /* var(--spacing-xs) */
  padding: 12px; /* var(--spacing-sm) */
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.05); /* Subtle shadow */
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  max-width: 300px;
  margin: 10px 0;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-muted);
  font-weight: bold;
  letter-spacing: 0.05em;
}

.track {
  height: 8px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: var(--color-primary);
  /* Striped effect */
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 16px 16px;
  animation: stripeMove 1s linear infinite;
  transition: width 0.1s linear;
}

@keyframes stripeMove {
  0% { background-position: 0 0; }
  100% { background-position: 16px 0; }
}

.status {
  display: flex;
  align-items: center;
  color: var(--color-text-muted);
}

.cursor {
  animation: blink 1s step-end infinite;
  margin-left: 4px;
  font-weight: bold;
  color: var(--color-primary);
}

@keyframes blink {
  50% { opacity: 0; }
}
</style>
