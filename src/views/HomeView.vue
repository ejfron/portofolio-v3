<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import ProjectsSection from '@/components/projects/ProjectsSection.vue'
import RecommendationsSection from '@/components/recommendations/RecommendationsSection.vue'
import AboutSection from '@/components/about/AboutSection.vue'
import TechStackSection from '@/components/skills/TechStackSection.vue'
import EducationSection from '@/components/education/EducationSection.vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import FooterSection from '@/components/footer/FooterSection.vue'
</script>

<template>
  <DefaultLayout v-slot="{ openContactModal, openResumeModal }">
    <!--
      Order matters more than any single component here. The old page spent its
      first two screens on a portrait and four generic value cards, and put the
      client references at position 05 where nobody scrolls. Work now comes
      first because it is the strongest thing on the site, and the references
      sit directly under it so the proof lands while the work is still on screen.
    -->
    <HeroSection @open-contact="openContactModal" @open-resume="openResumeModal" />
    <ProjectsSection />
    <RecommendationsSection />
    <AboutSection @open-resume="openResumeModal" />
    <TechStackSection />
    <EducationSection />
    <ContactSection @open-contact="openContactModal" @open-resume="openResumeModal" />
    <FooterSection />
  </DefaultLayout>
</template>
