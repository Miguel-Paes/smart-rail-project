// Utilities
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'

export const useThemeStore = defineStore('theme', () => {

  const theme = useTheme()

  const isDark = ref(true)

  function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    isDark.value = !isDark.value
  }

  return { toggleTheme, isDark }
})
