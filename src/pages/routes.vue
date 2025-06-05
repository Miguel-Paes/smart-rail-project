<script setup>
  import { useDisplayStore } from '@/stores/displayStore.js';

  const displayStore = useDisplayStore();
</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <h1 class="mb-3 font-weight-regular" :class="displayStore.xs ? 'text-h5' : displayStore.sm ? 'text-h4' : 'text-h3'">Gestão de Rotas</h1>

  </v-main>
</template>
