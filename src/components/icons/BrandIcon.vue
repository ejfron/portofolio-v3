<script setup lang="ts">
import { computed } from 'vue'
import {
  siNuxt,
  siVuedotjs,
  siTypescript,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siNodedotjs,
  siSupabase,
  siPostgresql,
  siGit,
  siGithub,
  siFacebook, 
  siMysql,  
  siFiverr,
  siPinia,
  siGoogle,
  siPhp,
  siLaravel,
  siVite,
  siCapacitor,
  siAnthropic
} from 'simple-icons'

const icons = {
  nuxtdotjs: siNuxt,
  vuedotjs: siVuedotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  html5: siHtml5,
  css3: siCss,
  tailwindcss: siTailwindcss,
  nodedotjs: siNodedotjs,
  supabase: siSupabase,
  postgresql: siPostgresql,
  mysql: siMysql,     
  git: siGit,
  github: siGithub,
  facebook: siFacebook,
  fiverr: siFiverr,
  pinia: siPinia,
  google: siGoogle,
  php: siPhp,
  laravel: siLaravel,
  vite: siVite,
  capacitor: siCapacitor,
  anthropic: siAnthropic
  
} as const

export type BrandIconName = keyof typeof icons

const props = defineProps<{
  name: BrandIconName
  size?: number | string
  useBrandColor?: boolean
}>()

const icon = computed(() => icons[props.name])
const fill = computed(() => (props.useBrandColor ? `#${icon.value.hex}` : 'currentColor'))
</script>

<template>
  <svg
    :width="size ?? 18"
    :height="size ?? 18"
    viewBox="0 0 24 24"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="icon.path" />
  </svg>
</template>