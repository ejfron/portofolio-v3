// composables/useSoundSettings.ts
import { ref, watch } from 'vue'

const STORAGE_KEY = 'sound-enabled'


const soundEnabled = ref(false)


if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    soundEnabled.value = stored === 'true'
  }

}


watch(soundEnabled, (newVal) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(newVal))
  }
})

export function useSoundSettings() {
  const toggleSound = () => {
    soundEnabled.value = !soundEnabled.value
  }

  return { soundEnabled, toggleSound }
}