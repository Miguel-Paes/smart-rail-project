<script setup>
  import { RouterView } from 'vue-router'

  import HeaderComponent from './components/HeaderComponent.vue'
  import { useThemeStore } from './stores/themeStore.js'
</script>

<template>
  <v-app>
    <div class="container">
      <HeaderComponent />

      <RouterView />
    </div>
  </v-app>
</template>

<style scoped></style>
