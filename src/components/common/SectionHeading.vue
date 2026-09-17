<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="section-heading">
    <span class="section-heading__dot" aria-hidden="true"></span>
    <h2 class="section-heading__label">{{ label }}</h2>
  </div>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

.section-heading__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
}

.section-heading__label {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text);
}
</style>