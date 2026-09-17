<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { recommendations } from '@/data/extra'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

const featured = computed(() => recommendations.slice(0, 3))
</script>

<template>
  <section id="vouches" class="sheet vouches">
    <header class="vouches__head">
      <div>
        <span class="sheet__mark">On the record</span>
        <h2 class="sheet__title">What the owners say</h2>
        <p class="sheet__lede">
          The people below paid for the work and ran their business on it afterwards.
        </p>
      </div>
      <RouterLink class="vouches__all" to="/recommendations" @mouseenter="playHoverSound">
        All references
      </RouterLink>
    </header>

    <ul class="vouches__list">
      <li
        v-for="rec in featured"
        :key="rec.name"
        class="vouch"
        @mouseenter="playHoverSound"
      >
        <blockquote class="vouch__quote">{{ rec.quote }}</blockquote>
        <footer class="vouch__by">
          <span class="vouch__initials" aria-hidden="true">{{ rec.initials }}</span>
          <span>
            <span class="vouch__name">{{ rec.name }}</span>
            <span class="vouch__role">{{ rec.role }}</span>
          </span>
        </footer>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.vouches__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.75rem;
}

.vouches__all {
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--rule-strong);
  padding-bottom: 2px;
  white-space: nowrap;
}
.vouches__all:hover {
  color: var(--stamp);
  border-bottom-color: var(--stamp);
}

.vouches__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--rule-strong);
}

.vouch {
  display: flex;
  flex-direction: column;
  padding: 2rem 1.75rem 1.75rem 0;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.vouch + .vouch {
  padding-left: 1.75rem;
}
.vouch:last-child {
  border-right: none;
}

.vouch__quote {
  margin: 0 0 1.75rem;
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.42;
  letter-spacing: -0.012em;
  color: var(--ink);
}

.vouch__by {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
}
.vouch__initials {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--rule-strong);
  border-radius: 50%;
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--ink-soft);
}
.vouch__name,
.vouch__role {
  display: block;
}
.vouch__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink);
}
.vouch__role {
  margin-top: 0.1rem;
  font-size: 0.78rem;
  color: var(--ink-faint);
}

@media (max-width: 900px) {
  .vouches__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
  .vouches__list {
    grid-template-columns: 1fr;
  }
  .vouch,
  .vouch + .vouch {
    padding: 1.75rem 0;
    border-right: none;
  }
}
</style>
