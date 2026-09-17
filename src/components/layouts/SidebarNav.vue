<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { profile } from '@/data/profile'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import BrandIcon from '@/components/icons/BrandIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'
import { useSoundSettings } from '@/composables/useSoundSettings'

const { playHoverSound, playToggleSound, unlockAudio } = usePlaySound()
const { soundEnabled, toggleSound } = useSoundSettings()

watch(soundEnabled, (newVal, oldVal) => {
  if (newVal === true && oldVal === false) playToggleSound()
})

const handleToggleSound = () => {
  unlockAudio()
  toggleSound()
}

defineEmits<{ (e: 'open-contact'): void; (e: 'open-resume'): void }>()


const navItems = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'References', href: '/#vouches', id: 'vouches' },
  { label: 'Approach', href: '/#approach', id: 'approach' },
  { label: 'Stack', href: '/#stack', id: 'stack' },
  { label: 'Background', href: '/#background', id: 'background' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
] as const

const isOpen = ref(false)
const closeMenu = () => (isOpen.value = false)

const route = useRoute()
const activeId = ref<string>(navItems[0].id)
let observer: IntersectionObserver | null = null

const isActive = (id: string) => activeId.value === id

const teardownObserver = () => {
  observer?.disconnect()
  observer = null
}

const setupObserver = async () => {
  teardownObserver()
  if (route.path !== '/') return
  await nextTick()

  const sections = navItems
    .map((item) => document.getElementById(item.id))
    .filter((el): el is HTMLElement => !!el)

  if (!sections.length) return

  observer = new IntersectionObserver(
    (entries) => {
      const first = entries.find((entry) => entry.isIntersecting)
      if (first) activeId.value = first.target.id
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
  )

  sections.forEach((section) => observer!.observe(section))
}

const handleNavClick = (id: string) => {
  activeId.value = id
  closeMenu()
}

onMounted(setupObserver)
onUnmounted(teardownObserver)
watch(() => route.path, setupObserver)
</script>

<template>
  <button class="rail-toggle" type="button" @click="isOpen = !isOpen" aria-label="Toggle menu">
    <LucideIcon name="Menu" :size="18" />
  </button>

  <div v-if="isOpen" class="rail-scrim" @click="closeMenu"></div>

  <aside class="rail" :class="{ 'rail--open': isOpen }">
    <RouterLink to="/#home" class="rail__mark" @click="handleNavClick('home')">
      <span class="rail__who">
        {{ profile.firstName }} {{ profile.lastName }}
        <span>{{ profile.role }}</span>
      </span>
    </RouterLink>

    <nav class="rail__nav" aria-label="Primary">
      <RouterLink
        v-for="(item, i) in navItems"
        :key="item.id"
        :to="item.href"
        class="rail__link"
        :class="{ 'rail__link--active': isActive(item.id) }"
        @click="handleNavClick(item.id)"
        @mouseenter="playHoverSound"
      >
        <span class="rail__no">{{ String(i + 1).padStart(2, '0') }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="rail__foot">
      <div class="rail__socials">
        <a
          :href="profile.socials.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          @mouseenter="playHoverSound"
        >
          <BrandIcon name="github" :size="15" />
        </a>
        <a
          :href="profile.socials.linkedin"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          @mouseenter="playHoverSound"
        >
          <LinkedinIcon :size="15" />
        </a>
        <a
          href="#"
          aria-label="Email"
          @click.prevent="$emit('open-contact')"
          @mouseenter="playHoverSound"
        >
          <LucideIcon name="Mail" :size="15" />
        </a>
        <button
          type="button"
          :aria-label="soundEnabled ? 'Mute hover sound' : 'Unmute hover sound'"
          @click="handleToggleSound"
          @mouseenter="playHoverSound"
        >
          <LucideIcon :name="soundEnabled ? 'Volume1' : 'VolumeX'" :size="15" />
        </button>
      </div>

      <p class="rail__status">
        <span class="rail__pip" aria-hidden="true"></span>{{ profile.status }}
      </p>
    </div>
  </aside>
</template>

<style scoped>
.rail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2.25rem 1.5rem 1.75rem;
  background: var(--paper);
  border-right: 1px solid var(--rule);
  overflow-y: auto;
  z-index: 900;
}

.rail__mark {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
}
.rail__initials {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--paper);
  background: var(--ink);
  border-radius: 2px;
}
.rail__who {
  display: flex;
  flex-direction: column;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
}
.rail__who span {
  font-weight: 400;
  font-size: 0.72rem;
  color: var(--ink-faint);
}

.rail__nav {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--rule);
}

.rail__link {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.62rem 0;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink-soft);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  transition: color 0.14s ease;
}
.rail__no {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--ink-faint);
}
.rail__link:hover {
  color: var(--ink);
}
.rail__link--active {
  color: var(--stamp);
  font-weight: 600;
}
.rail__link--active .rail__no {
  color: var(--stamp);
}

.rail__foot {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid var(--rule);
}

.rail__socials {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
}
.rail__socials a,
.rail__socials button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--ink-faint);
  background: transparent;
  border: 1px solid var(--rule);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.14s ease, color 0.14s ease;
}
.rail__socials a:hover,
.rail__socials button:hover {
  border-color: var(--stamp);
  color: var(--stamp);
}

.rail__status {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--ink-faint);
}
.rail__pip {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--live);
}

.rail-toggle {
  display: none;
  position: fixed;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 1100;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  background: var(--paper-raised);
  border: 1px solid var(--rule-strong);
  border-radius: 2px;
  cursor: pointer;
}

.rail-scrim {
  display: none;
}

@media (max-width: 1024px) {
  .rail-toggle {
    display: inline-flex;
  }
  .rail {
    transform: translateX(-100%);
    transition: transform 0.22s ease;
  }
  .rail--open {
    transform: translateX(0);
  }
  .rail-scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 800;
    background: rgba(10, 14, 16, 0.5);
  }
}
</style>
