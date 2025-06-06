<script setup>
  import { useDisplayStore } from '@/stores/displayStore';

  const displayStore = useDisplayStore()
</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <h2 class="mb-3 font-weight-regular" :class="displayStore.xs ? 'text-h6' : displayStore.sm ? 'text-h5' : 'text-h4'">Relatório e Análises</h2>
  </v-main>
</template>
