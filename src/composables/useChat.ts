/**
 * Chat 对话组合式函数 (规范 §5.2)
 * 使用 Vue 响应式系统处理流式响应，不依赖状态管理库
 */

import { ref, readonly } from 'vue'
import { chatApi, type ChatMessage } from '@/lib/chat-client'

export function useChat() {
  const messages = ref<ChatMessage[]>([])
  const isStreaming = ref(false)
  const error = ref<string | null>(null)
  let abortController: AbortController | null = null

  function addSystemMessage(content: string): void {
    messages.value.push({
      role: 'system',
      content,
      timestamp: Date.now(),
    })
  }

  async function sendMessage(content: string): Promise<void> {
    if (!content.trim() || isStreaming.value) return

    error.value = null

    // 添加用户消息
    const userMsg: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    }
    messages.value.push(userMsg)

    // 创建助手消息占位
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }
    messages.value.push(assistantMsg)

    isStreaming.value = true
    abortController = new AbortController()

    const assistantIndex = messages.value.length - 1

    await chatApi.sendMessage(
      messages.value.slice(0, -1), // 不发送空的助手消息占位
      {
        onChunk(text: string) {
          messages.value[assistantIndex].content += text
        },
        onDone() {
          isStreaming.value = false
          abortController = null
        },
        onError(err: Error) {
          isStreaming.value = false
          error.value = err.message
          abortController = null
        },
      },
      abortController.signal,
    )
  }

  function stopStreaming(): void {
    if (abortController) {
      abortController.abort()
      abortController = null
      isStreaming.value = false
    }
  }

  function clearMessages(): void {
    messages.value = []
    error.value = null
  }

  return {
    messages: readonly(messages),
    isStreaming: readonly(isStreaming),
    error: readonly(error),
    sendMessage,
    stopStreaming,
    clearMessages,
    addSystemMessage,
  }
}
