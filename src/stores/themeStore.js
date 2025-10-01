// Utilities
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {

  const theme = useTheme()

  const isDark = ref(true)

  function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    isDark.value = !isDark.value
  }

  const themeColor = ref('lime')

  const currentTheme = computed(() => {
    return `${themeColor.value}${isDark.value ? 'Dark' : 'Light'}`
  })

  return { toggleTheme, isDark, themeColor, theme, currentTheme }
})
