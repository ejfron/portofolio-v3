<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '@/types/project'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import BrandIcon from '../icons/BrandIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

const props = withDefaults(
  defineProps<{
    project: Project
    index?: number
    variant?: 'row' | 'stack'
  }>(),
  { variant: 'row' },
)
defineEmits<{ (e: 'view-details'): void }>()

const showUnavailableModal = ref(false)

const isLive = computed(() => Boolean(props.project.demo))

const entryNumber = computed(() => String((props.index ?? 0) + 1).padStart(2, '0'))

const handleDemoClick = (e: MouseEvent) => {
  if (!props.project.demo) {
    e.preventDefault()
    showUnavailableModal.value = true
  }
  playHoverSound()
}

const closeModal = () => {
  showUnavailableModal.value = false
}
</script>

<template>
  <article
    class="entry"
    :class="{ 'entry--stack': variant === 'stack' }"
    @mouseenter="playHoverSound"
  >
    <span class="entry__no" aria-hidden="true">{{ entryNumber }}</span>

    <div class="entry__main">
      <h3 class="entry__title">{{ project.title }}</h3>
      <p class="entry__subtitle">{{ project.subtitle }}</p>
      <p class="entry__desc">{{ project.description }}</p>
    </div>

    <div class="entry__meta">
      <p class="entry__stack">{{ project.tags.join(' · ') }}</p>
      <p class="entry__status" :class="{ 'entry__status--live': isLive }">
        <span class="entry__pip" aria-hidden="true"></span>
        {{ isLive ? 'Live' : 'Private build' }}
      </p>
    </div>

    <div class="entry__actions">
      <a
        v-if="project.github"
        class="entry__link"
        :href="project.github"
        target="_blank"
        rel="noopener"
        @mouseenter="playHoverSound"
      >
        <BrandIcon name="github" :size="13" />Code
      </a>

      <a
        v-if="project.demo"
        class="entry__link"
        :href="project.demo"
        target="_blank"
        rel="noopener"
        @click="handleDemoClick"
        @mouseenter="playHoverSound"
      >
        <LucideIcon name="Globe" :size="13" />Visit
      </a>
      <button v-else class="entry__link" type="button" @click="handleDemoClick">
        <LucideIcon name="Globe" :size="13" />Visit
      </button>

      <button
        v-if="project.detailsUrl"
        class="entry__link entry__link--primary"
        type="button"
        @click="$emit('view-details')"
        @mouseenter="playHoverSound"
      >
        Read more
      </button>
    </div>

    <Teleport to="body">
      <div v-if="showUnavailableModal" class="veil" @click.self="closeModal">
        <div class="note" role="dialog" aria-modal="true">
          <button class="note__close" type="button" @click="closeModal" aria-label="Close">
            <LucideIcon name="X" :size="16" />
          </button>
          <p class="note__label">{{ project.title }}</p>
          <p class="note__body">
            {{ project.ProjectAvail || 'This one is not publicly viewable right now.' }}
          </p>
        </div>
      </div>
    </Teleport>
  </article>
</template>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1.35fr) minmax(0, 1fr) auto;
  gap: 1.5rem 0;
  align-items: start;
  padding: 1.6rem 0.75rem 1.6rem 0;
  border-bottom: 1px solid var(--rule);
  transition: background 0.14s ease;
}
.entry:hover {
  background: var(--stamp-wash);
}

.entry__main {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.entry__no {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--ink-faint);
  padding-top: 0.3rem;
}

.entry__title {
  margin: 0;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.entry__subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--stamp);
}
.entry__desc {
  margin: 0.65rem 0 0;
  max-width: 44ch;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

.entry__meta {
  padding-top: 0.3rem;
}
.entry__stack {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--ink-soft);
}
.entry__status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.75rem 0 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ink-faint);
}
.entry__pip {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--rule-strong);
}
.entry__status--live {
  color: var(--live);
}
.entry__status--live .entry__pip {
  background: var(--live);
}

.entry__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  padding-top: 0.3rem;
}
.entry__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink-soft);
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}
.entry__link:hover {
  color: var(--stamp);
  border-bottom-color: var(--stamp);
}
.entry__link--primary {
  color: var(--ink);
  font-weight: 600;
}


.entry--stack {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 2.25rem 0.75rem 2.25rem 1rem;
}

.entry--stack .entry__no {
  padding-top: 0;
}

.entry--stack .entry__desc {
  max-width: 62ch;
}

.entry--stack .entry__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.25rem;
  padding-top: 0;
}
.entry--stack .entry__status {
  margin: 0;
}

.entry--stack .entry__actions {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: 0.25rem;
}

/* ── Unavailable note ────────────────────────────────────────── */
.veil {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(10, 14, 16, 0.55);
}
.note {
  position: relative;
  width: 100%;
  max-width: 360px;
  padding: 1.75rem;
  background: var(--paper-raised);
  border: 1px solid var(--rule-strong);
  border-radius: 2px;
}
.note__close {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  display: flex;
  padding: 0.3rem;
  color: var(--ink-faint);
  background: none;
  border: none;
  cursor: pointer;
}
.note__close:hover {
  color: var(--ink);
}
.note__label {
  margin: 0 0 0.4rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
}
.note__body {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

@media (max-width: 1100px) {
  .entry:not(.entry--stack) {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    gap: 0.5rem 1rem;
  }
  .entry:not(.entry--stack) .entry__meta,
  .entry:not(.entry--stack) .entry__actions {
    grid-column: 2;
    padding-top: 0;
  }
  .entry:not(.entry--stack) .entry__meta {
    margin-top: 0.9rem;
  }
  .entry:not(.entry--stack) .entry__actions {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.1rem;
    margin-top: 0.9rem;
  }
}
</style>