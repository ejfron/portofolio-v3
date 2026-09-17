<script setup lang="ts">
import { profile } from '@/data/profile'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import BrandIcon from '@/components/icons/BrandIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'

const emit = defineEmits<{ (e: 'open-contact'): void; (e: 'open-resume'): void }>()
const { playHoverSound } = usePlaySound()
</script>

<template>
  <section id="contact" class="sheet contact">
    <div class="contact__pitch">
      <span class="sheet__mark">Next</span>
      <h2 class="contact__title">Tell me what your business keeps losing track of.</h2>
      <p class="contact__copy">
        Sales, stock, hours, bookings — if you are still counting it on paper or in a
        notebook, there is usually a small system that fixes it. Send a short note about
        the problem and I will tell you honestly whether it is worth building.
      </p>

      <div class="contact__actions">
        <button
          class="btn btn--solid"
          type="button"
          @click="emit('open-contact')"
          @mouseenter="playHoverSound"
        >
          Send a message
        </button>
        <button
          class="btn btn--line"
          type="button"
          @click="emit('open-resume')"
          @mouseenter="playHoverSound"
        >
          Resume
        </button>
      </div>
    </div>

    <dl class="contact__card">
      <div class="contact__row">
        <dt>Email</dt>
        <dd>
          <button type="button" class="contact__row-link" @click="emit('open-contact')" @mouseenter="playHoverSound">{{ profile.email }}</button>
        </dd>
      </div>
      <div class="contact__row">
        <dt>Based in</dt>
        <dd>{{ profile.location }}</dd>
      </div>
      <div class="contact__row">
        <dt>Code</dt>
        <dd>
          <a
            :href="profile.socials.github"
            target="_blank"
            rel="noopener"
            @mouseenter="playHoverSound"
          >github.com/ejfron</a>
        </dd>
      </div>
      <div class="contact__row">
        <dt>Status</dt>
        <dd class="contact__status">
          <span class="contact__pip" aria-hidden="true"></span>{{ profile.status }}
        </dd>
      </div>

      <div class="contact__socials">
        <a
          :href="profile.socials.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          @mouseenter="playHoverSound"
        >
          <BrandIcon name="github" :size="16" />
        </a>
        <a
          :href="profile.socials.linkedin"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          @mouseenter="playHoverSound"
        >
          <LinkedinIcon :size="16" />
        </a>
        <button
          type="button"
          class="contact__socials-btn"
          aria-label="Email"
          @click="emit('open-contact')"
          @mouseenter="playHoverSound"
        >
          <LucideIcon name="Mail" :size="16" />
        </button>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 4rem;
  align-items: start;
}

.contact__title {
  margin: 0;
  max-width: 18ch;
  font-size: clamp(2rem, 4.2vw, 3.1rem);
  line-height: 1.02;
  letter-spacing: -0.032em;
}

.contact__copy {
  margin: 1.4rem 0 0;
  max-width: 48ch;
  font-size: 1rem;
  line-height: 1.62;
  color: var(--ink-soft);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.25rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.14s ease, color 0.14s ease, border-color 0.14s ease;
}
.btn--solid {
  background: var(--ink);
  color: var(--paper);
  border: 1px solid var(--ink);
}
.btn--solid:hover {
  background: var(--stamp);
  border-color: var(--stamp);
  color: #fff;
}
.btn--line {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--rule-strong);
}
.btn--line:hover {
  border-color: var(--stamp);
  color: var(--stamp);
}

.contact__card {
  margin: 0;
  border-top: 1px solid var(--rule-strong);
}

.contact__row {
  display: grid;
  grid-template-columns: 6.5rem minmax(0, 1fr);
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--rule);
  font-size: 0.875rem;
}
.contact__row dt {
  color: var(--ink-faint);
  font-weight: 500;
}
.contact__row dd {
  margin: 0;
  color: var(--ink);
  overflow-wrap: anywhere;
}
.contact__row a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--rule-strong);
  padding-bottom: 1px;
}
.contact__row-link {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: none;
  border: none;
  border-bottom: 1px solid var(--rule-strong);
  padding: 0 0 1px;
  cursor: pointer;
}
.contact__row a:hover {
  color: var(--stamp);
  border-bottom-color: var(--stamp);
}
.contact__row-link:hover {
  color: var(--stamp);
  border-bottom-color: var(--stamp);
}

.contact__status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--live);
  font-weight: 600;
}
.contact__pip {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--live);
}

.contact__socials {
  display: flex;
  gap: 0.5rem;
  padding-top: 1.1rem;
}
.contact__socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--rule-strong);
  border-radius: 2px;
  color: var(--ink-soft);
  transition: border-color 0.14s ease, color 0.14s ease;
}
.contact__socials a:hover {
  border-color: var(--stamp);
  color: var(--stamp);
}
.contact__socials-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  font-family: inherit;
  background: none;
  border: 1px solid var(--rule-strong);
  border-radius: 2px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: border-color 0.14s ease, color 0.14s ease;
}
.contact__socials-btn:hover {
  border-color: var(--stamp);
  color: var(--stamp);
}

@media (max-width: 960px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 2.75rem;
  }
}
</style>
