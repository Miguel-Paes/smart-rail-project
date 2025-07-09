<script setup>
  import { useDisplayStore } from '@/stores/displayStore';
  import TitleSection from '@/components/template/TitleSection.vue';

  const displayStore = useDisplayStore()
</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <TitleSection title="Monitoramento e Manutenção" />                       
  </v-main>
</template>
