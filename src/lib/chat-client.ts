/**
 * Chat API 客户端 (规范 §5.2)
 * 唯一的运行时动态数据接口，支持流式响应
 */

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface ChatStreamCallbacks {
  onChunk: (text: string) => void
  onDone: () => void
  onError: (error: Error) => void
}

const CHAT_API_URL = '/api/v1/chat'

export const chatApi = {
  /**
   * 发送消息并获取流式响应
   */
  async sendMessage(
    messages: ChatMessage[],
    callbacks: ChatStreamCallbacks,
    signal?: AbortSignal,
  ): Promise<void> {
    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
        signal,
      })

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status} ${response.statusText}`)
      }

      const body = response.body
      if (!body) {
        throw new Error('Response body is null')
      }

      const reader = body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          callbacks.onDone()
          break
        }
        const text = decoder.decode(value, { stream: true })
        callbacks.onChunk(text)
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        callbacks.onDone()
        return
      }
      callbacks.onError(error instanceof Error ? error : new Error(String(error)))
    }
  },
}
