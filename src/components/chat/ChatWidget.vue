<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { storeToRefs } from 'pinia'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import { useChatStore } from '@/stores/chatStore'

import { usePlaySound } from '@/composables/usePlaySound'



const isOpen = ref(false)
const chatStore = useChatStore()
const { messages, isLoading, error } = storeToRefs(chatStore)

const { playHoverSound } = usePlaySound()

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const scrollToBottom = () => {
  const body = document.querySelector('.chat-window__body')
  if (body) {
    body.scrollTop = body.scrollHeight
  }
}

watch(messages, async () => {
  await nextTick()
  scrollToBottom()
}, { deep: true })

watch(isLoading, async () => {
  await nextTick()
  scrollToBottom()
})

const handleSend = async (text: string) => {
  await chatStore.sendMessage(text)
}

// Retry handler
const handleRetry = () => {
  chatStore.retryLastMessage()
}
</script>

<template>
  <div class="chat-widget-wrapper">
    <div v-if="isOpen" class="chat-window">
      <div class="chat-window__header">
        <h4>Chat with EJ</h4>
        <button class="chat-window__close" @click="() => {toggleChat(); playHoverSound()}">
          <LucideIcon name="X" :size="16" />
        </button>
      </div>
      
      <div class="chat-window__body">
        <ChatMessage 
          v-for="(msg, index) in messages" 
          :key="index" 
          :message="msg" 
        />
        
        <!-- Typing indicator – only one, and only when the last message is from the user -->
        <div 
          v-if="isLoading && messages?.length > 0 && messages?.[messages.length - 1]?.role === 'user'" 
          class="chat-message chat-message--typing"
        >
          <div class="chat-message__bubble typing-indicator">
            <span>.</span><span>.</span><span>.</span>
          </div>
        </div>
      </div>

      <!-- Error banner with retry button -->
      <div v-if="error" class="chat-error">
        <span>{{ error }}</span>
        <button @click="handleRetry">Retry</button>
      </div>
      
      <ChatInput @send="handleSend" />
    </div>

    <button 
      class="chat-toggle-btn" 
      @mouseenter="playHoverSound" 
      @click="toggleChat"
    >
      <LucideIcon v-if="!isOpen" name="MessageSquare" :size="24" />
      <LucideIcon v-else name="X" :size="24" />
    </button>
  </div>
</template>

<style scoped>
.chat-widget-wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.chat-toggle-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: var(--color-primary, #12B76A);
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(var(--color-primary-rgb, 18, 183, 106), 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chat-toggle-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(var(--color-primary-rgb, 18, 183, 106), 0.5);
}

.chat-window {
  width: 340px;
  max-width: 90vw;
  height: 420px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fadeSlideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.chat-window__header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-bg);
}

.chat-window__header h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.chat-window__close {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background 0.2s;
}

.chat-window__close:hover {
  background: var(--color-border);
}

.chat-window__body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Error banner */
.chat-error {
  padding: 0.5rem 1rem;
  background: #fee2e2;
  color: #b91c1c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  border-top: 1px solid #fecaca;
  flex-shrink: 0;
}
.chat-error button {
  background: transparent;
  border: none;
  color: var(--color-primary, #12B76A);
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  transition: background 0.2s;
}
.chat-error button:hover {
  background: rgba(18, 183, 106, 0.1);
}
/* --- Typing indicator with 30% width, centered, single row --- */
.chat-message--typing .chat-message__bubble {
  width: 30%;
  background: var(--color-bg);
  color: var(--color-text);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 24px;
  font-size: 0.75rem;
}

/* Dots are inline‑block → they stay on one row */
.typing-indicator span {
  display: inline-block;
  animation: typing 1.4s infinite both;
  width: 4px;
  height: 4px;
  margin: 0 1px;
  background: var(--color-text);
  border-radius: 50%;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0% { opacity: 0.2; transform: translateY(0px); }
  20% { opacity: 1; transform: translateY(-3px); }
  40% { opacity: 0.2; transform: translateY(0px); }
  100% { opacity: 0.2; transform: translateY(0px); }
}

@media (max-width: 600px) {
  .chat-widget-wrapper {
    bottom: 1rem;
    right: 1rem;
  }
  .chat-toggle-btn {
    width: 48px;
    height: 48px;
  }
  .chat-window {
    height: 350px;
    width: 85vw;
  }
}
</style>