// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {

  const drawer = false

  const toggleDrawer = () => {
    drawer = !drawer
  }

  return { drawer, toggleDrawer }
})
