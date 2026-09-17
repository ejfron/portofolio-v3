<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="site-footer">
    <p class="site-footer__sign">{{ profile.firstName }} {{ profile.lastName }}</p>

    <div class="site-footer__bottom">
      <p class="site-footer__copy">
        &copy; {{ new Date().getFullYear() }} {{ profile.firstName }}
        {{ profile.lastName }} &nbsp;&middot;&nbsp; Built with Vue and too much coffee
      </p>
      <nav class="site-footer__nav" aria-label="Footer">
        <RouterLink to="/#home">Home</RouterLink>
        <RouterLink to="/#work">Work</RouterLink>
        <RouterLink to="/#vouches">References</RouterLink>
        <RouterLink to="/#stack">Stack</RouterLink>
        <RouterLink to="/#background">Background</RouterLink>
        <RouterLink to="/#contact">Contact</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 3rem var(--gutter) 2.25rem;
  border-top: 1px solid var(--rule-strong);
}

.site-footer__sign {
  margin: 0 0 2.5rem;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 9vw, 6.5rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.045em;
  color: var(--rule-strong);
}

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding-top: 1.35rem;
  border-top: 1px solid var(--rule);
}

.site-footer__copy {
  margin: 0;
  font-size: 0.78rem;
  color: var(--ink-faint);
}

.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.35rem;
}
.site-footer__nav a {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink-soft);
  text-decoration: none;
}
.site-footer__nav a:hover {
  color: var(--stamp);
}

@media (max-width: 720px) {
  .site-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
