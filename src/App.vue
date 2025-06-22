<script setup>
  import { RouterView } from 'vue-router'
  import { useDisplayStore } from '@/stores/displayStore.js'

  import HeaderComponent from './components/HeaderComponent.vue'

  const displayStore = useDisplayStore()

</script>

<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <section class="pa-4">
        <RouterView />
      </section>
    </v-main>
  </v-app>
</template>
