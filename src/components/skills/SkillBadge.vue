<script setup lang="ts">
import type { Skill } from '@/types/skill'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import BrandIcon from '@/components/icons/BrandIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

defineProps<{ skill: Skill }>()
</script>

<template>
  <div class="skill-badge" @mouseenter="playHoverSound">
    <span
      class="skill-badge__icon"
      :style="{ background: skill.bg, color: skill.color }"
    >
      <BrandIcon v-if="skill.iconType === 'brand'" :name="skill.icon as any" :size="16" />
      <LucideIcon v-else :name="skill.icon as any" :size="16" />
    </span>
    <span class="skill-badge__name">{{ skill.name }}</span>
  </div>
</template>



<style scoped>
.skill-badge {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  transition: border-color 0.15s ease, transform 0.15s ease;
  
  min-width: 0; 
}

.skill-badge:hover {
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.skill-badge__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  flex-shrink: 0;
}

.skill-badge__name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  /* white-space: nowrap; */
   text-align: center;
}

/* --- Mobile adjustments for SkillBadge --- */
@media (max-width: 600px) {
  .skill-badge {
    padding: 0.5rem 0.6rem;
    gap: 0.4rem;
  }
  
  .skill-badge__name {
    font-size: 0.75rem;
    white-space: normal; /* Allow wrapping on tiny screens */
    line-height: 1.2;
    text-align: center; /* Optional: centers text if wrapped */
  }

  .skill-badge__icon {
    width: 24px;
    height: 24px;
  }
}
</style>