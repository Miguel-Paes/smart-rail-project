<script setup>
  import { useDisplayStore } from '@/stores/displayStore.js';
  defineProps(['title', 'subtitle'])

  const displayStore = useDisplayStore()
</script>
<template>
  <h2 class="mb-3 font-weight-regular" :class="displayStore.xs ? 'text-h6' : displayStore.sm ? 'text-h5' : 'text-h4'"> {{ title }} </h2>
  <v-row v-if="subtitle">
    <v-card-title>
      {{ subtitle }}
    </v-card-title>
  </v-row>
</template>
