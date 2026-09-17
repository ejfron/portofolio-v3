<script setup lang="ts">
import { approach } from '@/data/extra'
import { usePlaySound } from '@/composables/usePlaySound'

const emit = defineEmits<{ (e: 'open-resume'): void }>()
const { playHoverSound } = usePlaySound()
</script>

<template>
  <section id="approach" class="sheet approach">
    <header class="approach__head">
      <span class="sheet__mark">How I work</span>
      <h2 class="sheet__title">Three things I hold to</h2>
      <p class="sheet__lede">
        These are not values on a poster. Each one came out of a build that would have
        gone badly without it.
      </p>
    </header>

    <ol class="approach__list">
      <li
        v-for="(point, i) in approach"
        :key="point.title"
        class="point"
        @mouseenter="playHoverSound"
      >
        <span class="point__no" aria-hidden="true">{{ i + 1 }}</span>
        <div>
          <h3 class="point__title">{{ point.title }}</h3>
          <p class="point__body">{{ point.description }}</p>
          <p class="point__evidence">Learned building {{ point.evidence }}</p>
        </div>
      </li>
    </ol>

    <button
      class="approach__resume"
      type="button"
      @click="emit('open-resume')"
      @mouseenter="playHoverSound"
    >
      Read the full resume
    </button>
  </section>
</template>

<style scoped>
.approach__head {
  margin-bottom: 2.75rem;
}

.approach__list {
  list-style: none;
  border-top: 1px solid var(--rule-strong);
}

.point {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: 1.5rem;
  padding: 1.9rem 0;
  border-bottom: 1px solid var(--rule);
}

.point__no {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--ink-faint);
  padding-top: 0.3rem;
}

.point__title {
  margin: 0;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.point__body {
  margin: 0.7rem 0 0;
  max-width: var(--measure);
  font-size: 0.9375rem;
  line-height: 1.62;
  color: var(--ink-soft);
}

.point__evidence {
  margin: 0.8rem 0 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--stamp);
}

.approach__resume {
  margin-top: 2.25rem;
  padding: 0.7rem 1.25rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--rule-strong);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.14s ease, color 0.14s ease;
}
.approach__resume:hover {
  border-color: var(--stamp);
  color: var(--stamp);
}

@media (max-width: 620px) {
  .point {
    grid-template-columns: 2rem minmax(0, 1fr);
    gap: 0.9rem;
  }
}
</style>
