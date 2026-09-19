<script setup lang="ts">
import { Download, X } from '@lucide/vue'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()


const resumeUrl = '/resume/Edgar_Jugado_Resume.pdf'
const resumeFileName = 'Edgar_Jugado_Resume.pdf'

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <div>
            <h2 class="modal-title">My Resume</h2>
            <p class="modal-subtitle">Preview below, or download a copy for your records.</p>
          </div>

          <div class="modal-header-actions">
            <a
              :href="resumeUrl"
              :download="resumeFileName"
              class="modal-download"
              aria-label="Download resume"
              @mouseenter="playHoverSound"
              @click="playHoverSound"
            >
              <Download :size="18" :stroke-width="2" />
              <span>Download</span>
            </a>

            <button class="modal-close" @mouseenter="playHoverSound" @click="close" aria-label="Close modal">
              <X :size="22" :stroke-width="2" />
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <iframe
            :src="resumeUrl"
            title="Edgar Jugado's Resume"
            class="resume-frame"
          ></iframe>

          <p class="modal-fallback-note">
            Preview not loading?
            <a :href="resumeUrl" target="_blank" rel="noopener" @click="playHoverSound">Open the resume in a new tab</a>.
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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
  max-width: 820px;
  width: 100%;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 1.5rem 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
}
.modal-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
}
.modal-subtitle {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}
.modal-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.modal-download {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  background: var(--color-primary, #12B76A);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(var(--color-primary-rgb, 18, 183, 106), 0.25);
  transition: all 0.2s ease;
  cursor: pointer;
}
.modal-download:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}
.modal-close {
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
.modal-body {
  padding: 1rem 1.5rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.resume-frame {
  width: 100%;
  height: 72vh;
  min-height: 420px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: #fff;
}
.modal-fallback-note {
  margin: 0;
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  text-align: center;
}
.modal-fallback-note a {
  color: var(--color-primary, #12B76A);
  font-weight: 600;
}
@media (max-width: 640px) {
  .modal-overlay { padding: 1rem; }
  .modal-header { padding: 1.25rem 1.25rem 1rem; flex-direction: column; align-items: stretch; }
  .modal-header-actions { justify-content: flex-end; }
  .modal-body { padding: 1rem 1.25rem 1.25rem; }
  .resume-frame { height: 60vh; }
}
</style>