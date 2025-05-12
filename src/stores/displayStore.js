import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify';

export const useDisplayStore = defineStore('display', () => {

  const { xs, sm, mdAndUp } = useDisplay()

  return { xs, sm, mdAndUp }
})
