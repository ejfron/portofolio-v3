<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { recommendations } from '@/data/extra'

</script>

<template>
  <DefaultLayout>
    <section class="recs-page">
      <RouterLink to="/#recommendations" class="recs-page__back">← Back to Home</RouterLink>

      <p class="recs-page__eyebrow">ALL RECOMMENDATIONS</p>
      <h1 class="recs-page__title">What People Say</h1>
      <p class="recs-page__subtitle">
        Feedback from colleagues, clients, and mentors I've had the chance to work with.
      </p>

      <div class="recs-page__grid">
        <div v-for="rec in recommendations" :key="rec.name" class="rec-card">
          <p class="rec-card__quote">"{{ rec.quote }}"</p>
          <div class="rec-card__author">
            <span class="rec-card__avatar">{{ rec.initials }}</span>
            <div>
              <p class="rec-card__name">{{ rec.name }}</p>
              <p class="rec-card__role">{{ rec.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.recs-page {
  padding: 3rem 2.5rem 4rem;
}

.recs-page__back {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}


.recs-page__eyebrow {
  margin: 0 0 0.6rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--color-primary);
}

.recs-page__title {
  margin: 0 0 0.75rem;
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--color-text);
}

.recs-page__subtitle {
  margin: 0 0 2rem;
  max-width: 56ch;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.recs-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.rec-card {
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.rec-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.rec-card__quote {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-style: italic;
}

.rec-card__author {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.rec-card__avatar {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-surface-alt);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 800;
}

.rec-card__name {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
}

.rec-card__role {
  margin: 0.1rem 0 0;
  font-size: 0.72rem;
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .recs-page {
    padding: 2.5rem 1.5rem 3rem;
  }
  .recs-page__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .recs-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>
