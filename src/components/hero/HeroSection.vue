<script setup lang="ts">
import { profile } from '@/data/profile'
import { ledger } from '@/data/extra'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import BrandIcon from '@/components/icons/BrandIcon.vue'
import { usePlaySound } from '@/composables/usePlaySound'

const emit = defineEmits<{ (e: 'open-contact'): void; (e: 'open-resume'): void }>()
const { playHoverSound } = usePlaySound()
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__id">
      <div class="hero__portrait">
        <img :src="profile.avatar" :alt="`${profile.firstName} ${profile.lastName}`" />
      </div>
      <p class="hero__caption">
        {{ profile.firstName }} {{ profile.lastName }}<br />
        <span>{{ profile.role }} &nbsp;|&nbsp; {{ profile.location }}</span>
      </p>
    </div>

    <div class="hero__content">
      <h1 class="hero__statement">
        I Can Build Custom Software that keeps your business running.
      </h1>

      <p class="hero__sub">
        I'm a full-stack software Developer with a passion for creating efficient and
        scalable solutions. I specialize in building web applications that are not only
        functional but also user-friendly and visually appealing.
      </p>

      <div class="hero__actions">
        <a class="btn btn--solid" href="#work" @mouseenter="playHoverSound">See the work</a>
        <button class="btn btn--line" type="button" @click="emit('open-resume')" @mouseenter="playHoverSound">
          Resume
        </button>
        <button class="btn btn--line" type="button" @click="emit('open-contact')" @mouseenter="playHoverSound">
          Start a project
        </button>
      </div>
    </div>

    <dl class="ledger">
      <div v-for="figure in ledger" :key="figure.label" class="ledger__entry">
        <dt class="ledger__value">{{ figure.value }}</dt>
        <dd class="ledger__label">{{ figure.label }}</dd>
      </div>
      <div class="ledger__entry ledger__entry--status">
        <dt class="ledger__value ledger__value--live">
          <span class="ledger__pip" aria-hidden="true"></span>Open
        </dt>
        <dd class="ledger__label">taking work for {{ new Date().getFullYear() }}</dd>
      </div>
    </dl>

    <div class="hero__links">
      <a
        :href="profile.socials.github"
        target="_blank"
        rel="noopener"
        @mouseenter="playHoverSound"
      >
        <BrandIcon name="github" :size="15" />GitHub
      </a>
      <a
        :href="profile.socials.linkedin"
        target="_blank"
        rel="noopener"
        @mouseenter="playHoverSound"
      >
        <LinkedinIcon :size="15" />LinkedIn
      </a>
      <button type="button" class="hero__mail-link" @click="emit('open-contact')" @mouseenter="playHoverSound">
        <LucideIcon name="Mail" :size="15" />{{ profile.email }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(200px, 320px);
  column-gap: 2.5rem;
  align-items: start;
  padding: 4.5rem var(--gutter) 0;
}

.hero__id {
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
  width: 100%;
  text-align: right;
  animation: rise 0.6s 0.28s ease-out backwards;
}

.hero__portrait {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 1px solid var(--rule-strong);
  background: var(--paper-sunk);
}

.hero__portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
  filter: grayscale(1) contrast(1.06);
}

.hero__caption {
  margin: 0.55rem 0 0;
  font-size: 0.75rem;
  line-height: 1.45;
  font-weight: 600;
  color: var(--ink);
}

.hero__caption span {
  font-weight: 400;
  color: var(--ink-faint);
}

.hero__content {
  grid-column: 1;
  grid-row: 1;
  min-width: 0;
}

.hero__statement {
  margin: 0;
  font-size: clamp(2.4rem, 5.4vw, 4.4rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
  animation: rise 0.6s ease-out backwards;
}

.hero__sub {
  max-width: 50ch;
  margin: 1.75rem 0 0;
  font-size: 1.0625rem;
  line-height: 1.62;
  color: var(--ink-soft);
  animation: rise 0.6s 0.1s ease-out backwards;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2rem;
  animation: rise 0.6s 0.18s ease-out backwards;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.25rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border-radius: 2px;
  transition:
    background 0.14s ease,
    color 0.14s ease,
    border-color 0.14s ease;
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

.ledger {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 3.25rem 0 0;
  border-top: 1px solid var(--rule-strong);
  border-bottom: 1px solid var(--rule);
  animation: rise 0.6s 0.36s ease-out backwards;
}

.ledger__entry {
  min-width: 0;
  padding: 1.1rem 1.25rem 1.1rem 0;
  border-right: 1px solid var(--rule);
}

.ledger__entry:last-child {
  border-right: none;
}

.ledger__entry + .ledger__entry {
  padding-left: 1.25rem;
}

.ledger__value {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.ledger__value--live {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  color: var(--live);
}

.ledger__pip {
  width: 9px;
  height: 9px;
  flex: 0 0 9px;
  border-radius: 50%;
  background: var(--live);
}

.ledger__label {
  margin: 0.45rem 0 0;
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--ink-faint);
}

.hero__links {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  padding: 1.15rem 0;
  animation: rise 0.6s 0.44s ease-out backwards;
}

.hero__links a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink-soft);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
}

.hero__mail-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink-soft);
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 0 0 1px;
  cursor: pointer;
}
.hero__mail-link:hover {
  color: var(--stamp);
}

.hero__links a:hover {
  color: var(--stamp);
}

@media (max-width: 1100px) {
  .hero {
    grid-template-columns: minmax(0, 1fr) 240px;
    column-gap: 2rem;
  }

  .hero__statement {
    font-size: clamp(2.4rem, 5vw, 3.8rem);
  }

  .ledger__entry {
    padding-right: 1rem;
  }

  .ledger__entry + .ledger__entry {
    padding-left: 1rem;
  }
}

@media (max-width: 900px) {
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    column-gap: 0;
    row-gap: 1.5rem;
    padding-top: 3.5rem;
  }

  .hero__id {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    text-align: left;
    
  }


  .hero__portrait {
  width: 50%;

}



  .hero__caption {
    font-size: 0.75rem;
    text-align: left;
  }

  .hero__content {
    grid-column: 1;
    grid-row: 2;
  }

  .hero__statement {
    font-size: clamp(2.1rem, 8vw, 3rem);
    line-height: 0.99;
  }

  .hero__sub {
    max-width: 60ch;
    margin-top: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .hero__actions {
    margin-top: 1.75rem;
  }

  .ledger {
    grid-column: 1;
    grid-row: 3;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 2.5rem;
  }

  .ledger__entry {
    padding: 1rem 1rem 1rem 0;
    border-right: 1px solid var(--rule);
  }

  .ledger__entry + .ledger__entry {
    padding-left: 1rem;
  }

  .ledger__entry:nth-child(2n) {
    border-right: none;
  }

  .ledger__entry:nth-child(-n + 2) {
    border-bottom: 1px solid var(--rule);
  }

  .ledger__entry:nth-child(odd) {
    padding-left: 0;
  }

  .ledger__entry:nth-child(even) {
    padding-left: 1rem;
  }

  .hero__links {
    grid-column: 1;
    grid-row: 4;
    padding: 1rem 0;
  }
}

@media (max-width: 700px) {
  .hero {
    padding-top: 2.75rem;
  }

  .hero__statement {
    font-size: clamp(2rem, 8.5vw, 2.8rem);
  }

  .hero__sub {
    font-size: 0.98rem;
  }

  .ledger__value {
    font-size: 1.65rem;
  }

  .ledger__value--live {
    font-size: 1.25rem;
  }

  .ledger__label {
    font-size: 0.74rem;
  }
}

@media (max-width: 520px) {
  .hero {
    padding-top: 2rem;
    row-gap: 1.25rem;
  }



  .hero__portrait {
  width: 100%;

}


  .hero__caption {
    margin-top: 0.45rem;
    font-size: 0.7rem;
  }

  .hero__statement {
    font-size: clamp(1.9rem, 9vw, 2.5rem);
    line-height: 1;
  }

  .hero__sub {
    margin-top: 1.25rem;
    font-size: 0.95rem;
    line-height: 1.55;
  }

  .hero__actions {
    gap: 0.5rem;
    margin-top: 1.5rem;
  }

  .hero__actions .btn {
    flex: 1 1 auto;
    justify-content: center;
  }

  .ledger {
    margin-top: 2rem;
  }

  .ledger__entry {
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
  }


  .ledger__entry:nth-child(even) {
    padding-left: 0.85rem;
  }

  .ledger__value {
    font-size: 1.45rem;
  }

  .ledger__value--live {
    font-size: 1.1rem;
    gap: 0.35rem;
  }

  .ledger__pip {
    width: 7px;
    height: 7px;
    flex-basis: 7px;
  }

  .ledger__label {
    font-size: 0.7rem;
  }

  .hero__links {
    gap: 0.9rem 1.2rem;
    padding-top: 0.85rem;
    padding-bottom: 0.85rem;
  }

  .hero__links a {
    font-size: 0.75rem;
  }
}

@media (max-width: 380px) {
  .hero {
    padding-top: 1.5rem;
  }

  .hero__statement {
    font-size: 1.8rem;
  }

  .hero__sub {
    font-size: 0.9rem;
  }

  .ledger__value {
    font-size: 1.3rem;
  }

  .ledger__value--live {
    font-size: 1rem;
  }

  .ledger__label {
    font-size: 0.66rem;
  }
}
</style>