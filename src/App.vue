<script setup>
  import { RouterView } from 'vue-router'

  import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <v-app>
    <v-main>
      <HeaderComponent />

      <RouterView />
    </v-main>
  </v-app>
</template>
