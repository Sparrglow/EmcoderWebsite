<script setup lang="ts">
/**
 * Chat 页面 (规范 §5.2 Chat API + §7.6 Chat 输入框样式)
 * 唯一的运行时动态入口 (规范 §5.1)
 */
import { ref, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useChat } from '@/composables/useChat'
import PageLayout from '@/components/layout/PageLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import ThinkingIndicator from '@/components/chat/ThinkingIndicator.vue'

const { t } = useI18n()
const { messages, isStreaming, error, sendMessage, stopStreaming } = useChat()

const inputText = ref('')
const chatContainer = ref<HTMLElement | null>(null)

async function handleSend(): Promise<void> {
  const text = inputText.value.trim()
  if (!text || isStreaming.value) return
  inputText.value = ''
  await sendMessage(text)
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}

// 自动滚动到底部
watch(
  () => messages.value.length > 0 ? messages.value[messages.value.length - 1].content : '',
  async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  },
)
</script>

<template>
  <PageLayout>
    <div :class="$style.chatPage">
      <!-- 消息区域 -->
      <div ref="chatContainer" :class="$style.messages">
        <!-- 欢迎消息 -->
        <div v-if="messages.length === 0" :class="$style.welcome">
          <div :class="$style.welcomeIcon">
            <BaseIcon name="message-square" :size="32" />
          </div>
          <p :class="$style.welcomeText">{{ t('chat.welcome') }}</p>
        </div>

        <!-- 消息列表 -->
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            $style.message,
            $style[`message--${msg.role}`],
          ]"
        >
          <div :class="$style.messageBubble">
            <div :class="$style.messageRole">
              {{ msg.role === 'user' ? 'You' : 'EmcoderCLI' }}
            </div>
            <div :class="$style.messageContent">
              {{ msg.content }}
            </div>
          </div>
        </div>

        <!-- 流式加载指示器 -->
        <div v-if="isStreaming" :class="$style.thinking" role="status" aria-live="polite">
          <ThinkingIndicator />
        </div>

        <!-- 错误消息 -->
        <div v-if="error" :class="$style.error" role="alert">
          {{ error }}
        </div>
      </div>

      <!-- 免责声明 (规范 §1.1 无阻碍) -->
      <p :class="$style.disclaimer">{{ t('chat.disclaimer') }}</p>

      <!-- 输入区域 (规范 §7.6 Chat 输入框) -->
      <div :class="$style.inputArea">
        <div :class="$style.inputWrap">
          <textarea
            v-model="inputText"
            :class="$style.input"
            :placeholder="t('chat.placeholder')"
            :disabled="isStreaming"
            rows="1"
            :aria-label="t('chat.placeholder')"
            @keydown="handleKeydown"
          />
          <BaseButton
            v-if="isStreaming"
            variant="ghost"
            size="sm"
            @click="stopStreaming"
          >
            <BaseIcon name="x" :size="16" />
            {{ t('actions.cancel') }}
          </BaseButton>
          <BaseButton
            v-else
            variant="primary"
            size="sm"
            :disabled="!inputText.trim()"
            @click="handleSend"
          >
            <BaseIcon name="send" :size="16" />
            {{ t('actions.send') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<style module lang="scss">
.chatPage {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px); /* 减去 header 高度 */
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg) 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  text-align: center;
}

.welcomeIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  color: var(--color-primary);
  border: 2px solid var(--color-border);
  box-shadow: 2px 2px 0 0 var(--color-border);
}

.welcomeText {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  max-width: 480px;
  line-height: var(--leading-relaxed);
}

.message {
  display: flex;
}

.message--user {
  justify-content: flex-end;
}

.message--assistant,
.message--system {
  justify-content: flex-start;
}

/* 规范 §7.2: Chat 气泡像素风格 (Hi-Fi) */
.messageBubble {
  max-width: 85%;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  box-shadow: 1px 1px 0 0 var(--color-border); /* Hard shadow */
  font-size: var(--text-sm);
  position: relative;
  
  /* Animation for new messages */
  animation: popIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  .message--user & {
    background: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
    box-shadow: 1px 1px 0 0 rgba(0,0,0,0.2);
  }

  .message--assistant & {
    background: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);
  }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.messageRole {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  opacity: 0.7;

  .message--user & {
    text-align: right;
  }
}

.messageContent {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  white-space: pre-wrap;
  word-break: break-word;
}

.thinking {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.error {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-error);
  color: var(--color-error);
  font-size: var(--text-sm);
}

.disclaimer {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--spacing-xs) 0;
}

/* 规范 §7.6: Chat 输入框 */
.inputArea {
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--color-border);
}

.inputWrap {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
}

.input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0; /* 规范 §7.6: 严格直角 */
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05);
  resize: none;
  min-height: 40px;
  max-height: 120px;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
