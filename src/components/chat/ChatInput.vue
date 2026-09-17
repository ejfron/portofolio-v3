<script setup lang="ts">
import { ref } from 'vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound';
const { playHoverSound } = usePlaySound()

const inputText = ref('')
const emit = defineEmits<{
  (e: 'send', text: string): void
}>()

const sendMessage = () => {
  if (!inputText.value.trim()) return
  emit('send', inputText.value.trim())
  inputText.value = ''
}
</script>

<template>
  <div class="chat-input-wrapper">
    <input 
      v-model="inputText" 
      type="text" 
      placeholder="Type a message..." 
      class="chat-input"
      @keyup.enter="sendMessage"
      @click=" () => { sendMessage(); playHoverSound() }"
    />
    <button class="chat-send-btn" @mouseenter="playHoverSound" @click="sendMessage" aria-label="Send message">
      <LucideIcon name="Send" :size="18" />
    </button>
  </div>
</template>

<style scoped>
.chat-input-wrapper {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}

.chat-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: var(--color-primary);
}

.chat-send-btn {
  padding: 0.5rem;
  background: var(--color-primary, #12B76A);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s, transform 0.2s;
}

.chat-send-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
</style>