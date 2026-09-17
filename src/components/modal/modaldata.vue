<script setup lang="ts">
import type { Project } from '@/types/project'
import BrandIcon from '@/components/icons/BrandIcon.vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

const props = defineProps<{
  modelValue: boolean
  project: Project | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue && project" class="modal-overlay"  @click.self="close" >
      <div class="modal-content">
    
        <button class="modal-close" @mouseenter="playHoverSound" @click="() => {close(); playHoverSound()}" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>


        <div class="modal-image">
          <img 
            v-if="project.image" 
            :src="project.image" 
            alt="Project Screenshot" 
            class="modal-image__img" 
   
          />
          <div v-else class="modal-image__placeholder">
            <!-- Inline SVG for image placeholder (No TS error) -->
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Project Screenshot</span>
          </div>
        </div>

        <!-- Content Body -->
        <div class="modal-body">
          <h2 class="modal-title">{{ project.title }}</h2>
          <p class="modal-subtitle" :style="{ color: project.subtitleColor || 'var(--color-primary)' }">
            {{ project.subtitle }}
          </p>
          <p class="modal-description">{{ project.description }}</p>

          <!-- Features Section -->
          <div v-if="project.features && project.features.length" class="modal-section">
            <h3 class="modal-section-title">Features</h3>
            <div class="modal-features-grid">
              <div v-for="feature in project.features" :key="feature" class="modal-feature-item">
                <span class="modal-feature-bullet"></span>
                {{ feature }}
              </div>
            </div>
          </div>

          <!-- Tech Stack Section -->
          <div v-if="project.tags && project.tags.length" class="modal-section">
            <h3 class="modal-section-title">Tech Stack</h3>
            <div class="modal-tech-stack">
              <span v-for="tag in project.tags" :key="tag" class="modal-tech-pill">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer: Links -->
        <div class="modal-footer">
          <div class="modal-footer-links">
            <a 
              v-if="project.github" 
              :href="project.github" 
              target="_blank" 
              rel="noopener"
              class="modal-footer-link"
              @mouseenter="playHoverSound"
            >
              <BrandIcon name="github" :size="16" />
              Github Repository
            </a>
            <span v-if="project.github && project.demo" class="modal-footer-divider"></span>
            <a 
              v-if="project.demo" 
              :href="project.demo" 
              target="_blank" 
              rel="noopener"
              class="modal-footer-link"
              @mouseenter="playHoverSound"
            >
              <LucideIcon name="Globe" :size="16" />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Overlay */
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

/* Modal Container */
.modal-content {
  position: relative;
  background: var(--color-surface);
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overflow-x: hidden;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* --- IMPROVED CLOSE BUTTON --- */
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-close:hover {
  background: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
  transform: rotate(90deg) scale(1.08);
  box-shadow: 0 4px 14px rgba(var(--color-primary-rgb, 18, 183, 106), 0.3);
}

.modal-close:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* --- CARD-STYLE IMAGE SECTION --- */
.modal-image {
  width: 100%;
  padding: 1.5rem; 
  margin-top: 3rem;
  background: transparent; 
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.modal-image__img {
  width: 100%;
  height: auto;
  max-height: 320px;
  border-radius: 12px; 
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border);
  object-fit: contain;
  display: block;
  background: #ffffff;
}

.modal-image__placeholder {
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  gap: 0.5rem;
}

/* --- CONTENT BODY --- */
.modal-body {
  padding: 0 2rem 1rem 2rem; 
}

.modal-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.modal-subtitle {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  font-weight: 600;
}

.modal-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

/* Sections (Features/Tech Stack) */
.modal-section {
  margin-top: 1.5rem;
}

.modal-section-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 0.75rem 0;
}

.modal-features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem 1rem;
}

.modal-feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.modal-feature-bullet {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
}

.modal-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.modal-tech-pill {
  padding: 0.3rem 0.75rem;
  background: var(--color-border);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* Footer */
.modal-footer {
  padding: 1.25rem 2rem 2rem 2rem;
}

.modal-footer-links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1.25rem;
}

.modal-footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s;
}

.modal-footer-link:hover {
  color: var(--color-primary);
}

.modal-footer-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  /* Shrink the image padding on mobile */
  .modal-image {
    padding: 1rem;
  }

  .modal-body {
    padding: 0 1.25rem 0.5rem 1.25rem;
  }
  
  .modal-footer {
    padding: 1rem 1.25rem 1.25rem;
  }

  .modal-features-grid {
    grid-template-columns: 1fr;
  }

  .modal-image__img {
    max-height: 180px;
    border-radius: 8px;
  }
}
</style>