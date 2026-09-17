<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCard from './ProjectCard.vue'
import ModalData from '@/components/modal/modaldata.vue'
import { projects } from '@/data/projects'
import type { Project } from '@/types/project'
import { usePlaySound } from '@/composables/usePlaySound'

const { playHoverSound } = usePlaySound()

const selectedProject = ref<Project | null>(null)
const isModalOpen = ref(false)

const openDetails = (project: Project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

const featuredProjects = computed(() => projects.slice(0, 6))
</script>

<template>
  <section id="work" class="sheet work">
    <header class="work__head">
      <div>
        <span class="sheet__mark">Selected work</span>
        <h2 class="sheet__title">Software systems, start to finish</h2>
        <p class="sheet__lede">
          Each of these was scoped, built, shipped and handed to someone who runs a
          business on it. Open any entry for the feature list and the decisions behind it.
        </p>
      </div>
      <RouterLink class="work__all" to="/projects" @mouseenter="playHoverSound">
        Full index
      </RouterLink>
    </header>

    <div class="work__ledger">
      <ProjectCard
        v-for="(project, i) in featuredProjects"
        :key="project.id"
        :project="project"
        :index="i"
        @view-details="openDetails(project)"
      />
    </div>

    <ModalData v-model="isModalOpen" :project="selectedProject" />
  </section>
</template>

<style scoped>
.work__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.75rem;
}

.work__all {
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--rule-strong);
  padding-bottom: 2px;
  white-space: nowrap;
}
.work__all:hover {
  color: var(--stamp);
  border-bottom-color: var(--stamp);
}

.work__ledger {
  border-top: 1px solid var(--rule-strong);
}

@media (max-width: 900px) {
  .work__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
}
</style>
