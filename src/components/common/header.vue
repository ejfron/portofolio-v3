<script setup lang="ts">
import { watch } from 'vue'


import { profile } from '@/data/profile'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import BrandIcon from '@/components/icons/BrandIcon.vue'
import { useSoundSettings } from '@/composables/useSoundSettings'
import { usePlaySound } from '@/composables/usePlaySound'

const emit = defineEmits<{
  (e: 'open-contact'): void
}>()

const { soundEnabled, toggleSound } = useSoundSettings()
const { playHoverSound, playToggleSound, unlockAudio } = usePlaySound()

watch(soundEnabled, (newVal, oldVal) => {
  if (newVal === true && oldVal === false) {
    playToggleSound()
  }
})

const handleToggleSound = () => {
  unlockAudio()
  toggleSound()
}
</script>

<template>
  <aside class="profile-card">
    <!-- Avatar, name, etc. -->
    <div class="profile-card__avatar-wrap">
      <img :src="profile.avatar" :alt="profile.name" class="profile-card__avatar" />
      <span class="profile-card__status-dot" aria-hidden="true"></span>
    </div>

    <h1 class="profile-card__name">
      {{ profile.firstName }} <span class="profile-card__name-strong">{{ profile.lastName }}</span
      ><span class="profile-card__dot">.</span>
    </h1>
    <p class="profile-card__title">{{ profile.title }}</p>

    <div class="profile-card__rule" aria-hidden="true"></div>

    <p class="profile-card__bio">{{ profile.bio }}</p>

    <ul class="profile-card__meta">
      <li @mouseenter="playHoverSound">
        <LucideIcon name="MapPin" :size="16" />
        <span>{{ profile.location }}</span>
      </li>
      <li @mouseenter="playHoverSound">
        <LucideIcon name="Mail" :size="16" />
        <a :href="profile.socials.email">{{ profile.email }}</a>
      </li>
      <li @mouseenter="playHoverSound">
        <LucideIcon name="Code" :size="16" />
        <span>{{ profile.role }}</span>
      </li>
      <li @mouseenter="playHoverSound">
        <LucideIcon name="Clock" :size="16" />
        <span>{{ profile.status }}</span>
      </li>
    </ul>

    <p class="profile-card__signature">{{ profile.signature }}</p>

    <footer class="profile-card__footer">
      <p>&copy; {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
      <div class="profile-card__socials">
        <a
          :href="profile.socials.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          @mouseenter="playHoverSound"
        >
          <BrandIcon name="github" :size="18" />
        </a>

        <a
          :href="profile.socials.fiverr"
          target="_blank"
          rel="noopener"
          aria-label="Fiverr"
          @mouseenter="playHoverSound"
        >
          <BrandIcon name="fiverr" :size="18" />
        </a>

        <a
          :href="profile.socials.facebook"
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
          @mouseenter="playHoverSound"
        >
          <BrandIcon name="facebook" :size="18" />
        </a>

        <a
          href="#"
          aria-label="Email"
          @click.prevent="emit('open-contact')"
          @mouseenter="playHoverSound"
        >
          <LucideIcon name="Mail" :size="18" />
        </a>


         <button
          class="profile-card__sound-toggle"
          :aria-label="soundEnabled ? 'Mute sound' : 'Unmute sound'"
          @click="handleToggleSound"
          @mouseenter="playHoverSound"
          type="button"
        >
          <LucideIcon :name="soundEnabled ? 'Volume1' : 'VolumeX'" :size="18" />
        </button>
      </div>
    </footer>
  </aside>
</template>

<style scoped>
/* unchanged – keep your existing styles exactly as they are */
</style>

<style scoped>
/* Keep your existing CSS exactly as you have it */
.profile-card {
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;
}
.profile-card__avatar-wrap {
  position: relative;
  width: 100%;
  max-width: 270px;
  height:270px;
  margin-bottom: 1.75rem;
}
.profile-card__avatar {
  width: 100%;
  height: 100%;
  border-radius: 5%;
  object-fit: cover;
  background: var(--color-surface-alt);
}
.profile-card__status-dot {
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 4px solid var(--color-bg);
}
.profile-card__name {
  font-size: 2.3rem;
  line-height: 1.1;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0;

}
.profile-card__name-strong {
  color: var(--color-text);
}
.profile-card__dot {
  color: var(--color-primary);
}
.profile-card__title {

  margin: 0.35rem 0 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
.profile-card__rule {
  width: 40px;
  height: 3px;
  border-radius: 2px;
  background: var(--color-primary);
  margin: 1.5rem 0;
}
.profile-card__bio {
  margin: 0 0 1.75rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
  max-width: 30ch;
}
.profile-card__meta {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.profile-card__meta li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-text);
    cursor: pointer;
}
.profile-card__meta li :deep(svg) {
  color: var(--color-text-secondary);
  flex-shrink: 0;
}
.profile-card__meta a {
  color: inherit;
  text-decoration: none;
}
.profile-card__meta a:hover {
  color: var(--color-primary);
}
.profile-card__signature {
  font-family: 'Caveat', cursive;
  font-size: 1.75rem;
  color: var(--color-primary);
  margin: 0 0 1.5rem;
}
.profile-card__footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}
.profile-card__footer p {
  margin: 0 0 1rem;
  font-size: 0.78rem;
  color: var(--color-text-secondary);
}
.profile-card__socials {
  display: flex;
  gap: 0.75rem;
}
.profile-card__socials a,
.profile-card__sound-toggle {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  background: transparent;
  transition: all 0.15s ease;
  font-size: 0; /* remove any default text */
  padding: 0;
}
.profile-card__socials a:hover,
.profile-card__sound-toggle:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

@media (max-width: 767px) {
.profile-card__bio {

  max-width: 100%;
}
}
@media (max-width: 600px) {
  .profile-card {
    display: flex;
    flex-direction: column;
    padding: 1rem 0rem;
  }
  .profile-card__avatar-wrap {
    width: 100%;
    max-width: 100%;
    height: 300px;
  }
  .profile-card__bio {
    margin: 0 0 1.75rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    font-size: 0.95rem;
    max-width: 100%;
  }
}
</style>