<script setup lang="ts">
defineProps<{
  index: string
  label: string
}>()
</script>

<template>
  <p class="numbered-heading">
    <span class="numbered-heading__index">{{ index }}</span>
    <span class="numbered-heading__rule" aria-hidden="true"></span>
    {{ label }}
  </p>
</template>

<style scoped>
.numbered-heading {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
}
.numbered-heading__index {
  color: var(--color-primary);
}
.numbered-heading__rule {
  width: 22px;
  height: 2px;
  background: var(--color-border);
}
</style>
