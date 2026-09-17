<script setup lang="ts">
import { skills } from '@/data/skills'
import SectionHeading from '@/components/common/SectionHeading.vue'
import SkillBadge from '@/components/skills/SkillBadge.vue'
</script>

<template>
  <section class="skills-section">
    <SectionHeading label="Skills" />
    <div class="skills-section__grid">
      <SkillBadge v-for="skill in skills" :key="skill.name" :skill="skill" />
    </div>
  </section>
</template>

<style scoped>
.skills-section__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 560px) {
  .skills-section__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>