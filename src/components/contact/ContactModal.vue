<script setup lang="ts">
import { ref } from 'vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isSending = ref(false)
const sendError = ref('')
const sent = ref(false)
const form = ref({
  email: '',
  subject: '',
  message: ''
})

const close = () => {
  sendError.value = ''
  sent.value = false
  emit('update:modelValue', false)
}

// Posts straight to /api/contact, which sends the email server-side via
// Resend. No mail client, no redirect — the message just goes.
const handleSubmit = async () => {
  sendError.value = ''

  if (!form.value.email || !form.value.subject || !form.value.message) {
    sendError.value = 'Please fill in all fields.'
    return
  }

  isSending.value = true

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      sendError.value = data.error || 'Something went wrong. Please try again.'
      return
    }

    sent.value = true
    form.value.email = ''
    form.value.subject = ''
    form.value.message = ''

    // Let them see the confirmation for a beat before the modal closes.
    setTimeout(() => {
      close()
    }, 1400)
  } catch (error) {
    sendError.value = 'Could not reach the server. Check your connection and try again.'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <!-- Close Button -->
        <button class="modal-close" @mouseenter="playHoverSound" @click="close" aria-label="Close modal">
          <LucideIcon name="X" :size="24" :stroke-width="2" />
        </button>

        <!-- Header -->
        <div class="modal-header">
          <h2 class="modal-title">Contact Me</h2>
          <p class="modal-subtitle">Have a question or want to work together? Send me a message!</p>
        </div>

        <!-- Form Body -->
        <div class="modal-body">
          <form @submit.prevent="handleSubmit" class="contact-form">

            <!-- Email -->
            <div class="form-group">
              <label for="email" class="form-label">Your Email</label>
              <div class="input-wrapper">
                <LucideIcon name="Mail" :size="18" class="input-icon" />
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  required
                   @click.key.enter="playHoverSound"
                  class="form-input"
                />
              </div>
            </div>

            <!-- Subject -->
            <div class="form-group">
              <label for="subject" class="form-label">Subject</label>
              <div class="input-wrapper">
                <LucideIcon name="PenLine" :size="18" class="input-icon" />
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  placeholder="Project Inquiry / Collaboration"
                  required
                  class="form-input"
                   @click.key.enter="playHoverSound"
                />
              </div>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <div class="input-wrapper textarea-wrapper">
                <LucideIcon name="MessageSquare" :size="18" class="input-icon textarea-icon" />
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="Tell me about your idea or project..."
                  required
                  @click.key.enter="playHoverSound"

                  class="form-input form-textarea"
                ></textarea>
              </div>
            </div>

            <!-- Status -->
            <p v-if="sendError" class="form-status form-status--error">{{ sendError }}</p>
            <p v-else-if="sent" class="form-status form-status--ok">Message sent!</p>

            <!-- Action Buttons -->
            <div class="form-actions">
              <button type="button" class="btn-secondary" @mouseenter="playHoverSound" @click=" () => { playHoverSound(); close(); }">Cancel</button>
              <button type="submit" @mouseenter="playHoverSound" @click="playHoverSound"  class="btn-primary" :disabled="isSending">
                <span v-if="isSending">Sending...</span>
                <span v-else-if="sent">Sent</span>
                <span v-else>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Keep all your existing styling here exactly as you wrote it */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal-content {
  position: relative;
  background: var(--color-surface);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-close:hover {
  background: var(--color-border);
  color: var(--color-primary);
}
.modal-header {
  padding: 2rem 2rem 0 2rem;
}
.modal-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}
.modal-subtitle {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}
.modal-body {
  padding: 1.5rem 2rem 2rem 2rem;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.form-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 0.75rem;
  color: var(--color-text-muted);
}
.textarea-wrapper {
  align-items: flex-start;
}
.textarea-icon {
  margin-top: 0.6rem;
}
.form-input {
  width: 100%;
  padding: 0.6rem 0.75rem 0.6rem 2.5rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 0.85rem;
  font-family: inherit;
  transition: border-color 0.2s;
  outline: none;
}
.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb, 18, 183, 106), 0.1);
}
.form-textarea {
  resize: none;
  padding-top: 0.6rem;
}
.form-status {
  margin: -0.5rem 0 0;
  font-size: 0.8rem;
  font-weight: 500;
}
.form-status--error {
  color: #c0553a;
}
.form-status--ok {
  color: var(--live, #b8801f);
}
.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  justify-content: flex-end;
}
.btn-primary, .btn-secondary {
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  font-family: inherit;
}
.btn-primary {
  background: var(--color-primary, #12B76A);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(var(--color-primary-rgb, 18, 183, 106), 0.25);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  opacity: 0.9;
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-secondary {
  background: transparent;
  color: var(--color-text-secondary);
  border-color: var(--color-border);
}
.btn-secondary:hover {
  background: var(--color-border);
}
@media (max-width: 640px) {
  .modal-overlay { padding: 1rem; }
  .modal-header { padding: 1.5rem 1.25rem 0; }
  .modal-body { padding: 1rem 1.25rem 1.5rem; }
  .form-actions { flex-direction: column-reverse; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; display: flex; }
}
</style>