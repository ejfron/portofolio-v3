<template>
  <button
    class="theme-toggle"
    @click="(e) => { toggle(e); playHoverSound(); }"
    @mouseenter="playHoverSound"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <LucideIcon name="Sun" class="icon icon-sun" :size="16" :stroke-width="2.5" />
    <LucideIcon name="Moon" class="icon icon-moon" :size="16" :stroke-width="2.5" />

    <div
      class="slider-bg"
      :class="{ 'slider-right': !isDark, 'slider-left': isDark }"
    ></div>
  </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

const { isDark, toggle, init } = useDarkMode()

onMounted(() => {
  init()
})
</script>

<style scoped>
.theme-toggle {
  position: relative;
  width: 64px;
  height: 32px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s;
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: #94a3b8;
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-primary, #3b82f6);
  outline-offset: 2px;
}

/* Fixed Icons */
.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: none;
}

.icon-sun {
  left: 8px;
  color: var(--color-primary);
}

.icon-moon {
  right: 8px;
color: #fff;
}

.icon-moon :deep(svg) {
  fill: currentColor;
}

/* Sliding Background */
.slider-bg {
  position: absolute;
  top: 2px;
  left: 3.5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: var(--color-text);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.slider-left {
  transform: translateX(0);
}

.slider-right {
  transform: translateX(30px);
}
</style>