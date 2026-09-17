<template>
  <div class="visitor-card" @mouseenter="playHoverSound">
    <div class="icon-wrap">
      <LucideIcon name="Eye" :size="14" :stroke-width="2.5" class="icon-eye" />
    </div>
    <div class="visitor-text">
      <span class="visitor-count">{{ count ?? 0 }}</span>
      <span class="visitor-label">views</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import { useVisitorCount } from '@/composables/useVisitorCount'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()
const { increment, fetchCount } = useVisitorCount()
const count = ref<number | null>(null)

onMounted(async () => {
  const SESSION_KEY = 'visitor-counted-session'
  if (!sessionStorage.getItem(SESSION_KEY)) {
    count.value = await increment()
    sessionStorage.setItem(SESSION_KEY, '1')
  } else {
    count.value = await fetchCount()
  }
})
</script>

<style scoped>
.visitor-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 32px;
  padding: 0 12px 0 4px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  width: fit-content;
  transition: border-color 0.2s;
  cursor: pointer;
}
.visitor-card:hover {
  border-color: var(--color-primary);
}
.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-surface);
  flex-shrink: 0;
}
.icon-eye {
  color: var(--color-primary);
}
.visitor-text {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  line-height: 1;
}
.visitor-count {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text);
}
.visitor-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-transform: lowercase;
}
</style>