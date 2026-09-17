// composables/useDarkMode.ts
import { ref } from 'vue'

export const useDarkMode = () => {
  const isDark = ref(false)

  const getInitialTheme = (): boolean => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark') return true
      if (stored === 'light') return false
      return false
    }
    return false
  }

  const applyTheme = (dark: boolean) => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }
  }

  const init = () => {
    if (typeof window !== 'undefined') {
      isDark.value = getInitialTheme()
      applyTheme(isDark.value)
    }
  }

  const setCirclePosition = (event?: MouseEvent) => {
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    if (event?.currentTarget) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    document.documentElement.style.setProperty('--x', `${x}px`)
    document.documentElement.style.setProperty('--y', `${y}px`)
  }

  const toggle = (event?: MouseEvent) => {
    const next = !isDark.value

    if (typeof window === 'undefined') {
      isDark.value = next
      return
    }

    setCirclePosition(event)

    if (!document.startViewTransition) {
      isDark.value = next
      applyTheme(next)
      return
    }

    document.startViewTransition(() => {
      isDark.value = next
      applyTheme(next)
    })
  }

  return { isDark, toggle, init }
}