<script setup lang="ts">
import { skillGroups } from '@/data/skills'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import BrandIcon from '@/components/icons/BrandIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()
</script>

<template>
  <section id="stack" class="sheet stack">
    <header class="stack__head">
      <span class="sheet__mark">Toolkit</span>
      <h2 class="sheet__title">What I reach for, and why</h2>
    </header>

    <div class="stack__groups">
      <section v-for="group in skillGroups" :key="group.id" class="group">
        <div class="group__label">
          <h3 class="group__name">{{ group.label }}</h3>
          <p class="group__note">{{ group.note }}</p>
        </div>

        <ul class="group__items">
          <li
            v-for="item in group.items"
            :key="item.name"
            class="chip"
            @mouseenter="playHoverSound"
          >
            <BrandIcon
              v-if="item.iconType === 'brand'"
              :name="item.icon as any"
              :size="14"
            />
            <LucideIcon v-else :name="item.icon as any" :size="14" />
            {{ item.name }}
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.stack__head {
  margin-bottom: 2.75rem;
}

.stack__groups {
  border-top: 1px solid var(--rule-strong);
}

.group {
  display: grid;
  grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
  gap: 2.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--rule);
}

.group__name {
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.015em;
  color: var(--ink);
}
.group__note {
  margin: 0.4rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--ink-faint);
}

.group__items {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: flex-start;
  padding-top: 0.15rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink);
  border: 1px solid var(--rule);
  border-radius: 2px;
  background: var(--paper-raised);
  transition: border-color 0.14s ease, color 0.14s ease;
}
.chip:hover {
  border-color: var(--stamp);
  color: var(--stamp);
}

@media (max-width: 860px) {
  .group {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
