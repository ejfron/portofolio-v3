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
