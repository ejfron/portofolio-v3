<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

interface Message {
  role: 'user' | 'model'
  content: string
}

const props = defineProps<{
  message: Message
}>()

// Initialize the markdown parser
const md = new MarkdownIt({
  html: false,   
  linkify: true, 
  breaks: true,  
})

const parsedContent = computed(() => {
  return md.render(props.message.content)
})
</script>

<template>
  <div class="chat-message" :class="`chat-message--${message.role}`">
    <div class="chat-message__bubble" v-html="parsedContent"></div>
  </div>
</template>

<style scoped>
.chat-message {
  display: flex;
  width: 100%;
}

.chat-message--user {
  justify-content: flex-end;
}

.chat-message--model {
  justify-content: flex-start;
}

.chat-message__bubble {
  max-width: 80%;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  font-size: 0.85rem;
  line-height: 1.5;
  word-break: break-word;
}

/* User Message Styles (Right) */
.chat-message--user .chat-message__bubble {
  background: var(--color-primary, #12B76A);
  color: #ffffff;
  border-bottom-right-radius: 2px;
}

/* Bot Message Styles (Left) */
.chat-message--model .chat-message__bubble {
  background: var(--color-border);
  color: var(--color-text);
  border-bottom-left-radius: 2px;
}

/* =========================================
   MARKDOWN RENDERING STYLES
   ========================================= */
.chat-message__bubble :deep(p) {
  margin: 0;
}

.chat-message__bubble :deep(strong) {
  font-weight: 700;
}

.chat-message__bubble :deep(em) {
  font-style: italic;
}

.chat-message__bubble :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.chat-message__bubble :deep(br) {
  display: block;
  margin: 0.2rem 0;
}


.chat-message__bubble :deep(ul) {
  margin: 0.3rem 0 0.5rem 0;
  padding-left: 1rem; 
  list-style-position: outside; 
}

.chat-message__bubble :deep(li) {
  margin-bottom: 0.2rem;
}

.chat-message__bubble :deep(li:last-child) {
  margin-bottom: 0; 
}
</style>