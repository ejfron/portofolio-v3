<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DarkModeToggle from '@/components/common/darkmodeheader.vue'
import VisitorCounter from '@/components/common/VisitorCounter.vue'
import SidebarNav from '@/components/layouts/SidebarNav.vue'
import ChatWidget from '@/components/chat/ChatWidget.vue'
import ContactModal from '@/components/contact/ContactModal.vue'
import ResumeModal from '@/components/modal/Resumemodal.vue'

import { useVisitorCount } from '@/composables/useVisitorCount'

const { increment } = useVisitorCount()
const router = useRouter()

const isContactModalOpen = ref(false)
const isResumeModalOpen = ref(false)

const openContactModal = () => (isContactModalOpen.value = true)
const openResumeModal = () => (isResumeModalOpen.value = true)

const incrementCount = async () => {
  await increment()
}

onMounted(() => {
  incrementCount()
  router.afterEach(() => incrementCount())
})
</script>

<template>
  <div class="shell">
    <SidebarNav @open-contact="openContactModal" @open-resume="openResumeModal" />

    <div class="shell__topbar">
      <VisitorCounter class="header-visitor" />
      <DarkModeToggle />
    </div>

    <main class="shell__content">
      <slot :openContactModal="openContactModal" :openResumeModal="openResumeModal" />
    </main>

    <ChatWidget />

    <ContactModal v-model="isContactModalOpen" />
    <ResumeModal v-model="isResumeModalOpen" />
  </div>
</template>

<style scoped>
.shell {
  position: relative;
  min-height: 100vh;
  background: var(--paper);
}

.shell__topbar {
  position: fixed;
  top: 1rem;
  right: 1.5rem;
  height: 38px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  z-index: 950;
}


.shell__content {
  position: relative;
  z-index: 1;
  margin-left: var(--sidebar-width);
  max-width: 100%;
}

@media (max-width: 1024px) {
  .shell__content {
    margin-left: 0;
    padding-top: 3.5rem;
  }
  .shell__topbar {
    right: 1rem;
  }
}

@media (max-width: 600px) {
  .shell__topbar {
    gap: 0.4rem;
  }
  .header-visitor :deep(.visitor-label) {
    display: none;
  }
}
</style>
