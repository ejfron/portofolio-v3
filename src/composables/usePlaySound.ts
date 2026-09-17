// composables/usePlaySound.ts
import { useSoundSettings } from './useSoundSettings'

const SOUND_URL = '/sound/mouse-hover.mp3'

export function usePlaySound() {
  const { soundEnabled } = useSoundSettings()
  let audio: HTMLAudioElement | null = null
  let timeoutId: number | null = null
  let unlocked = false

  // --- Audio unlock (required by browsers) ---
  const unlockAudio = () => {
    if (unlocked) return
    if (typeof window === 'undefined') return

    try {
      const unlockAudioElem = new Audio()
      unlockAudioElem.volume = 0
      const promise = unlockAudioElem.play()
      if (promise !== undefined) {
        promise
          .then(() => {
            unlocked = true
      
          })
          .catch(() => { })
      }
    } catch (_) {  }
  }


  const playHoverSound = () => {
    if (!soundEnabled.value) return
    if (typeof window === 'undefined') return

    if (!unlocked) unlockAudio()

    try {
      if (!audio) {
        audio = new Audio(SOUND_URL)
        audio.volume = 0.2
        audio.preload = 'auto'
        audio.load()
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      audio.currentTime = 0
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log())
          .catch((err) => console.warn())
      }


      timeoutId = window.setTimeout(() => {
        if (audio) audio.pause()
        timeoutId = null
      }, 1000)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }


const playToggleSound = () => {
  if (!soundEnabled.value) return
  const toggleAudio = new Audio('/sound/mouse-hover.mp3') 
  toggleAudio.volume = 0.3
  toggleAudio.play().catch(() => {})
}

  return { playHoverSound, playToggleSound, unlockAudio }
}