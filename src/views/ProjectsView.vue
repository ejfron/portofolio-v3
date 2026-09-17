<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ModalData from '@/components/modal/modaldata.vue'
import { projects } from '@/data/projects'
import type { Project } from '@/types/project'

const selectedProject = ref<Project | null>(null)
const isModalOpen = ref(false)

const openDetails = (project: Project) => {
  selectedProject.value = project
  isModalOpen.value = true
}
</script>

<template>
  <DefaultLayout>
    <section class="sheet index">
      <RouterLink to="/#work" class="index__back">&larr; Back to home</RouterLink>

      <span class="sheet__mark">Full index</span>
      <h1 class="sheet__title">Every project, in one list</h1>
      <p class="sheet__lede">
        The complete record of client work and personal builds, in the order I built them.
      </p>

      <div class="index__list">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.id"
          :project="project"
          :index="i"
          variant="stack"
          @view-details="openDetails(project)"
        />
      </div>
    </section>

    <ModalData v-model="isModalOpen" :project="selectedProject" />
  </DefaultLayout>
</template>

<style scoped>
.index {
  border-top: none;
}

.index__back {
  display: inline-block;
  margin-bottom: 2rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ink-soft);
  text-decoration: none;
}
.index__back:hover {
  color: var(--stamp);
}

.index__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2.75rem;
}

@media (max-width: 900px) {
  .index__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .index__list {
    grid-template-columns: 1fr;
  }
}
</style>