// stores/chatStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Message } from '@/types/chat'
import { developerInfo } from '@/data/developerInfo'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([
    { role: 'model', content: 'Hello! I\'m your Edgar assistant. You can ask me anything. How can I help you today?' }
  ])
  const isLoading = ref(false)
  const error = ref<string | null>(null)   
  let lastUserPrompt = ''                 

  const sendMessage = async (prompt: string) => {

    error.value = null

    messages.value.push({ role: 'user', content: prompt })
    lastUserPrompt = prompt
    isLoading.value = true

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: developerInfo }]
          },
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Gemini API Error Details:", errorData)
        throw new Error(`Gemini API Error: ${response.status}`)
      }

      const data = await response.json()
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I received an empty response.'
      
      messages.value.push({ role: 'model', content: botReply })

    } catch (err) {
      console.error("Gemini Error Details:", err)
     
      error.value = 'Connection failed. Please try again.'
    } finally {
      isLoading.value = false
    }
  }


  const retryLastMessage = () => {
    if (!lastUserPrompt) return
    const lastMsg = messages.value[messages.value.length - 1]
    if (lastMsg?.role === 'user' && lastMsg.content === lastUserPrompt) {
      messages.value.pop()
    }
    sendMessage(lastUserPrompt)
  }

  return { messages, isLoading, error, sendMessage, retryLastMessage }
})