<script setup lang="ts">
import { education } from '@/data/education'
import { experience } from '@/data/extra'
</script>

<template>
  <section id="background" class="sheet background">
    <header class="background__head">
      <span class="sheet__mark">Background</span>
      <h2 class="sheet__title">Where I have been</h2>
    </header>

    <ol class="record">
      <li class="row">
        <span class="row__when">{{ experience.period }}</span>
        <div class="row__what">
          <h3 class="row__title">{{ experience.role }}</h3>
          <p class="row__detail">
            {{ experience.type }} work for shops, studios and small operators, mostly
            around Rizal. Scoping, building, deploying and maintaining.
          </p>
        </div>
      </li>

      <li v-for="item in education" :key="item.school" class="row">
        <span class="row__when">{{ item.period }}</span>
        <div class="row__what">
          <h3 class="row__title">{{ item.school }}</h3>
          <p v-if="item.degree" class="row__degree">{{ item.degree }}</p>
          <p v-if="item.major" class="row__detail">{{ item.major }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.background__head {
  margin-bottom: 2.75rem;
}

.record {
  list-style: none;
  border-top: 1px solid var(--rule-strong);
  max-width: 62rem;
}

.row {
  display: grid;
  grid-template-columns: minmax(0, 11rem) minmax(0, 1fr);
  gap: 2rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--rule);
}

.row__when {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ink-faint);
  padding-top: 0.35rem;
  white-space: nowrap;
}

.row__title {
  margin: 0;
  font-size: 1.15rem;
  letter-spacing: -0.018em;
  color: var(--ink);
}

.row__degree {
  margin: 0.3rem 0 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--stamp);
}

.row__detail {
  margin: 0.4rem 0 0;
  max-width: var(--measure);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

@media (max-width: 720px) {
  .row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .row__when {
    padding-top: 0;
  }
}
</style>
